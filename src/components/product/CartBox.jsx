import React from "react";
import "./CartBox.css";

function CartBox({ cartItems, removeFromCart }) {
  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-box">
      <h3>My Cart</h3>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-name">{item.title}</span>
                <span className="cart-item-qty">x {item.qty}</span>
                <span className="cart-item-price">₹{item.price * item.qty}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> <span>₹{total}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default CartBox;
