import React from "react";
import { Typography } from "@mui/material";
import "./css/project.css";
import Carousel from "../components/Carousel";
export default function ProjectPage() {
  return (
    <>
      <div>
        <div
          className="project"
          style={{
            width: "100%",
            backgroundColor: "black",
          }}
        >
          <div>
            <img className="ailogoproj" src="/ai3.gif" alt="AI Logo"></img>
          </div>
          <div className="textproj">
            <Typography
              variant="h2"
              color="#e6e6e6"
              sx={{ letterSpacing: "0.5rem", textWrap: "nowrap" }}
            >
              AI DATA PROJECTS
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "white",
                letterSpacing: "0.1rem",
              }}
            >
              DRIVEN BY INNOVATION
            </Typography>
          </div>
        </div>
        <div className="carousel">
          <Carousel />
        </div>
        {/* <div className="be-amazed">
          <img src="/be-amazed.jpg"></img>
        </div> */}
      </div>
    </>
  );
}
