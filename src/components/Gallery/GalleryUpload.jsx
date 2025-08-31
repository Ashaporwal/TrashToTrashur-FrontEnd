import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const GalleryUpload = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(data))
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // dono images side by side
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Gallery</h2>
      {gallery.length > 0 ? (
        <Slider {...sliderSettings}>
          {gallery.map((item, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: "10px",
                  textAlign: "center",
                  background: "#fff",
                }}
              >
                <h4>Before</h4>
                {item.before && (
                  <img
                    src={item.before}
                    alt="Before"
                    style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: 10 }}
                  />
                )}

                <h4>After</h4>
                {item.after && (
                  <img
                    src={item.after}
                    alt="After"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p style={{ textAlign: "center" }}>Loading gallery...</p>
      )}
    </div>
  );
};

export default GalleryUpload;

