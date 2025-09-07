

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./TutorialPage.css";

function TutorialPage() {
  const [tutorials, setTutorials] = useState([]);
  const [myTutorials, setMyTutorials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    images: [],
    tutorialId: null,
  });

  const [commentText, setCommentText] = useState({});

  const currentUser = JSON.parse(sessionStorage.getItem("current-user"));
  const currentUserId = currentUser?._id;
  const isCrafter = currentUser?.role === "crafter";
  const navigate = useNavigate();

  useEffect(() => {
    fetchTutorials();
    if (isCrafter) fetchMyTutorials();
  }, []);

  // -------------------- Fetch Comments --------------------
  const fetchComments = async (tutorialId) => {
    try {
      const res = await axios.get("http://localhost:5000/comment/getall", {
        params: { targetId: tutorialId, type: "tutorial" },
      });
      return res.data.comments || [];
    } catch (err) {
      console.error("Failed to fetch comments", err);
      return [];
    }
  };

  // -------------------- Fetch Tutorials --------------------
  const fetchTutorials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tutorial/all");
      const tutorialsWithComments = await Promise.all(
        res.data.map(async (t) => {
          const comments = await fetchComments(t._id);
          return { ...t, comments };
        })
      );
      setTutorials(tutorialsWithComments);
    } catch (err) {
      console.error("Error fetching tutorials:", err);
    }
  };

  const fetchMyTutorials = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/tutorial/mytutorials/${currentUser._id}`
      );
      if (res.data.success) {
        const tutorialsWithComments = await Promise.all(
          res.data.tutorials.map(async (t) => {
            const comments = await fetchComments(t._id);
            return { ...t, comments };
          })
        );
        setMyTutorials(tutorialsWithComments);
      }
    } catch (err) {
      console.error("Failed to fetch my tutorials:", err);
    }
  };

  // -------------------- Form Handling --------------------
  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "video") setFormData({ ...formData, video: files[0] });
    else if (name === "images") setFormData({ ...formData, images: files });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUserId || !isCrafter) return alert("Login as crafter to upload.");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.video) data.append("video", formData.video);
    for (let i = 0; i < formData.images.length; i++)
      data.append("images", formData.images[i]);
    data.append("uploadedBy", currentUserId);

    try {
      if (formData.tutorialId) {
        await axios.put(`http://localhost:5000/tutorial/${formData.tutorialId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Tutorial updated successfully!");
      } else {
        await axios.post("http://localhost:5000/tutorial/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Tutorial uploaded successfully!");
      }
      setFormData({ title: "", description: "", video: null, images: [], tutorialId: null });
      setShowForm(false);
      fetchTutorials();
      fetchMyTutorials();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  // -------------------- Likes --------------------
  const handleLike = async (tutorialId) => {
    if (!currentUserId) {
      console.log(tutorialId);
      alert("Login to like tutorials.");
        
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/tutorial/${tutorialId}/like`, {
        userId: currentUserId,
 
      });

      const updated = displayedTutorials.map((t) =>
        t._id === tutorialId
          ? { ...t, likes: res.data.likesCount, likedBy: res.data.likedBy }
          : t
      );

      if (filter === "my") setMyTutorials(updated);
      else setTutorials(updated);
    } catch (err) {
      console.error("Like failed:", err);
      alert("Failed to like tutorial");
    }
  };

  // -------------------- Add Comment --------------------
  const handleComment = async (tutorialId) => {
    if (!currentUserId) return alert("Login to comment.");
    const text = commentText[tutorialId]?.trim();
    if (!text) return;

    try {
      const res = await axios.post("http://localhost:5000/comment/create", {
        user: currentUserId,
        targetId: tutorialId,
        type: "tutorial",
        text,
      });

      if (res.data.comment) {
        const newComment = { user: { name: currentUser.name }, text };
        const updated = displayedTutorials.map((t) =>
          t._id === tutorialId
            ? { ...t, comments: [...(t.comments || []), newComment] }
            : t
        );
        filter === "my" ? setMyTutorials(updated) : setTutorials(updated);
        setCommentText({ ...commentText, [tutorialId]: "" });
      }
    } catch (err) {
      console.error("Comment failed:", err);
      alert("Failed to post comment");
    }
  };

  // -------------------- Delete Tutorial --------------------
  const handleDelete = async (tutorialId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/tutorial/${tutorialId}`);
      fetchTutorials();
      fetchMyTutorials();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete tutorial.");
    }
  };

  const displayedTutorials = filter === "my" ? myTutorials || [] : tutorials || [];

  return (
    <>
      <Header />
      <div className="tutorial-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Tutorials</h1>

        {isCrafter && (
          <div className="filter-buttons">
            <button
              onClick={() => setFilter("my")}
              className={`tab-button ${filter === "my" ? "active" : ""}`}
            >
              My Tutorials
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`tab-button ${filter === "all" ? "active" : ""}`}
            >
              Show All Tutorials
            </button>
          </div>
        )}

        {isCrafter && (
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Tutorial"}
          </button>
        )}

        {isCrafter && showForm && (
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
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
            />
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
            <button type="submit">
              {formData.tutorialId ? "Update Tutorial" : "Upload Tutorial"}
            </button>
          </form>
        )}

        <div className="tutorial-grid">
          {displayedTutorials.length === 0 ? (
            <p>No tutorials to display.</p>
          ) : (
            displayedTutorials.map((t) => (
              <TutorialCard
                key={t._id}
                tutorial={t}
                currentUser={currentUser}
                handleDelete={handleDelete}
                handleLike={handleLike}
                handleComment={handleComment}
                commentText={commentText}
                setCommentText={setCommentText}
                isCrafter={isCrafter}
                setFormData={setFormData}
                setShowForm={setShowForm}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

// -------------------- Tutorial Card --------------------
const TutorialCard = ({
  tutorial,
  currentUser,
  handleDelete,
  handleLike,
  handleComment,
  commentText,
  setCommentText,
  isCrafter,
  setFormData,
  setShowForm,
}) => {
  const currentUserId = currentUser?._id;
  const uploaderId = tutorial.uploadedBy?._id;
  const uploaderName = tutorial.uploadedBy?.name || "Anonymous";

  const liked = tutorial.likedBy?.includes(currentUserId);

  return (
    <div className="tutorial-card">
      {tutorial.video && (
        <video
          className="tutorial-video"
          src={`http://localhost:5000/uploads/${tutorial.video?.filename || tutorial.video}`}
          controls
        />
      )}
      {tutorial.images?.length > 0 && (
        <div className="tutorial-images">
          {tutorial.images.map((img, idx) => (
            <img
              className="tutorial-image"
              src={`http://localhost:5000/uploads/${img.filename || img}`}
              key={idx}
              alt="tutorial"
            />
          ))}
        </div>
      )}

      <div className="tutorial-title">{tutorial.title}</div>
      <div className="tutorial-desc">{tutorial.description}</div>

      <div className="tutorial-uploader">
        Uploaded by:{" "}
        {uploaderId ? (
          <Link to={`/profile/${uploaderId}`} className="uploader-link">
            {uploaderName}
          </Link>
        ) : (
          <span>{uploaderName}</span>
        )}
      </div>

      {isCrafter && uploaderId === currentUserId && (
        <div className="tutorial-management">
          <button
            className="edit-btn"
            onClick={() => {
              setFormData({
                title: tutorial.title,
                description: tutorial.description,
                video: null,
                images: [],
                tutorialId: tutorial._id,
              });
              setShowForm(true);
            }}
          >
            ✏️ Edit
          </button>
          <button className="delete-btn" onClick={() => handleDelete(tutorial._id)}>
            🗑️ Delete
          </button>
        </div>
      )}

      {currentUserId && (
        <div className="tutorial-actions">
          <button
            className="like-btn"
            style={{ background: liked ? "red" : "grey" }}
            onClick={() => handleLike(tutorial._id)}
          >
            {liked ? "❤️ Liked" : "🤍 Like"} ({tutorial.likes || 0})
          </button>

          <input
            type="text"
            placeholder="Add comment..."
            value={commentText[tutorial._id] || ""}
            onChange={(e) =>
              setCommentText({ ...commentText, [tutorial._id]: e.target.value })
            }
          />
          <button className="comment-btn" onClick={() => handleComment(tutorial._id)}>
            Comment
          </button>
        </div>
      )}

      <div className="tutorial-comments">
        {tutorial.comments?.map((c, idx) => (
          <div className="comment-text" key={idx}>
            <b>{c.user?.name || "Anonymous"}:</b> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialPage;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../Header";
// import Footer from "../Footer";
// import "./TutorialPage.css";

// function TutorialPage() {
//   const [tutorials, setTutorials] = useState([]);
//   const [myTutorials, setMyTutorials] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [filter, setFilter] = useState("all");

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     video: null,
//     images: [],
//     tutorialId: null,
//   });

//   const [commentText, setCommentText] = useState({});

//   const currentUser = JSON.parse(sessionStorage.getItem("current-user"));
//   const currentUserId = currentUser?._id;
//   const isCrafter = currentUser?.role === "crafter";
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTutorials();
//     if (isCrafter) fetchMyTutorials();
//   }, []);

//   // -------------------- Fetch Comments --------------------
// const fetchComments = async (tutorialId) => {
//   try {
//     const res = await axios.get("http://localhost:5000/comment/getall", {
//       params: { targetId: tutorialId, type: "tutorial" },
//     });
//     return res.data.comments || [];  // <- ensure correct key
//   } catch (err) {
//     console.error("Failed to fetch comments", err);
//     return [];
//   }
// };


//   // -------------------- Fetch Tutorials --------------------
//   const fetchTutorials = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/tutorial/all");
//       const tutorialsWithComments = await Promise.all(
//         res.data.map(async (t) => {
//           const comments = await fetchComments(t._id);
//           return { ...t, comments };
//         })
//       );
//       setTutorials(tutorialsWithComments);
//     } catch (err) {
//       console.error("Error fetching tutorials:", err);
//     }
//   };

//   const fetchMyTutorials = async () => {
//     if (!currentUser) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/tutorial/mytutorials/${currentUser._id}`);
//       if (res.data.success) {
//         const tutorialsWithComments = await Promise.all(
//           res.data.tutorials.map(async (t) => {
//             const comments = await fetchComments(t._id);
//             return { ...t, comments };
//           })
//         );
//         setMyTutorials(tutorialsWithComments);
//       }
//     } catch (err) {
//       console.error("Failed to fetch my tutorials:", err);
//     }
//   };

//   // -------------------- Form Handling --------------------
//   const handleChange = (e) => {
//     const { name, files, value } = e.target;
//     if (name === "video") setFormData({ ...formData, video: files[0] });
//     else if (name === "images") setFormData({ ...formData, images: files });
//     else setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUserId || !isCrafter) return alert("Login as crafter to upload.");

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     if (formData.video) data.append("video", formData.video);
//     for (let i = 0; i < formData.images.length; i++) data.append("images", formData.images[i]);
//     data.append("uploadedBy", currentUserId);

//     try {
//       if (formData.tutorialId) {
//         await axios.put(`http://localhost:5000/tutorial/${formData.tutorialId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Tutorial updated successfully!");
//       } else {
//         await axios.post("http://localhost:5000/tutorial/create", data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Tutorial uploaded successfully!");
//       }
//       setFormData({ title: "", description: "", video: null, images: [], tutorialId: null });
//       setShowForm(false);
//       fetchTutorials();
//       fetchMyTutorials();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     }
//   };

//   // -------------------- Likes --------------------
// const handleLike = async (tutorialId) => {
//   if (!currentUserId) {
//     alert("Login to like tutorials.");
//     return;
//   }

//   try {
//     const res = await axios.post(`http://localhost:5000/tutorial/${tutorialId}/like`, {
//       userId: currentUserId
//     });

//     const updated = displayedTutorials.map((t) =>
//       t._id === tutorialId
//         ? { ...t, likes: res.data.likesCount, likedBy: res.data.likedBy }
//         : t
//     );

//     if (filter === "my") setMyTutorials(updated);
//     else setTutorials(updated);
//   } catch (err) {
//     console.error("Like failed:", err);
//     alert("Failed to like tutorial");
//   }
// };


//   // -------------------- Add Comment --------------------
//   const handleComment = async (tutorialId) => {
//     if (!currentUserId) return alert("Login to comment.");
//     const text = commentText[tutorialId]?.trim();
//     if (!text) return;

//     try {
//       const res = await axios.post("http://localhost:5000/comment/create", {
//         user: currentUserId,
//         targetId: tutorialId,
//         type: "tutorial",
//         text,
//       });

//       if (res.data.comment) {
//         const newComment = { user: { name: currentUser.name }, text };
//         const updated = displayedTutorials.map((t) =>
//           t._id === tutorialId ? { ...t, comments: [...(t.comments || []), newComment] } : t
//         );
//         filter === "my" ? setMyTutorials(updated) : setTutorials(updated);
//         setCommentText({ ...commentText, [tutorialId]: "" });
//       }
//     } catch (err) {
//       console.error("Comment failed:", err);
//       alert("Failed to post comment");
//     }
//   };

//   // -------------------- Delete Tutorial --------------------
//   const handleDelete = async (tutorialId) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/tutorial/${tutorialId}`);
//       fetchTutorials();
//       fetchMyTutorials();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete tutorial.");
//     }
//   };

//   const displayedTutorials = filter === "my" ? myTutorials || [] : tutorials || [];

//   return (
//     <>
//       <Header />
//       <div className="tutorial-page">
//         <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
//         <h1>Tutorials</h1>

//         {isCrafter && (
//           <div className="filter-buttons">
//             <button onClick={() => setFilter("my")} className={`tab-button ${filter === "my" ? "active" : ""}`}>My Tutorials</button>
//             <button onClick={() => setFilter("all")} className={`tab-button ${filter === "all" ? "active" : ""}`}>Show All Tutorials</button>
//           </div>
//         )}

//         {isCrafter && (
//           <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>{showForm ? "Close Form" : "Add Tutorial"}</button>
//         )}

//         {isCrafter && showForm && (
//           <form className="tutorial-form" onSubmit={handleSubmit}>
//             <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//             <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//             <input type="file" name="video" accept="video/*" onChange={handleChange} />
//             <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />
//             <button type="submit">{formData.tutorialId ? "Update Tutorial" : "Upload Tutorial"}</button>
//           </form>
//         )}

//         <div className="tutorial-grid">
//           {displayedTutorials.length === 0 ? (
//             <p>No tutorials to display.</p>
//           ) : (
//             displayedTutorials.map((t) => (
//               <TutorialCard
//                 key={t._id}
//                 tutorial={t}
//                 currentUser={currentUser}
//                 handleDelete={handleDelete}
//                 handleLike={handleLike}
//                 handleComment={handleComment}
//                 commentText={commentText}
//                 setCommentText={setCommentText}
//                 isCrafter={isCrafter}
//                 setFormData={setFormData}
//                 setShowForm={setShowForm}
//               />
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // -------------------- Tutorial Card --------------------
// const TutorialCard = ({ tutorial, currentUser, handleDelete, handleLike, handleComment, commentText, setCommentText, isCrafter, setFormData, setShowForm }) => {
//   const currentUserId = currentUser?._id;
//   const uploaderId = tutorial.uploadedBy?._id;
//   const uploaderName = tutorial.uploadedBy?.name || "Anonymous";

//   return (
//     <div className="tutorial-card">
//       {tutorial.video && (
//         <video className="tutorial-video" src={`http://localhost:5000/uploads/${tutorial.video?.filename || tutorial.video}`} controls />
//       )}
//       {tutorial.images?.length > 0 && (
//         <div className="tutorial-images">
//           {tutorial.images.map((img, idx) => (
//             <img className="tutorial-image" src={`http://localhost:5000/uploads/${img.filename || img}`} key={idx} alt="tutorial" />
//           ))}
//         </div>
//       )}

//       <div className="tutorial-title">{tutorial.title}</div>
//       <div className="tutorial-desc">{tutorial.description}</div>

//       <div className="tutorial-uploader">
//         Uploaded by:{" "}
//         {uploaderId ? <Link to={`/profile/${uploaderId}`} className="uploader-link">{uploaderName}</Link> : <span>{uploaderName}</span>}
//       </div>

//       {isCrafter && uploaderId === currentUserId && (
//         <div className="tutorial-management">
//           <button className="edit-btn" onClick={() => { setFormData({ title: tutorial.title, description: tutorial.description, video: null, images: [], tutorialId: tutorial._id }); setShowForm(true); }}>✏️ Edit</button>
//           <button className="delete-btn" onClick={() => handleDelete(tutorial._id)}>🗑️ Delete</button>
//         </div>
//       )}

//       {currentUserId && (
//         <div className="tutorial-actions">
//           <button className="like-btn" onClick={() => handleLike(tutorial._id)}>❤️ Like {tutorial.likes || 0}</button>
//           <input type="text" placeholder="Add comment..." value={commentText[tutorial._id] || ""} onChange={(e) => setCommentText({ ...commentText, [tutorial._id]: e.target.value })} />
//           <button className="comment-btn" onClick={() => handleComment(tutorial._id)}>Comment</button>
//         </div>
//       )}

//       <div className="tutorial-comments">
//         {tutorial.comments?.map((c, idx) => (
//           <div className="comment-text" key={idx}><b>{c.user?.name || "Anonymous"}:</b> {c.text}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TutorialPage;
