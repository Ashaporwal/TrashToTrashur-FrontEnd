

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Agar product data nahi hai to kuch mat dikhana
  if (!product) return null;

  // Product ke fields destructure karo, default values ke saath
  const {
    _id,
    name = "Untitled Product",
    price = 0,
    images = [],
    description = "No description available",
    stock = 0,
    discount = 0,
  } = product;

  // Pehla image dikhayenge, warna placeholder
  const imageUrl = images.length > 0 ? images[0] : null;

  // Card click pe Product Detail Page pe le jao
  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Product Image Section */}
      <div className="product-image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="product-image" />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>

        <div className="product-price-stock">
          <span className="product-price">₹{price}</span>
          {discount > 0 && <span className="product-discount">{discount}% OFF</span>}
          <span className="product-stock">
            {stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* Action Buttons */}
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




// import React from "react";
// import './ProductCard.css';

// const ProductCard = ({ product }) => {
//   if (!product) return null;

//   const {
//     name = " ",
//     price = 0,
//     images = [],
//     description = "No description available",
//     stock = 0,
//     discount = 0,
//   } = product;

//   // Directly use the Cloudinary URL
//   const imageUrl = images.length > 0 ? images[0] : null;

//   return (
//     <div className="product-card">
//       <div className="product-image-wrapper">
//         {imageUrl ? (
//           <img src={imageUrl} alt={name} className="product-image" />
//         ) : (
//           <div className="image-placeholder">No Image</div>
//         )}
//       </div>

//       <div className="product-details">
//         <h3 className="product-name">{name}</h3>
//         <p className="product-description">{description}</p>

//         <div className="product-price-stock">
//           <span className="product-price">₹{price}</span>
//           {discount > 0 && <span className="product-discount">{discount}% OFF</span>}
//           <span className="product-stock">{stock > 0 ? "In stock" : "Out of stock"}</span>
//         </div>

//         <div className="product-buttons">
//           <button className="add-to-cart-btn" disabled={stock === 0}>
//             Add to Cart
//           </button>
//           <button className="buy-now-btn" disabled={stock === 0}>
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



// import React from "react";
// import './ProductCard.css';
// import { BASE_URL } from "../../apis/EndPoint";

// const ProductCard = ({ product }) => {
//   if (!product) return null;

//   const {
//     name = "No Name",
//     price = 0,
//     images = [],
//     description = "No description available",
//     stock = 0,
//     discount = 0,
//   } = product;

//   return (
//     <div className="product-card">
//       <div className="product-image-wrapper">
//         {images[0] ? (
//           <img src={images} alt={name} className="product-image" />
//         ) : (
//           <div className="image-placeholder">No Image</div>
//         )}
//       </div>

//       <div className="product-details">
//         <h3 className="product-name">{name}</h3>
//         <p className="product-description">{description}</p>
//         <div className="product-price-stock">
//           <span className="product-price">₹{price}</span>
//           {discount > 0 && <span className="product-discount">{discount}% OFF</span>}
//           <span className="product-stock">{stock > 0 ? "In stock" : "Out of stock"}</span>
//         </div>

//         {/* Buttons Row */}
//         <div className="product-buttons">
//           <button className="add-to-cart-btn" disabled={stock === 0}>
//             Add to Cart
//           </button>
//           <button className="buy-now-btn" disabled={stock === 0}>
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
