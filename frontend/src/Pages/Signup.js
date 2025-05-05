import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  const { firstName, email, password, confirmPassword, address } = data;

  if (firstName && email && password && confirmPassword && address) {
    if (password === confirmPassword) {
      try {
        const response = await axios.post('', data, {
          headers: { "Content-Type": "application/json" }
        });

        const dataRes = response.data;
        console.log(dataRes);
        toast(dataRes.message);
        navigate("/login");
      } catch (err) {
        toast.error("Signup failed. Try again.");
        console.error(err);
      }
    } else {
      toast.error("Passwords do not match");
    }
  } else {
    toast.error("Please fill in all required fields");
  }
};
