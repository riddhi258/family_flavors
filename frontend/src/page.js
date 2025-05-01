// MyComponent.js

import React, { useEffect, useState } from "react";
import { getSomething } from "../auth/api"; // adjust path as needed

const page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSomething().then(setData).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default page;
