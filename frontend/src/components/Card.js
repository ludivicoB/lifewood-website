import { Container, Typography } from "@mui/material";
import React from "react";
import "../components/css/Card.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

// Function to get the appropriate icon based on title
const getIcon = (title) => {
  switch (title) {
    case "Text":
      return <AssignmentIcon sx={{ fontSize: "5rem", color: "#185407" }} />;
    case "Audio":
      return (
        <VolumeUpOutlinedIcon sx={{ fontSize: "5rem", color: "#185407" }} />
      );
    case "Image":
      return <ImageIcon sx={{ fontSize: "5rem", color: "#185407" }} />;
    case "Video":
      return <OndemandVideoIcon sx={{ fontSize: "5rem", color: "#185407" }} />;
    default:
      return <AssignmentIcon sx={{ fontSize: "5rem", color: "#185407" }} />; // Default icon
  }
};

export default function Card({ title, desc }) {
  return (
    <Container className="card-container">
      {getIcon(title)}
      <Typography
        variant="h4"
        sx={{ color: "black", fontFamily: "Raleway, Arial" }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "black", fontFamily: "Raleway, Arial" }}>
        {desc}
      </Typography>
    </Container>
  );
}
