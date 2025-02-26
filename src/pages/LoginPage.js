import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
  Fade,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Person,
  School,
  Email,
  Lock,
  Badge,
  AccountCircle,
} from "@mui/icons-material";

import { LightPurpleButton } from "../components/buttonStyles";
import styled from "styled-components";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7f56da",
    },
    secondary: {
      main: "#f8f9fa",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#7f56da",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  // State management
  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    rollNumber: "",
    studentName: "",
  });

  // Error states
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    rollNumber: false,
    studentName: false,
  });

  // Animation state
  const [formAnimation, setFormAnimation] = useState(true);

  const handleTabChange = (event, newValue) => {
    setFormAnimation(false);
    setTimeout(() => {
      setActiveTab(newValue);
      setFormAnimation(true);
    }, 300);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const { rollNumber, studentName, password } = formValues;

      // Validate fields
      const newErrors = {
        ...errors,
        rollNumber: !rollNumber,
        studentName: !studentName,
        password: !password,
      };

      setErrors(newErrors);

      if (!rollNumber || !studentName || !password) {
        return;
      }

      const fields = {
        rollNum: rollNumber,
        studentName,
        password,
      };

      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const { email, password } = formValues;

      // Validate fields
      const newErrors = {
        ...errors,
        email: !email,
        password: !password,
      };

      setErrors(newErrors);

      if (!email || !password) {
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  // Get the appropriate icon for the role
  const getRoleIcon = () => {
    switch (role) {
      case "Admin":
        return <School fontSize="large" />;
      case "Teacher":
        return <Badge fontSize="large" />;
      case "Student":
        return <Person fontSize="large" />;
      default:
        return <AccountCircle fontSize="large" />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            maxWidth: 450,
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 70,
                  height: 70,
                  mb: 2,
                }}
              >
                {getRoleIcon()}
              </Avatar>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2c2143" }}
              >
                {role} Login
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Welcome back! Please enter your details
              </Typography>
            </Box>

            {role === "Student" && (
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab label="Roll Number" />
                <Tab label="Student Details" />
              </Tabs>
            )}

            <Fade in={formAnimation} timeout={500}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                {role === "Student" ? (
                  <>
                    {activeTab === 0 && (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="rollNumber"
                        label="Enter your Roll Number"
                        name="rollNumber"
                        autoComplete="off"
                        type="number"
                        autoFocus
                        value={formValues.rollNumber}
                        error={errors.rollNumber}
                        helperText={
                          errors.rollNumber && "Roll Number is required"
                        }
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}

                    {activeTab === 1 && (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="studentName"
                        label="Enter your name"
                        name="studentName"
                        autoComplete="name"
                        autoFocus
                        value={formValues.studentName}
                        error={errors.studentName}
                        helperText={errors.studentName && "Name is required"}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </>
                ) : (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formValues.email}
                    error={errors.email}
                    helperText={errors.email && "Email is required"}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={toggle ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formValues.password}
                  error={errors.password}
                  helperText={errors.password && "Password is required"}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setToggle(!toggle)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {toggle ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <StyledLink href="#">Forgot password?</StyledLink>
                </Box>

                <LightPurpleButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1rem",
                  }}
                  disabled={loader}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </LightPurpleButton>

                <Box sx={{ position: "relative", my: 3 }}>
                  <Divider>or</Divider>
                </Box>

                <Button
                  fullWidth
                  onClick={guestModeHandler}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    color: "#7f56da",
                    borderColor: "#7f56da",
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#6a46bb",
                      backgroundColor: "rgba(127, 86, 218, 0.04)",
                    },
                  }}
                  disabled={guestLoader}
                >
                  {guestLoader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login as Guest"
                  )}
                </Button>

                {role === "Admin" && (
                  <Box
                    sx={{
                      mt: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ display: "inline" }}>
                      Don't have an account?
                    </Typography>
                    <StyledLink to="/Adminregister">Sign up</StyledLink>
                  </Box>
                )}
              </Box>
            </Fade>
          </Box>
        </Paper>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            flexDirection: "column",
            gap: 2,
          }}
          open={guestLoader}
        >
          <CircularProgress color="inherit" />
          <Typography>Please wait while we log you in...</Typography>
        </Backdrop>

        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-left: 8px;
  text-decoration: none;
  color: #7f56da;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
