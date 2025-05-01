import React, { useState, useContext } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import Logo from "../../components/Logo/Logo";
import { AdminContext } from "../../Context/AdminContext";

const Login = () => {
  const {
    loginData,
    registerData,
    toggleForm,
    isLogin,
    handleLoginChange,
    handleLoginSubmit,
    handleRegisterChange,
    handleRegisterSubmit,
  } = useContext(AdminContext);

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <Logo />
        </div>

        <div className="form-container">
          {isLogin ? (
            <>
              <h1 className="form-title">Sign in to your Plexify</h1>
              <div className="form-wrapper">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <button className="submit-button" onClick={handleLoginSubmit}>
                  Log in
                </button>
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="account-option">
                  Don't have an account?{" "}
                  <a href="#" onClick={toggleForm}>
                    Sign up
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="form-title">Create an account</h1>
              <div className="sign-in-option">
                <a href="#" onClick={toggleForm}>
                  Sign in instead
                </a>
              </div>
              <div className="form-wrapper">
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="terms-group">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAccepted"
                    checked={registerData.termsAccepted}
                    onChange={handleRegisterChange}
                  />
                  <label htmlFor="terms">
                    By creating an account, I agree to our{" "}
                    <a href="#">Terms of use</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </label>
                </div>
                <button
                  className="submit-button"
                  onClick={handleRegisterSubmit}
                >
                  Create an account
                </button>
              </div>
            </>
          )}
        </div>

        <div className="footer">
          <p>
            This site is protected by re CAPTCHA and the Google{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>{" "}
            apply.
          </p>
        </div>
      </div>

      <div className="login-right">
        <img src={assets.loginImage} alt="" />
      </div>
    </div>
  );
};

export default Login;
