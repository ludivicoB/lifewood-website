import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../pages/css/home.css";
export default function MediaCard({ name, desc, img }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "1rem",
        ":hover": {
          transform: "scale(1.05)",
          transition: "all 0.5s ease", // Smooth transition
        },
        ":not:hover": {
          transform: "scale(1)",
          transition: "all 0.5s ease", // Smooth transition
        },
        cursor: "pointer",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
