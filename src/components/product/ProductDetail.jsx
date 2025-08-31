import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Stack, Chip, Card, CardMedia } from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        const data = await res.json();

        if (data?.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0]); // default to first image
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
    <Box sx={{ maxWidth: 1100, mx: "auto", px: 2, py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column: Main Image + Thumbnails */}
        <Grid xs={12} md={6}>
          <Card sx={{ borderRadius: 3, mb: 2 }}>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.title}
              sx={{ width: "100%", height: 450, objectFit: "contain", borderRadius: 3 }}
            />
          </Card>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {product.images.map((img, index) => (
              <Card
                key={index}
                sx={{
                  width: 80,
                  height: 80,
                  border: selectedImage === img ? "2px solid #1976d2" : "1px solid #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
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

        {/* Right Column: Product Info */}
        <Grid xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 450 }}>
          <Box>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>{product.description}</Typography>
            <Typography variant="h5" color="primary" gutterBottom>₹{product.price}</Typography>
            {product.isAvailable ? (
              <Chip label="In Stock" color="success" />
            ) : (
              <Chip label="Out of Stock" color="error" />
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 4 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, py: 2, fontWeight: "bold" }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ flex: 1, py: 2, fontWeight: "bold" }}
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

