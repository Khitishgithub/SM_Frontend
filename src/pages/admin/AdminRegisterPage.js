import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Grid, Box, Typography, Paper, Checkbox, FormControlLabel, 
  TextField, CssBaseline, IconButton, InputAdornment, CircularProgress,
  Stepper, Step, StepLabel, Button, Fade
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, School, Person, Email, Lock } from '@mui/icons-material';

import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#7f56da',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    // Form state
    const [formValues, setFormValues] = useState({
        adminName: '',
        schoolName: '',
        email: '',
        password: ''
    });
    
    // UI state
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    // Error states
    const [errors, setErrors] = useState({
        adminName: false,
        schoolName: false,
        email: false,
        password: false
    });
    
    const steps = ['Personal Details', 'School Information', 'Account Setup'];
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const { adminName, schoolName, email, password } = formValues;
        
        // Validate all fields
        const newErrors = {
            adminName: !adminName,
            schoolName: !schoolName,
            email: !email,
            password: !password
        };
        
        setErrors(newErrors);
        
        // Check if any errors exist
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        const fields = { 
            name: adminName, 
            email, 
            password, 
            role, 
            schoolName 
        };
        
        setLoader(true);
        setCompleted(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        
        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: false
            });
        }
    };
    
    const handleNext = () => {
        // Validate current step before proceeding
        if (activeStep === 0 && !formValues.adminName) {
            setErrors({ ...errors, adminName: true });
            return;
        }
        if (activeStep === 1 && !formValues.schoolName) {
            setErrors({ ...errors, schoolName: true });
            return;
        }
        if (activeStep === 2) {
            if (!formValues.email) {
                setErrors({ ...errors, email: true });
                return;
            }
            if (!formValues.password) {
                setErrors({ ...errors, password: true });
                return;
            }
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
            setCompleted(false);
        }
        else if (status === 'error') {
            console.log(error);
            setLoader(false);
            setCompleted(false);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    // Content for each step
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Fade in={true} timeout={500}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Tell us about yourself
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Your Name"
                                name="adminName"
                                value={formValues.adminName}
                                autoComplete="name"
                                autoFocus
                                error={errors.adminName}
                                helperText={errors.adminName && 'Name is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Fade>
                );
            case 1:
                return (
                    <Fade in={true} timeout={500}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                School Information
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="schoolName"
                                label="School Name"
                                name="schoolName"
                                value={formValues.schoolName}
                                autoComplete="off"
                                error={errors.schoolName}
                                helperText={errors.schoolName && 'School name is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Fade>
                );
            case 2:
                return (
                    <Fade in={true} timeout={500}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Create Account
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formValues.email}
                                autoComplete="email"
                                error={errors.email}
                                helperText={errors.email && 'Email is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                value={formValues.password}
                                autoComplete="current-password"
                                error={errors.password}
                                helperText={errors.password && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    </Fade>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ 
                minHeight: '100vh', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                py: 4
            }}>
                <CssBaseline />
                <Paper sx={{ 
                    maxWidth: 600, 
                    width: '100%', 
                    mx: 2,
                    overflow: 'hidden'
                }} elevation={3}>
                    <Box sx={{ 
                        p: 4,
                        pb: 2
                    }}>
                        <Typography variant="h4" align="center" sx={{ mb: 1, color: "#2c2143", fontWeight: 'bold' }}>
                            Admin Registration
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4, color: '#666' }}>
                            Create your own school management system
                        </Typography>

                        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            {getStepContent(activeStep)}
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box>
                                    {activeStep === steps.length - 1 ? (
                                        <LightPurpleButton
                                            type="submit"
                                            variant="contained"
                                            disabled={loader}
                                        >
                                            {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
                                        </LightPurpleButton>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ 
                                                bgcolor: '#7f56da',
                                                '&:hover': {
                                                    bgcolor: '#6a46bb',
                                                },
                                            }}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            
                            {completed && (
                                <Fade in={completed}>
                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <CircularProgress size={24} sx={{ mb: 1 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Creating your account...
                                        </Typography>
                                    </Box>
                                </Fade>
                            )}
                            
                            <Box sx={{ 
                                mt: 3, 
                                textAlign: 'center',
                                borderTop: '1px solid #eee',
                                pt: 2
                            }}>
                                <Typography variant="body2" sx={{ display: 'inline' }}>
                                    Already have an account?
                                </Typography>
                                <StyledLink to="/Adminlogin">
                                    Log in
                                </StyledLink>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  margin-left: 8px;
  text-decoration: none;
  color: #7f56da;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;