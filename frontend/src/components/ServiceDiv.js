import { Typography } from "@mui/material";
import React from "react";
import "./css/servicecard.css";
const style = {
  textAlign: "center",
  fontFamily: "Raleway, Arial",
  fontWeight: "bold",
};
export default function ServiceDiv({ name, desc, img }) {
  return (
    <div className="service-card">
      <div className="service-text">
        <Typography variant="h4" sx={style}>
          {name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: "2rem", textAlign: "center" }}
        >
          {desc}
        </Typography>
      </div>
      <div
        className="service-img"
        style={{ width: "30rem", height: "18rem", overflow: "hidden" }}
      >
        <img
          src={img}
          alt="service"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
