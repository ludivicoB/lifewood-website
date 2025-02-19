import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import "./css/about.css";
import Grid from "@mui/material/Grid";
export default function AboutPage() {
  return (
    <>
      {/* Header Section */}
      <div
        className="about"
        style={{ width: "100%", backgroundColor: "black" }}
      >
        <div className="text-about">
          <Typography
            variant="h1"
            color="#e6e6e6"
            sx={{ letterSpacing: "0.5rem" }}
          >
            ABOUT LIFEWOOD
          </Typography>
          <Typography
            variant="h5"
            style={{ color: "#e6e6e6", fontStyle: "italic" }}
          >
            Get to know the company
          </Typography>
        </div>
      </div>

      <Container sx={{ padding: "0rem" }}>
        {/* Lifewood History Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              marginBottom: "2rem",
              width: "100%",
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <Box sx={{ width: "50%", padding: "2rem" }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Lifewood History
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2004, Lifewood is a highly-respected provider of AI
                data solutions and services. While we are motivated by business
                and economic objectives, we remain committed to our core
                business beliefs that shape our corporate and individual
                behavior around the world.
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <img
                className="ailogo"
                src="/lifewoodbuild.jpeg"
                alt="AI Logo"
                style={{ opacity: "0.8", width: "95%", height: "100%" }}
              />
            </Box>
          </Box>
        </motion.div>

        <Container sx={{ padding: "0rem", width: "100%" }}>
          {/* WE VALUE Section */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
              fontWeight: "bold",
            }}
          >
            WE VALUE
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              {
                title: "DIVERSITY",
                img: "/diversity.jpg",
                text: "We celebrate differences in belief, religion, and ways of life.",
              },
              {
                title: "CARING",
                img: "/caring.jpg",
                text: "We care deeply for every person equally.",
              },
              {
                title: "INNOVATION",
                img: "/innovation.jpg",
                text: "Innovation enriches our lives and challenges us to improve.",
              },
              {
                title: "INTEGRITY",
                img: "/integrity.jpg",
                text: "We act ethically and sustainably in all we do.",
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      height: "320px", // Ensures uniform height
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      backgroundImage: `url(${value.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      borderRadius: "10px",
                      overflow: "hidden",
                      padding: "1.5rem",
                    }}
                  >
                    {/* Dark Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                      }}
                    />

                    {/* Text Content */}
                    <Box
                      sx={{ position: "relative", color: "#fff", zIndex: 1 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginBottom: "0.8rem" }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1rem", lineHeight: "1.5" }}
                      >
                        {value.text}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Lifewood Global Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginTop: "2rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <img
                className="ailogo"
                src="https://www.lifewood.com/public/image111@2x.png"
                alt="AI Logo"
                style={{ opacity: "0.8", width: "100%" }}
              />
            </Box>
            <Box sx={{ width: "50%", padding: "2rem" }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Lifewood Global
              </Typography>
              <Typography variant="body1" paragraph>
                Lifewood, active in 16 countries, drives innovation, builds
                bridges, and forms new friendships...
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <div className="stats">
          {[
            { number: "34,738", label: "ONLINE WORKFORCE" },
            { number: "25", label: "DELIVERY SITES" },
            { number: "16", label: "COUNTRIES ON 4 CONTINENTS" },
            { number: "50+", label: "LANGUAGE CAPABILITIES" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div>
                <Typography style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  {stat.number}
                </Typography>
                <Typography>{stat.label}</Typography>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </>
  );
}
