// ProductPage.jsx
import React from "react";
import productData from "./ProductData";

function ProductPage() {
  const products = [
    {
      id: 1,
      title: "Recycled Tote Bag",
      description: "Made from old jeans and eco-friendly fabrics.",
      price: 349,
      image: "/images/4.jpeg",
    },
    {
      id: 2,
      title: "Upcycled Wooden Lamp",
      description: "Crafted from reclaimed wood.",
      price: 899,
      image: "/images/5.jpg",
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={product.image} alt={product.title} width="200" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <strong>₹{product.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
