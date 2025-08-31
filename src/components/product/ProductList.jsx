import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>

          {product.images && product.images.length > 0 && (
            <img 
              src={product.images[0]} 
              alt={product.title} 
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
