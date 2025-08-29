import React, { useEffect, useState } from "react";

const GalleryUpload = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data))
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {gallery.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h4>Before</h4>
<img src={item.before} alt="Before" width="200" />
<img src={item.after} alt="After" width="200" />

          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryUpload;
