// import React, { useState } from "react";

// import axios from "axios";

// const [formData,setFormData] = useState({
//   title: "",
//   description:"",
//   category:"",
//   materials:"",
//   steps:"",
// });
// function uploadSectoin(){
// const [video,setVideo] = useState(null);

// return <>

// <form onSubmit={handleSubmit}>
//   <input type="text" name="title" placeholder="Title" onChange={handleChange} />
//   <textarea name="description" placeholder="Description" onChange={handleChange} />
//   <select name="category" onChange={handleChange}>
//     <option>Crafts</option>
//     <option>Home Decor</option>
//   </select>
//   <textarea name="materials" placeholder="Materials required" onChange={handleChange} />
//   <textarea name="steps" placeholder="Steps" onChange={handleChange} />

//   <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />

//   <button type="submit">Upload Tutorial</button>
// </form>


// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = new FormData();
//   Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//   data.append('video', video);

//   try {
//     await axios.post("http://localhost:5000/tutorial", data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     alert('Tutorial uploaded!');
//   } catch (err) {
//     alert('Error uploading tutorial');
//   }
// };
// </>

// export default UploadSection;