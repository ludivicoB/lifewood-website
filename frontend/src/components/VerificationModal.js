import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
function VerificationModal({
  vloading,
  codeopen,
  handleVerifyCode,
  setCode,
  code,
}) {
  const handleChange = (e, index) => {
    const value = e.target.value;
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value; // Update the code at the correct index
      return newCode;
    });

    // Only move focus if the field is filled and it's not the last one
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      // Move focus to previous input field if Backspace is pressed on an empty field
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key !== "Backspace" && code[index] !== "" && index < 5) {
      // Move to the next input field if the current one is filled
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <Modal open={codeopen} sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: "1rem",
          boxShadow: 54,
          p: "2rem",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter Verification Code Sent to Your Email
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {code.map((_, index) => (
            <TextField
              key={index}
              id={`code-input-${index}`}
              value={code[index]}
              onChange={(e) => handleChange(e, index)} // Update value on change
              onKeyUp={(e) => handleKeyUp(e, index)} // Handle key events
              inputProps={{
                maxLength: 1, // Allow only one character per input
                style: { textAlign: "center" },
              }}
              sx={{ width: "3rem" }}
            />
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyCode}
          sx={{ marginTop: "1rem" }}
        >
          {vloading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Verify"
          )}
        </Button>
      </Box>
    </Modal>
  );
}

export default VerificationModal;
