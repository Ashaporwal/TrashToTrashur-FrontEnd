import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/buy-now", { state: { product } })}>
      Buy Now
    </button>
  );
}
