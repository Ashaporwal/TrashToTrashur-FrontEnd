import React, { useEffect, useState } from "react";
import axios from "axios";

function MyTutorials({ crafterId }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (crafterId) {
      fetchTutorials();
    }
  }, [crafterId]);

  const fetchTutorials = async () => {
    try {
const tutRes = await axios.get(
  `http://localhost:5000/tutorial/mytutorials/${crafterId}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
     console.log("Tutorials Response:", tutRes.data); 

    setTutorials(tutRes.data.tutorials || tutRes.data);
    //   setTutorials(res.data);
    } catch (err) {
      console.error("Failed to fetch tutorials:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading tutorials...</p>;

  return (
    <div className="tutorial-list">
      {tutorials.length > 0 ? (
        tutorials.map((tut) => (
          <div key={tut._id} className="tutorial-card">
            <h3>{tut.title}</h3>
            <p>{tut.description}</p>
          </div>
        ))
      ) : (
        <p>You haven’t uploaded any tutorials yet.</p>
      )}
    </div>
  );
}

export default MyTutorials;
