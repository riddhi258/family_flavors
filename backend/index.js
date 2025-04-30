const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Stripe = require("stripe");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
  address: String,
});

const userModel = mongoose.model("user", userSchema);

// Root route
app.get("/", (_, res) => {
  res.send("Server is running");
});

// Signup API
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).send({ message: "Successfully signed up", alert: true });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found, please sign up", alert: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password", alert: false });
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      address: user.address,
    };

    res.status(200).json({ message: "Login successful", alert: true, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Product Schema & Routes
const schemaProduct = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

app.post("/uploadProduct", async (req, res) => {
  try {
    const product = new productModel(req.body);
    const saved = await product.save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).send({ message: "Error saving product", error });
  }
});

app.get("/product", async (_, res) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
});

// Stripe Checkout Session
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, customer } = req.body;

    if (!customer || !customer.name || !customer.email) {
      return res.status(400).json({ message: "Customer name and email are required" });
    }

    // Basic validation
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name || "Product",
          },
          unit_amount: Math.round(Number(item.price) * 100), // ensure integer
        },
        quantity: item.qty || 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        }
      })),
      customer_email: customer.email,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
  }
});


// Start server
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
