import React from "react";
import "../pages/css/fotter.css";
import { Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <img src="/lifewood2.svg" alt="Lifewood Logo" />
        <div className="icons">
          <Typography variant="h4" color="white">
            Visit
          </Typography>
          {/* YouTube Link */}
          <a
            href="https://www.youtube.com/@LifewoodDataTechnology/videos"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "none" }}
          >
            <YouTubeIcon fontSize="large" />
          </a>
          <a
            href="https://www.lifewood.com/ai-projects.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "none" }}
          >
            <LanguageIcon color="white" fontSize="large" />
          </a>
        </div>
      </div>
    </>
  );
}
