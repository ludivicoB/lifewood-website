import React from "react";
import { Typography } from "@mui/material";
import ServiceDiv from "../components/ServiceDiv";
import "./css/home.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Card from "../components/Card";

const services = [
  {
    img: "https://media.istockphoto.com/id/1405973719/photo/automation-software-to-archiving-and-efficiently-manage-and-information-files-document.jpg?s=612x612&w=0&k=20&c=MyC_nm0Ro5wzbi6YexDGUzRNzZlkXlXHyoiIyfDFyjI=",
    name: "Data Acquisition",
    desc: "At Lifewood, we provide comprehensive data solutions for acquiring, processing and managing diverse datasets to fuel the training and evolution of artificial intelligence",
  },
  {
    img: "https://media.istockphoto.com/id/861122866/photo/teamwork-of-business-concept.jpg?s=612x612&w=0&k=20&c=sMOScA9qjlzXnHX9sNUMeAGU63ujz52qSPu2-XiXk8k=",
    name: "Data Collection",
    desc: "Text collection, labelling, speech collection (utterance), sentiment analysis: our services include audio, music, and video categorisation, classification, labelling, tagging, and broadcast subtitles.",
  },
  {
    img: "https://thumbs.dreamstime.com/b/data-annotation-inscription-blue-keyboard-key-written-metallic-finger-pressing-179810071.jpg",
    name: "Data Annotation",
    desc: "In the age of AI, data is the fuel for all analytics and machine learning. With our in-depth, high-quality library of services, we're here to be an integral part of your digital strategy, accelerating your organisation's cognitive systems.",
  },
  {
    img: "https://tdwi.org/-/media/TDWI/TDWI/BITW/analytics4.jpg",
    name: "Data Curation",
    desc: "We sift, select, and index data to ensure reliability, accessibility, and ease of classification. Data can be curated to support business decisions, academic research, genealogies, scientific research, and more.",
  },
  {
    img: "https://www.shutterstock.com/image-photo/man-tick-correct-sign-mark-600nw-2397955349.jpg",
    name: "Data Validation",
    desc: "The goal is to create data that is consistent, accurate, and complete, preventing data loss or errors in transfer, code, or configuration. We verify that data conforms to predefined standards, rules, or constraints, ensuring the information is trustworthy and fit for its intended purpose.",
  },
];

const modalities = [
  {
    title: "Text",
    desc: "Text collection, labelling, transcription, utterance, sentiment analysis",
  },
  {
    title: "Audio",
    desc: "Collection, labelling, voice categorization, music, intelligent cs",
  },
  {
    title: "Image",
    desc: "Collection, labelling, classification, audit, object detection and tagging",
  },
  {
    title: "Video",
    desc: "Collection, labelling, audit, live broadcast, subtitle generation",
  },
];

// Parent animation container (stagger effect)
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }, // Delay between animations
  },
};

// Child animation for Card (slide up effect)
const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Start lower
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <>
      <div className="home" style={{ width: "100%", backgroundColor: "black" }}>
        <div className="home-logo">
          <img
            className="ailogo"
            src="/ai.png"
            alt="AI Logo"
            style={{ opacity: "0.8" }}
          />
          <img
            className="ailogo"
            src="/ai2.png"
            alt="AI Logo"
            style={{ opacity: "0.8" }}
          />
        </div>
        <div className="text">
          <Typography
            variant="h4"
            color="#e6e6e6"
            sx={{ letterSpacing: "0.5rem" }}
          >
            HARNESSING THE POTENTIAL OF AI
          </Typography>
        </div>
      </div>

      <div className="services">
        <div
          className="servtext"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              letterSpacing: "0.5rem",
              padding: "1rem",
              fontWeight: "bold",
            }}
          >
            SERVICES
          </Typography>
          <Typography
            variant="h4"
            sx={{ letterSpacing: "", padding: "1rem", fontWeight: "" }}
          >
            A wide variety of services for all types of AI training data
          </Typography>
        </div>
        <hr
          style={{
            height: "6px",
            backgroundColor: "black",
            border: "none",
            width: "100%",
            marginBottom: "5%",
          }}
        />

        {/* Scroll-triggered animation */}
        <motion.div
          className="servcards"
          variants={containerVariants}
          initial="hidden"
        >
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
        </motion.div>
      </div>

      <div className="modalities">
        <div
          className="servtext"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              letterSpacing: "0.5rem",
              padding: "1rem",
              color: "white",
              fontWeight: "bold",
            }}
          >
            MODALITIES
          </Typography>
          <Typography
            variant="h4"
            sx={{
              letterSpacing: "",
              padding: "1rem",
              fontWeight: "",
              color: "white",
              textWrap: "nowrap",
            }}
          >
            We process multimodal data with advanced analysis.
          </Typography>
        </div>
        <hr
          style={{
            height: "6px",
            backgroundColor: "white",
            border: "none",
            width: "100%",
            textAlign: "center",
            marginBottom: "7%",
          }}
        />
        <div className="card-contain">
          <motion.div
            className="modal-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {modalities.map((modal, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card title={modal.title} desc={modal.desc} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Separate component for each ServiceDiv to handle animation on scroll
function ServiceItem({ service }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <ServiceDiv name={service.name} desc={service.desc} img={service.img} />
    </motion.div>
  );
}
