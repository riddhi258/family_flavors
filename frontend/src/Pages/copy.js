  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {

        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

        const dataRes = await fetchData.json()


        // alert(dataRes.message);
        toast(dataRes.message)
        if (dataRes.alert) {
          navigate("/login");
        }

      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("Please Enter required fields");
    }
  };