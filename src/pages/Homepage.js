import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid,  Button } from '@mui/material';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import { motion } from 'framer-motion';

const Homepage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <StyledContainer>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <HeroSection>
                            <StyledTitle>
                                Welcome to
                                <GradientSpan> College Management System</GradientSpan>
                            </StyledTitle>
                            
                            <FeatureList>
                                <FeatureItem>
                                    <FeatureIcon>✓</FeatureIcon>
                                    <span>Streamlined student management</span>
                                </FeatureItem>
                                <FeatureItem>
                                    <FeatureIcon>✓</FeatureIcon>
                                    <span>Automated attendance tracking</span>
                                </FeatureItem>
                                <FeatureItem>
                                    <FeatureIcon>✓</FeatureIcon>
                                    <span>Performance assessment tools</span>
                                </FeatureItem>
                                <FeatureItem>
                                    <FeatureIcon>✓</FeatureIcon>
                                    <span>Seamless communication platform</span>
                                </FeatureItem>
                            </FeatureList>
                        </HeroSection>
                    </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <LoginCard>
                            <CardHeader>Get Started Today</CardHeader>
                            <CardDescription>
                                Access your dashboard to manage classes, students, and faculty with ease.
                            </CardDescription>
                            
                            <ButtonsContainer>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                
                                <StyledLink to="/chooseasguest">
                                    <OutlinedButton variant="outlined" fullWidth>
                                        Try as Guest
                                    </OutlinedButton>
                                </StyledLink>
                            </ButtonsContainer>
                            
                            <SignupText>
                                Don't have an account?{' '}
                                <SignupLink to="/Adminregister">
                                    Sign up
                                </SignupLink>
                            </SignupText>
                        </LoginCard>
                    </motion.div>
                </Grid>
            </Grid>
            
            <WaveBackground>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#7f56da22" fillOpacity="1" d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,154.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </WaveBackground>
        </StyledContainer>
    );
};

export default Homepage;


const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 64px 24px;
`;

const HeroSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: #252525;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;

const GradientSpan = styled.span`
  background: linear-gradient(90deg, #7f56da, #550080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #333;
`;

const FeatureIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7f56da, #550080);
  color: white;
  margin-right: 16px;
  font-size: 14px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.h2`
  font-size: 1.8rem;
  color: #252525;
  margin-bottom: 16px;
  text-align: center;
`;

const CardDescription = styled.p`
  color: #666;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const OutlinedButton = styled(Button)`
  padding: 12px 0;
  border: 2px solid #7f56da;
  color: #550080;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(127, 86, 218, 0.1);
    border-color: #550080;
  }
`;

const SignupText = styled.p`
  text-align: center;
  color: #666;
  margin-top: 24px;
`;

const SignupLink = styled(Link)`
  color: #7f56da;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #550080;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const WaveBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: -1;
`;