

import React from "react";
import { useLocation } from "react-router-dom";

function BuyNow(){
  const location = useLocation();
  const product = location.state;

  if(!product){
    return <h2>No product Found</h2>;
  }
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{width:"300px"}}/>
      <p>{product.price}</p>
      <button>Confirm Purchase</button>
    </div>
  )
}

export default BuyNow;
























// import React from "react";
// import {useLocation} from "react-router-dom";

// function BuyNow(){
//   const location = useLocation();
//   const product = location.state?.product;


//   const handleBuyNow = (product)=>{
//     navigat("/buy-now",{state:product});
//   };

//  return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
//       {productData.map((product) => (
//         <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
//           <img src={product.image} alt={product.title} style={{ width: "100%", height: "150px" }} />
//           <h4>{product.title}</h4>
//           <p>₹{product.price}</p>
//           <button onClick={() => handleBuyNow(product)}>Buy Now</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Product;