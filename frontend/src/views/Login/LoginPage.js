import ReactDOM from "react-dom";
import { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import classes from "./LoginPage.module.css";
import LoginForm from "./LoginForm";
import Modal from "../Modal/Modal";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validate";
import { LocalStorage } from "../../services/LocalStorage.service";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname.includes("signup");
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: LocalStorage.getItem("email") || "",
    password: LocalStorage.getItem("password") || "",
    rememberMe: LocalStorage.getItem("rememberMe") || false,
    loginError: "",
  });

  const handleVisibility = async (loginData) => {
    console.log(loginData.name);
    if (
      loginData &&
      validateEmail(loginData.email) &&
      validatePassword(loginData.password) &&
      ((isSignup && validateName(loginData.name)) || !isSignup)
    ) {
      setPending(true);
      let path = isSignup ? "signup" : "login";
      try {
        const response = await fetch(`http://localhost:8000/auth/${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
            name: loginData.name || "",
            role: isSignup ? "user" : "",
          }),
        });
        const data = await response.json();
        if (response.ok) {
          if (loginData.rememberMe) {
            LocalStorage.setItem("rememberMe", true);
            LocalStorage.setItem("email", loginData.email);
            LocalStorage.setItem("password", loginData.password);
          }
          // guardar el token en el localStorage
          LocalStorage.setItem("token", data.data.token);
          // guardar el refreshToken en el localStorage
          LocalStorage.setItem("refreshToken", data.data.refreshToken);
          // redirigir a la página de calendario con useNavigate
          let goTo = "/";
          let loginHeader = "";
          let loginMessage = "";
          if (isSignup) {
            goTo = "/login";
            loginHeader = "Signup successful";
            loginMessage = "You may be redirected to login";
          } else {
            goTo = "/calendar";
            loginHeader = "Login successful";
            loginMessage = "You may be redirected to calendar";
          }
          setLoginInfo({
            loggedIn: true,
            name: loginData.name || "",
            email: loginData.email,
            password: loginData.password,
            rememberMe: loginData.rememberMe,
            loginHeader,
            loginMessage,
          });
          setTimeout(() => {
            setVisible(false);
            navigate(goTo);
          }, 3000);
        } else {
          setLoginInfo({
            loggedIn: false,
            name: loginData.name || "",
            email: loginData.email,
            password: loginData.password,
            rememberMe: loginData.rememberMe,
            loginHeader: isSignup ? "Signup failed" : "Login failed",
            loginMessage: data.error,
          });
        }
      } catch (error) {
        setLoginInfo({
          loggedIn: false,
          name: loginData.name || "",
          email: loginData.email,
          password: loginData.password,
          rememberMe: loginData.rememberMe,
          loginHeader: isSignup ? "Signup failed" : "Login failed",
          loginMessage: error.message,
        });
      }
    } else {
      setLoginInfo({
        loggedIn: false,
        name: loginData.name || "",
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
        loginHeader: isSignup ? "Signup failed" : "Login failed",
        loginMessage: "Please, fill all the fields correctly",
      });
    }
    setVisible(!visible);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <div className={classes.container}>
        <div className={classes.bgForm} />
        <div className={classes.formContainer}>
          <div className={classes.formWrapper}>
            <h2>Get all stuffs done with Loggin engine.</h2>
            <p>
              Access to the most powerfull tool in the entire design and web
              galaxy.
            </p>
            <div className={classes["login-links"]}>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Register
              </NavLink>
            </div>
            <LoginForm onLogin={handleVisibility} location={isSignup} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
