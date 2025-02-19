import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import VerificationModal from "./VerificationModal";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

function ResponsiveAppBar() {
  const [vloading, setVloading] = React.useState(false);
  const [codeopen, setCodeOpen] = React.useState(false);
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messagee, setMessagee] = React.useState("");
  const [alertopen, setAlertOpen] = React.useState(false);
  const [alertopenn, setAlertOpenn] = React.useState(false);
  const [loginloading, setloginLoading] = React.useState(false);
  const [registerLoading, setregisterLoading] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [alertType, setAlertType] = React.useState("error");
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Hide scrollbar
    } else {
      document.body.style.overflow = "auto"; // Restore scrollbar
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [open]);
  function handleClose() {
    setOpen(false);
    setLogin(true);
  }
  const handleClosse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };
  const handleClossse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpenn(false);
  };
  const pages = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    {
      name: isAuthenticated ? "Admin Page" : "Apply Now",
      path: isAuthenticated ? "/adminpage" : "/apply",
      id: "applyButton",
    },
  ];
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger submit on Enter key press
    }
  };
  const handleSubmit = async () => {
    if (login) {
      if (loginForm.email === "" || loginForm.password === "") {
        setMessage("Please fill all the fields");
        setAlertOpen(true);
        return;
      }
      console.log("Login form submitted:", loginForm);
      try {
        setloginLoading(true);
        const res = await axios.post("http://127.0.0.1:8000/api/user/login", {
          email: loginForm.email,
          password: loginForm.password,
        });
        if (res.data) {
          if (res.data.message === "Login successful") {
            setloginLoading(false);
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("isAuthenticated", "true");
            window.location.href = "/adminpage";
          } else if (
            res.data.message === "Invalid email or password" ||
            res.data.message === "Too many attempts. Please try again in later"
          ) {
            setloginLoading(false);
            setMessage(
              res.data.message ===
                "Too many attempts. Please try again in later"
                ? `Too many attempts. Please try again later at ${res.data.time_left} minutes`
                : "Invalid email or password"
            );
            setAlertOpen(true);
          } else if (res.data.message === "User not found") {
            setloginLoading(false);
            setMessage("User not found");
            setAlertOpen(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // setCodeOpen(true);

      if (
        registerForm.name === "" ||
        registerForm.email === "" ||
        registerForm.password === "" ||
        registerForm.confirmPassword === ""
      ) {
        setMessage("Please fill all the fields");
        setAlertOpen(true);
        return;
      }
      if (registerForm.password !== registerForm.confirmPassword) {
        setMessage("Passwords do not match");
        setAlertOpen(true);
        return;
      }
      setregisterLoading(true);
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/user/register",
          {
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password,
          }
        );

        if (res.data) {
          if (
            res.data.message === "Verification code has been sent to your email"
          ) {
            setMessagee("Verification code has been sent to your email");
            setAlertOpenn(true);
            setregisterLoading(false);
            localStorage.setItem("email_to_verify", registerForm.email);
            setCodeOpen(true);
          }
          if (res.data.message === "Email already exists") {
            setMessage("Email already in use");
            setAlertOpen(true);
            setregisterLoading(false);
            return;
          }
          if (
            res.data.message ===
            "User created successfully please check your email for verification"
          ) {
            setregisterLoading(false);
            localStorage.setItem("email_to_verify", registerForm.email);
            setMessagee("User created successfully");
            setAlertOpenn(true);
            setCodeOpen(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
      console.log("Register form submitted:", registerForm);
    }
  };
  const handleLogout = async () => {
    const email = localStorage.getItem("email");

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/user/logout", {
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  const handleVerifyCode = async () => {
    const c = code.join("");
    console.log(c);
    console.log(localStorage.getItem("email_to_verify"));
    if (c === "") {
      setMessagee("Please enter a code");
      setAlertOpenn(true);
      return;
    }
    try {
      setVloading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/verifycode",
        {
          email: localStorage.getItem("email_to_verify"),
          code: c,
        }
      );
      if (res.data.status === "success") {
        localStorage.removeItem("email_to_verify");
        setMessagee("User verified successfully. You can now login.");
        setAlertOpenn(true);
        window.location.href = "/";
      } else {
        setMessage(res.data.message);
        setAlertOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
    setVloading(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Toolbar>
            <img src="/lifewood.svg" alt="logo" className="w-10 h-10" />
          </Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                id={page.id} // Add id for Apply button
                sx={{
                  padding: "0.5rem 1rem",
                  my: 2,
                  color: "black",
                  display: "block",
                  ":hover": {
                    color: "white",
                    backgroundColor: "#003300", // Example hover effect
                    transition: "all 0.5s ease", // Smooth transition
                  },
                  // Default "hovered" style for Apply button (ID)
                  ...(page.name === "Apply Now" && {
                    color: "white",
                    backgroundColor: "#003300",
                  }),
                  ...(page.name === "Admin Page" && {
                    color: "white",
                    backgroundColor: "#003300",
                  }),
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Container>

        {localStorage.getItem("isAuthenticated") === "true" ? (
          <Button
            onClick={handleLogout}
            sx={{
              padding: "0.5rem 1rem",
              my: 2,
              color: "black",
              display: "block",
              ":hover": {
                color: "white",
                backgroundColor: "#003300", // Example hover effect
                transition: "all 0.5s ease", // Smooth transition
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            sx={{
              color: "black",
              transition: "all 0.5s ease", // Apply transition globally
              ":hover": {
                color: "white",
                backgroundColor: "#003300", // Example hover effect
              },
              paddingRight: "1.5rem",
              paddingLeft: "1.5rem",
              marginRight: "1rem",
            }}
            onClick={handleOpen}
          >
            <AdminPanelSettingsIcon />
            Login
          </Button>
        )}
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock={false} // This prevents scrolling on the body when the modal is open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            overflow: "hidden", // Prevents background scrolling
          },
        }}
      >
        <Box sx={style}>
          {login ? (
            <>
              {/* Login Section */}
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                WELCOME BACK
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", mb: "1.5rem" }}
              >
                Login to your account to continue
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                  gap: "1rem",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    onKeyDown={handleKeyDown}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    color: "white",
                    backgroundColor: "#003300",
                    transition: "all 0.5s ease",
                    ":hover": {
                      backgroundColor: "#055c05",
                    },
                    paddingRight: "1.5rem",
                    paddingLeft: "1.5rem",
                    fontWeight: "bold",
                    padding: "1rem",
                  }}
                >
                  {loginloading === false ? "Login" : <CircularProgress />}
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textWrap: "nowrap",
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    Don't have an account?{" "}
                  </Typography>
                  <Typography
                    style={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setLogin(false); // Switch to registration view
                    }}
                  >
                    Sign Up
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Registration Section */}
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                CREATE AN ACCOUNT
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", mb: "1.5rem" }}
              >
                Register to get started
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  paddingRight: "2rem",
                  paddingLeft: "2rem",
                  gap: "1rem",
                }}
              >
                <TextField
                  id="outlined-firstname"
                  label="Name"
                  variant="outlined"
                  value={registerForm.name}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, name: e.target.value })
                  }
                />

                <TextField
                  id="outlined-email"
                  label="Email"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                  variant="outlined"
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "#003300",
                    transition: "all 0.5s ease",
                    ":hover": {
                      backgroundColor: "#055c05",
                    },
                    paddingRight: "1.5rem",
                    paddingLeft: "1.5rem",
                    fontWeight: "bold",
                    padding: "1rem",
                  }}
                  onClick={handleSubmit}
                >
                  {registerLoading === false ? "Sign Up" : <CircularProgress />}
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textWrap: "nowrap",
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    Already have an account?{" "}
                  </Typography>
                  <Typography
                    style={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setLogin(true); // Switch to login view
                    }}
                  >
                    Login
                  </Typography>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 5, // Set the zIndex higher than the modal
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={alertopen}
        autoHideDuration={3000}
        onClose={handleClosse}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClosse}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertopenn}
        autoHideDuration={3000}
        onClose={handleClossse}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClossse}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messagee}
        </Alert>
      </Snackbar>
      <VerificationModal
        vloading={vloading}
        codeopen={codeopen} // Control the modal's open/close state
        setCode={setCode} // Set the verification code
        handleVerifyCode={handleVerifyCode} // Handle verification
        code={code}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;
