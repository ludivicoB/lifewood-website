import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  TablePagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FullInfoCard from "../components/FullInfoCard";
const projects = [
  { title: "AI Data Extraction" },
  { title: "Machine Learning Enablement" },
  { title: "Genealogy" },
  { title: "Natural Language Processing" },
  { title: "AI-Enabled Customer Service" },
  { title: "Computer Vision" },
  { title: "Autonomous Driving Technologies" },
];

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [originalapplications, setOriginalApplications] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProject, setSelectedProject] = useState(""); // State for project filter
  const [selectedStatus, setSelectedStatus] = useState("pending"); // Default to "pending"
  const [openloading, setOpenloading] = useState(false);
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setOpenloading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/application/getall"
      );
      setOriginalApplications(response.data.applications);
      setApplications(
        response.data.applications.filter(
          (application) => application.isapproved === selectedStatus
        )
      );
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
    setOpenloading(false);
  };

  const handleOpen = (app) => {
    setSelectedFile(app);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProjectFilterChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleStatusFilterChange = (status) => {
    // Update the selected status
    console.log(status);
    console.log(applications);
    console.log(originalapplications);
    setSelectedStatus(status);
    let tempapplications = originalapplications;
    tempapplications = tempapplications.filter(
      (application) => application.isapproved === status
    );
    console.log(tempapplications);
    setApplications(tempapplications);
  };

  const handleApprove = async (applicationId) => {
    setOpenloading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/application/approve`,
        {
          application_id: applicationId,
        }
      );
      if (res.data) {
        fetchApplications();
        console.log(res.data);
      }
      setOpenloading(false);
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  const handleReject = async (applicationId) => {
    setOpenloading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/application/reject`,
        {
          application_id: applicationId,
        }
      );
      if (res.data) {
        fetchApplications();
        console.log(res.data);
      }
      setOpenloading(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  // Filter applications based on selected project
  const filteredApplications = selectedProject
    ? applications.filter((app) => app.projectname === selectedProject)
    : applications;

  return (
    <Box
      sx={{
        p: 4,
        height: "100vh",
        paddingBottom: "10rem",
        backgroundColor: "#e6e6e6",
        paddingBottom: "1rem",
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openloading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "2px 2px 2px rgb(23, 85, 13)",
          color: "white",
        }}
      >
        Application Management
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
        <Button
          variant={selectedStatus === "pending" ? "contained" : "outlined"}
          sx={{
            backgroundColor:
              selectedStatus === "pending" ? "green" : "transparent",
            color: selectedStatus === "pending" ? "white" : "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor:
                selectedStatus === "pending"
                  ? "darkgreen"
                  : "rgba(0, 128, 0, 0.1)",
              borderColor: "darkgreen",
            },
          }}
          onClick={() => handleStatusFilterChange("pending")}
        >
          Pending
        </Button>
        <Button
          variant={selectedStatus === "approved" ? "contained" : "outlined"}
          sx={{
            backgroundColor:
              selectedStatus === "approved" ? "green" : "transparent",
            color: selectedStatus === "approved" ? "white" : "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor:
                selectedStatus === "approved"
                  ? "darkgreen"
                  : "rgba(0, 128, 0, 0.1)",
              borderColor: "darkgreen",
            },
          }}
          onClick={() => handleStatusFilterChange("approved")}
        >
          Approved
        </Button>
        <Button
          variant={selectedStatus === "rejected" ? "contained" : "outlined"}
          sx={{
            backgroundColor:
              selectedStatus === "rejected" ? "green" : "transparent",
            color: selectedStatus === "rejected" ? "white" : "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor:
                selectedStatus === "rejected"
                  ? "darkgreen"
                  : "rgba(0, 128, 0, 0.1)",
              borderColor: "darkgreen",
            },
          }}
          onClick={() => handleStatusFilterChange("rejected")}
        >
          Rejected
        </Button>
      </Box>
      {/* Project Filter */}
      <FormControl fullWidth sx={{ mb: 2, width: "100%" }}>
        <InputLabel>Filter by Project</InputLabel>
        <Select
          value={selectedProject}
          onChange={handleProjectFilterChange}
          label="Filter by Project"
        >
          <MenuItem value="">
            <em>All Projects</em>
          </MenuItem>
          {projects.map((project, index) => (
            <MenuItem key={index} value={project.title}>
              {project.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredApplications.length === 0 ? (
        <Typography
          sx={{ textAlign: "center" }}
          variant="body1"
          color="textSecondary"
        >
          No applications found for the selected setting.
        </Typography>
      ) : (
        <>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredApplications.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
          />
          <TableContainer
            component={Paper}
            sx={{ border: "1px solid #004d00" }}
          >
            <Table>
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#004d00", // Ensure it doesn't blend with content
                  zIndex: 1, // Ensure header stays on top of content
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>First Name</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Last Name</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Age</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Degree</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Job Experience</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Contact Time</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Phone</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Project Name</strong>
                  </TableCell>
                  <TableCell sx={{ color: "white", textWrap: "noWrap" }}>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.firstname}</TableCell>
                      <TableCell>{app.lastname}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.age}</TableCell>
                      <TableCell>{app.degree}</TableCell>
                      <TableCell>{app.job_experience}</TableCell>
                      <TableCell>
                        {new Date(
                          `1970-01-01T${app.contact_time}`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>{app.num}</TableCell>
                      <TableCell>{app.projectname}</TableCell>
                      <TableCell>
                        {app.filename && selectedStatus === "pending" ? (
                          <Box sx={{ display: "flex", gap: "0.3rem" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleOpen(app)}
                            >
                              View File
                            </Button>
                            <Button
                              variant="contained"
                              color="white"
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                              onClick={() => handleApprove(app.application_id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                              }}
                              onClick={() => handleReject(app.application_id)}
                            >
                              Reject
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen(app)}
                          >
                            View File
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* MUI Modal for PDF Preview */}
      <Modal open={open} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            height: "85%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            // overflow: "auto",
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
            Resume Preview
          </Typography>
          {selectedFile ? (
            <iframe
              src={selectedFile.fileUrl}
              style={{
                width: "100%",
                height: "85%", // Fixed height for iframe
                border: "none",
              }}
              title="PDF Preview"
            ></iframe>
          ) : (
            <Typography>No file selected.</Typography>
          )}
          {/* <FullInfoCard selectedFile={selectedFile} /> */}
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ApplicationsPage;
