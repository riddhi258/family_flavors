import axios from "axios";

const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = data;

  if (email && password) {
    try {
      const response = await axios.post("https://family-flavors-gy29.vercel.app/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataRes = response.data;
      console.log(dataRes); // Debugging log

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Invalid credentials or login failed.");
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  } else {
    toast.error("Please enter required fields.");
  }
};
