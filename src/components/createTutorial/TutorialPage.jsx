import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import "./TutorialPage.css";

function TutorialPage() {
  const [tutorials, setTutorials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    images: []
  });

  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));
  const currentUserId = currentUser?._id;

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tutorial/all");
      setTutorials(res.data);
    } catch (err) {
      console.log("Fetch tutorials failed:", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "video") {
      setFormData({ ...formData, video: e.target.files[0] });
    } else if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUserId) {
      alert("You must be logged in to upload a tutorial.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.video) data.append("video", formData.video);
    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }
    data.append("uploadedBy", currentUserId);

    try {
      await axios.post("http://localhost:3000/tutorial/create", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData({ title: "", description: "", video: null, images: [] });
      setShowForm(false);
      fetchTutorials();
    } catch (err) {
      console.log("Upload failed:", err.response ? err.response.data : err);
      alert("Upload failed! Check console for details.");
    }
  };

  return (
    <>
      <Header />
      <div className="tutorial-page">
        <h1>Tutorials</h1>

        {!currentUserId ? (
          <p style={{ color: "red" }}>You must be logged in to upload a tutorial.</p>
        ) : (
          <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Tutorial"}
          </button>
        )}

        {showForm && currentUserId && (
          <form className="tutorial-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input type="file" name="video" onChange={handleChange} accept="video/*" />
            <input type="file" name="images" onChange={handleChange} accept="image/*" multiple />
            <button type="submit">Upload Tutorial</button>
          </form>
        )}

        <div className="tutorials-container">
          {tutorials.map((t, index) => (
            <div className="tutorial-card" key={index}>
              {t.video && (
                <video
                  className="tutorial-video"
                  src={`http://localhost:3000/uploads/${t.video?.filename || t.video}`}
                  controls
                />
              )}
              {t.images && t.images.length > 0 && (
                <div className="tutorial-images">
                  {t.images.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:3000/uploads/${img.filename || img}`}
                      alt="Tutorial"
                    />
                  ))}
                </div>
              )}
              <div className="card-content">
                <h3 className="tutorial-title">{t.title}</h3>
                <p className="tutorial-desc">{t.description}</p>
                <p className="uploader-name">Uploaded by: {t.uploadedByName || "Anonymous"}</p>
                <button className="like-btn">Like ❤️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TutorialPage;


























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./TutorialPage.css";
// function TutorialPage() {
//   const [tutorials, setTutorials] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     video: null,
//     images: []
//   });

//   useEffect(() => {
//     fetchTutorials();
//   }, []);

//   const fetchTutorials = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/tutorial/all");
//       setTutorials(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChange = e => {
//     if (e.target.name === "video") {
//       setFormData({ ...formData, video: e.target.files[0] });
//     } else if (e.target.name === "images") {
//       setFormData({ ...formData, images: e.target.files });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     if (formData.video) data.append("video", formData.video);
//     for (let i = 0; i < formData.images.length; i++) {
//       data.append("images", formData.images[i]);
//     }

//     try {
//       await axios.post("http://localhost:3000/tutorial/create", data);
//       setFormData({ title: "", description: "", video: null, images: [] });
//       setShowForm(false);
//       fetchTutorials();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Tutorial Page</h1>
//       <button onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Close Form" : "Add Tutorial"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//           <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//           <input type="file" name="video" onChange={handleChange} accept="video/*" required />
//           <input type="file" name="images" onChange={handleChange} accept="image/*" multiple />
//           <button type="submit">Upload Tutorial</button>
//         </form>
//       )}

//       <h2>Uploaded Tutorials</h2>
//       {tutorials.map(t => (
//         <div key={t.id}>
//           <h3>{t.title}</h3>
//           <p>{t.description}</p>
//           {t.video && <video src={`http://localhost:3000/${t.video}`} controls width="300" />}
//           {t.images && t.images.map((img, i) => <img key={i} src={`http://localhost:3000/${img}`} width="100" />)}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TutorialPage;



