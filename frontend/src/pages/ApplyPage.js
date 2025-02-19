import React, { useState } from "react";
import "./css/apply.css";
import { Paper, Typography, TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import axios from "axios";
const projects = [
  {
    url: "https://www.lifewood.com/public/vector-11@2x.png",
    title: "AI Data Extraction",
    description:
      "Using AI, we optimize the acquisition of images and text from multiple sources through onsite scanning, drone photography, negotiations with archives, and partnerships with corporations, religious organizations, and governments.",
    link: "https://www.lifewood.com/data-extraction.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/vector-31@2x.png",
    title: "Machine Learning Enablement",
    description:
      "From simple data to deep learning, our flexible data solutions enable a wide variety of machine learning systems, regardless of the model's complexity.",
    link: "https://www.lifewood.com/m-l.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/vector-52@2x.png",
    title: "Genealogy",
    description:
      "Powered by AI, Lifewood processes genealogical material rapidly and at scale to preserve and highlight family histories, national archives, corporate records, and registers in any language, era, or condition.",
    link: "https://www.lifewood.com/genealogy.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/vector-71@2x.png",
    title: "Natural Language Processing",
    description:
      "We have partnered with some of the world’s leading NLP development companies and, with a globally distributed workforce, offer solutions in over 50 languages.",
    link: "https://www.lifewood.com/language-processing.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/vector-91@2x.png",
    title: "AI-Enabled Customer Service",
    description:
      "AI-enabled customer service is the fastest and most effective way for institutions to provide personalized, proactive experiences that enhance customer engagement.",
    link: "https://www.lifewood.com/customer-service.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/ai-projects-computer-vision.png",
    title: "Computer Vision",
    description:
      "Training AI to see and understand the world requires a vast amount of high-quality training data. Lifewood offers comprehensive data solutions for CV development, including collection, annotation, classification, and more, for video and image datasets.",
    link: "https://www.lifewood.com/computer-vision.html", // URL for the "Learn More" button
  },
  {
    url: "https://www.lifewood.com/public/vector-13@2x.png",
    title: "Autonomous Driving Technologies",
    description:
      "At Lifewood, innovation propels us forward, particularly in our contributions to the development of Autonomous Driving Technology.",
    link: "https://www.lifewood.com/autonomous-driving.html", // URL for the "Learn More" button
  },
  {
    title: "None",
    description: "",
    url: "https://www.mcars.in/uploads/temp.png",
  },
];
export default function ApplyPage() {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openn, SetOpenn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectImage, setSelectedProjectImage] = useState("");

  const handleChange = (event) => {
    const selectedProjectTitle = event.target.value;
    setSelectedProject(selectedProjectTitle);

    // Find the project object based on the selected title
    const selectedProjectDetails = projects.find(
      (project) => project.title === selectedProjectTitle
    );

    setSelectedProjectImage(selectedProjectDetails.url); // Set the image URL
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClosee = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    SetOpenn(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    degree: "",
    jobExperience: "",
    contactTime: "",
    email: "",
    contactNumber: "",
    resume: null, // Store file as null initially
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];

      // Check if the file is a PDF
      if (file && file.type !== "application/pdf") {
        setErrorMessage("Only PDF files are allowed.");
        setOpen(true);
        return;
      }

      setFormData({ ...formData, [name]: file });
    } else if (name === "firstName" || name === "lastName") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData({ ...formData, [name]: capitalizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.age ||
      !formData.degree ||
      !formData.jobExperience ||
      !formData.contactTime ||
      !formData.email ||
      !formData.contactNumber
    ) {
      setErrorMessage("All fields are required, including the resume.");
      setOpen(true);
      return;
    }

    if (!formData.resume) {
      setErrorMessage("Please upload your resume, make sure it is a PDF file.");
      setOpen(true);
      return;
    }

    // Email validation
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setOpen(true);
      return;
    }

    if (!selectedProject || selectedProject === "None") {
      setErrorMessage("Please select a project.");
      setOpen(true);
      return;
    }

    // Create a FormData object to send data, including file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("degree", formData.degree);
    formDataToSend.append("jobExperience", formData.jobExperience);
    formDataToSend.append("contactTime", formData.contactTime);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("resume", formData.resume); // Append the resume file
    formDataToSend.append("projectname", selectedProject);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/application/insert",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        setLoading(false);
        setSuccessMessage("Application Successfully Submitted");
        SetOpenn(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLoading(false);
        setErrorMessage(
          res.data.message || "There was an error submitting your application."
        );
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while submitting."
      );
      setOpen(true);
    }
  };

  return (
    <>
      <div className="apply">
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "red",
            width: "80%",
          }}
        >
          <Paper
            sx={{
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "50%",
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "bold", color: "#004d00" }}
            >
              APPLY NOW
            </Typography>
            <div className="name">
              {/* First Name */}
              <TextField
                id="first-name"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />

              {/* Last Name */}
              <TextField
                id="last-name"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            {/* Age */}
            <TextField
              id="age"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
            />

            {/* Degree */}
            <TextField
              id="degree"
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
            />

            {/* Relevant Job Experience */}
            <TextField
              id="job-experience"
              label="Relevant Job Experience"
              name="jobExperience"
              multiline
              rows={3}
              value={formData.jobExperience}
              onChange={handleInputChange}
            />

            {/* Convenient Time to Contact */}
            <TextField
              id="contact-time"
              label="Convenient Time to Contact"
              name="contactTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={formData.contactTime}
              onChange={handleInputChange}
            />

            {/* Email */}
            <TextField
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Contact Number */}
            <TextField
              id="contact-number"
              label="Contact Number"
              name="contactNumber"
              type="number"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />

            {/* Resume File Input */}
            <TextField
              id="resume"
              label="Resume"
              name="resume"
              type="file"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".pdf" }} // Only accept PDF files
              onChange={handleInputChange}
            />

            {/* Submit Button */}
            <button
              className="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ fontWeight: "bold", padding: "0.5rem" }}
              >
                Submit
              </Typography>
            </button>
          </Paper>

          <Paper
            sx={{
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "50%",
              backgroundColor: "#076e07",
            }}
          >
            <Box sx={{}}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  paddingBottom: "1rem",
                }}
              >
                SELECT PROJECT
              </Typography>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "white" }}
                >
                  Projects
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProject}
                  label="Projects"
                  onChange={handleChange}
                  MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true, // Prevents background scrolling
                    PaperProps: {
                      sx: {
                        maxWidth: "90vw",
                        overflowX: "hidden",
                      },
                    },
                  }}
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(228, 219, 233)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(228, 219, 233)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                >
                  {projects.map((project, index) => (
                    <MenuItem key={index} value={project.title}>
                      {project.title}
                    </MenuItem>
                  ))}
                </Select>
                <Container sx={{ display: "flex", justifyContent: "center" }}>
                  {selectedProjectImage && (
                    <img
                      src={selectedProjectImage ? selectedProjectImage : ""}
                      alt={selectedProject}
                      style={{
                        marginTop: "1rem",
                        width: "90%",
                        height: "90%",
                        borderTop: "2rem solid black",
                        borderBottom: "2rem solid black",
                        textAlign: "center",
                        // maxHeight: "11rem",
                      }}
                    />
                  )}
                </Container>
              </FormControl>
            </Box>
          </Paper>
        </Container>
      </div>
      {/* Snackbar for error message */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openn}
        autoHideDuration={5000}
        onClose={handleClosee}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClosee}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
