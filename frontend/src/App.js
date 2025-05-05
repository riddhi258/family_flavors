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
        const response = await axios.post("https://family-flavors-3bso.vercel.app");
        dispatch(setDataProduct(response.data));
        console.log(response.data);
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.error("Axios error:", error);
      }
    })();
  }, [dispatch]);

  console.log(productData);

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
