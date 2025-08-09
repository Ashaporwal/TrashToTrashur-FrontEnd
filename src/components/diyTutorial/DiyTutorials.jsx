import { useState } from "react";
import Header from "../Header";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DiyCards from "./DiyCards";
import Footer from "../Footer";



function DiyTutorials(){

    const [selected,setSelected] = useState("");

    const handleChange = (e)=>{
        setSelected(e.target.value);
    }
    return <>
    <Header/>
    <div style={{backgroundColor:"#E6D5B8"}}>
    <h1 style={{textAlign:"center",paddingTop:"15px"}}>Diy Tutorials</h1>
<h5 style={{textAlign:"center",fontWeight:"100",paddingTop:"5px"}}>Learn from our community of eco-crafters. Transform waste into wonderful creations with step-by-step guides.</h5>

<div style={{paddingTop:"20px"}}>
<div style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", height:"23vh",width:"100%", color:"grey", borderRadius:"25px"}}>
<input type="text" placeholder="Search Tutorials.." style={{paddingTop:"5px",width:"100%",padding:"10px 15px",borderRadius:"20px",border:"1px solid #ccc",outline:"none",fontSize:"16px"}}/>


<div style={{display:"flex",margin:"11px",alignItems:"center",justifyContent:"center"}}>
<select id="category" value={selected} onChange={handleChange} style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc",fontSize:"16px"}}
>


 <option value="All Category">All Category</option>
        <option value="craft">Home Decor</option>
        <option value="art">Gardening</option>
        <option value="recycle">Recycle</option>
      </select>

<select id="category" value={selected} onChange={handleChange} style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc",fontSize:"16px"}}
>
 <option value="All Category">All Category</option>
        <option value="craft">Home Decor</option>
        <option value="art">Gardening</option>
        <option value="recycle">Recycle</option>
      </select>

<select id="category" value={selected} onChange={handleChange} style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc",fontSize:"16px"}}
>
 <option value="All Category">All Category</option>
        <option value="craft">Home Decor</option>
        <option value="art">Gardening</option>
        <option value="recycle">Recycle</option>
      </select>

<select id="category" value={selected} onChange={handleChange} style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc",fontSize:"16px"}}
>
 <option value="All Category">All Category</option>
        <option value="craft">Home Decor</option>
        <option value="art">Gardening</option>
        <option value="recycle">Recycle</option>
      </select>

</div>
</div>
</div>

<div style={{ marginLeft:"10px",alignItems:"center",display:"flex",flexWrap:"wrap",width:"100%",justifyContent:"center",gap:"16px"}}>

  <div style={{paddingLeft:"10px", marginLeft:"20px",backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div>

  <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px" }}>
    <DiyCards/>
</div>

  <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div>

  {/* <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div> */}
</div>


<div style={{ marginLeft:"10px",alignItems:"center",display:"flex",flexWrap:"wrap",width:"100%",justifyContent:"center",gap:"16px"}}>

  <div style={{paddingLeft:"10px", marginLeft:"20px",backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div>

  <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div>

  <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div>

  {/* <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
    <DiyCards/>
</div> */}
</div>
<Footer/>

    {/* <h1>Hii this is DIyTutorials</h1> */}
    </div>
    </>
}

export default DiyTutorials;