import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Header from "../Header";
import Footer from "../Footer";
import { BASE_URL } from "../../apis/EndPoint";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Example categories for your “reusable materials” project
  const categories = ["Paper", "Plastic", "Metal", "Glass", "Wood"];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product`);
        setProducts(response.data.products || response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <>
      <Header />

      <div className="product-page-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((cat, index) => (
              <li
                key={index}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
            <li className="reset" onClick={() => setSelectedCategory("")}>
              Show All
            </li>
          </ul>
        </div>

        {/* Products */}
        <div className="product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;





