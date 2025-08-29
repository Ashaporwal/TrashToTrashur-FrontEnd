import React from "react";
import './ProductCard.css';
import { BASE_URL } from "../../apis/EndPoint";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    name = "No Name",
    price = 0,
    images = [],
    description = "No description available",
    stock = 0,
    discount = 0,
  } = product;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {images[0] ? (
          <img src={`${BASE_URL}/post/${images[0]}`} alt={name} className="product-image" />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price-stock">
          <span className="product-price">₹{price}</span>
          {discount > 0 && <span className="product-discount">{discount}% OFF</span>}
          <span className="product-stock">{stock > 0 ? "In stock" : "Out of stock"}</span>
        </div>

        {/* Buttons Row */}
        <div className="product-buttons">
          <button className="add-to-cart-btn" disabled={stock === 0}>
            Add to Cart
          </button>
          <button className="buy-now-btn" disabled={stock === 0}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
