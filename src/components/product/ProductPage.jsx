import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import CartBox from "./CartBox"; // agar cart dikhana hai
import Header from "../Header";
import Footer from "../Footer";
import { BASE_URL } from "../../apis/EndPoint";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // new state for search
  const [cartItems, setCartItems] = useState([]); // cart

  const categories = ["Paper", "Plastic", "Metal", "Glass", "Wood"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product`);
        setProducts(response.data.products || response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Filter by category & search
  const displayedProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, id: product._id, qty: 1 }]);
    }
  };

  const removeFromCart = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));

  return (
    <>
      <Header />

      <div className="product-page-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
            <li onClick={() => setSelectedCategory("")} className="reset">
              Show All
            </li>
          </ul>

          {/* Cart Box */}
          <CartBox cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>

        {/* Products Section */}
        <div className="products-section">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
