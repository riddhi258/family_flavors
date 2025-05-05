// App.js
import "./App.css";
import Header from "./Component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      try {
        // Corrected to GET request and /product endpoint
        const response = await axios.get("https://family-flavors.vercel.app/product");
        dispatch(setDataProduct(response.data));
        console.log("Fetched products:", response.data);
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.error("Axios error:", error);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
