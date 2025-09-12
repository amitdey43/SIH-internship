import React from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaUser, FaChalkboardTeacher, FaBuilding } from "react-icons/fa";

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #121212, #0077b6, #dce8ff);
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;
  }

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// --- Styled Components ---

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const RegisterBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 60%;
    height: 3px;
    background: #0077b6;
    margin: 0.5rem auto 1.5rem;
    border-radius: 2px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1rem;
  margin-top: 1.2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  text-transform: capitalize;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const UserBtn = styled(StyledLink)`
  background-color: #4da8da;
  &:hover {
    background-color: #0077b6;
  }
`;

const MentorBtn = styled(StyledLink)`
  background-color: #38b000;
  &:hover {
    background-color: #2a8000;
  }
`;

const HrBtn = styled(StyledLink)`
  background-color: #ff6f61;
  &:hover {
    background-color: #cc554b;
  }
`;

// --- Main Component ---
export const Register = function () {
  return (
    <>
    <div className="login-container">
        <RegisterContainer>
        <RegisterBox>
          <Title>Register Account</Title>
          <UserBtn to="/user/register">
            <FaUser /> Create account as User
          </UserBtn>
          <MentorBtn to="/mentor/register">
            <FaChalkboardTeacher /> Create account as Mentor
          </MentorBtn>
          <HrBtn to="/hr/register">
            <FaBuilding /> Create account as HR
          </HrBtn>
        </RegisterBox>
      </RegisterContainer>
    </div>
      {/* <GlobalStyle /> */}
    </>
  );
};
