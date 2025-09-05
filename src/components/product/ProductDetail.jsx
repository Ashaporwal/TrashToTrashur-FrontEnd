import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Card,
  CardMedia,
  Rating,
  TextField,
  Divider,
} from "@mui/material";

const COLORS = {
  primary: "#B28228",
  bg: "#FFF9F0",
  white: "#FFFFFF",
  primaryHover: "#9E6F1F",   // slightly darker for hover
  bgHover: "#F7EEDC",        // subtle hover fill
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        const data = await res.json();
        if (data?.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images?.[0] || "");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Typography variant="h5" align="center" mt={4}>Loading product...</Typography>;
  if (!product) return <Typography variant="h5" align="center" mt={4}>Product not found.</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: 2,
        py: 4,
        backgroundColor: COLORS.bg,
        borderRadius: 3,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Grid container spacing={4}>
        {/* Left: Images */}
        <Grid xs={12} md={6}>
          <Card sx={{ borderRadius: 3, mb: 2, backgroundColor: COLORS.white, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.title}
              sx={{ width: "100%", height: 450, objectFit: "contain", borderRadius: 3 }}
            />
          </Card>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {product.images?.map((img, index) => (
              <Card
                key={index}
                sx={{
                  width: 80,
                  height: 80,
                  border: selectedImage === img ? `2px solid ${COLORS.primary}` : "1px solid #ddd",
                  backgroundColor: COLORS.white,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "transform .2s, border-color .2s",
                  "&:hover": { transform: "scale(1.05)", borderColor: COLORS.primary },
                }}
                onClick={() => setSelectedImage(img)}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Thumbnail ${index}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
                />
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Right: Info */}
        <Grid xs={12} md={6} sx={{ display: "flex", flexDirection: "column", minHeight: 450 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: COLORS.primary, fontWeight: 700 }}>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1, mb: 2 }}>
              <Typography variant="h5" sx={{ color: COLORS.primary, fontWeight: 700 }}>
                ₹{product.price}
              </Typography>
              {product.isAvailable ? (
                <Chip
                  label="In Stock"
                  sx={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    fontWeight: 600,
                  }}
                />
              ) : (
                <Chip
                  label="Out of Stock"
                  color="error"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Stack>

            {/* --- ADDED SECTION (between stock & buttons) --- */}
            <Box
              sx={{
                backgroundColor: COLORS.white,
                border: `1px solid ${COLORS.primary}22`,
                borderRadius: 2,
                p: 2,
                mb: 3,
              }}
            >
              {/* Rating */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Rating value={product.rating || 4.5} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                  ({product.reviewsCount || 128} reviews)
                </Typography>
              </Stack>

              {/* Quantity */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Quantity</Typography>
                <TextField
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  inputProps={{ min: 1 }}
                  sx={{
                    width: 90,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: `${COLORS.primary}66` },
                      "&:hover fieldset": { borderColor: COLORS.primary },
                      "&.Mui-focused fieldset": { borderColor: COLORS.primary },
                    },
                  }}
                />
              </Stack>

              <Divider sx={{ my: 1 }} />

              {/* Delivery */}
              <Typography variant="body2" color="text.secondary">
                Estimated Delivery: <b style={{ color: COLORS.primary }}>3–5 business days</b>
              </Typography>
            </Box>
            {/* --- END ADDED SECTION --- */}
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: "auto" }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  py: 1.8,
                  fontWeight: 700,
                  backgroundColor: COLORS.primary,
                  "&:hover": { backgroundColor: COLORS.primaryHover },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  py: 1.8,
                  fontWeight: 700,
                  backgroundColor: COLORS.bg,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}`,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: COLORS.bgHover },
                }}
              >
                Buy Now
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;



























// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/product/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Data:", data);
//         setProduct(data.product); // sirf product set karo, puri data nahi
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("Error in fetching product", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>No product found</div>;
//   }

//   return (
//     <div>
//       <h1>{product.title}</h1>
//       <p>Description: {product.description}</p>
//       <p>Price: ₹{product.price}</p>
//       {product.images.length > 0 && (
//         <img
//           src={`http://localhost:5000/uploads/${product.images[0]}`}
//           alt={product.title}
//           width="200"
//         />
//       )}
//     </div>
//   );
// }

// export default ProductDetail;

