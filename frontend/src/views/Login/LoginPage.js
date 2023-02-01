import ReactDOM from "react-dom";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import classes from "./LoginPage.module.css";
import LoginForm from "./LoginForm";
import Modal from "../Modal/Modal";
import { validateEmail, validatePassword } from "../../utils/validate";
import { LocalStorage } from "../../services/LocalStorage.service";

function LoginPage() {
  const navigate = useNavigate();
  console.log(LocalStorage.getItem("rememberMe"));
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
    if (
      loginData &&
      validateEmail(loginData.email) &&
      validatePassword(loginData.password)
    ) {
      try {
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
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
          setLoginInfo({
            loggedIn: true,
            email: loginData.email,
            // replace the password with asterisks
            password: loginData.password,
            rememberMe: loginData.rememberMe,
            loginHeader: "Login successful",
            loginMessage: "You may be redirected to calendar",
          });
          setTimeout(() => {
            navigate("/calendar");
          }, 3000);
        } else {
          setLoginInfo({
            loggedIn: false,
            email: loginData.email,
            password: loginData.password,
            rememberMe: loginData.rememberMe,
            loginHeader: "Login failed",
            loginMessage: data.error,
          });
        }
        // setVisible(!visible);
      } catch (error) {
        console.log("Error: ", error.message);

        setLoginInfo({
          loggedIn: false,
          email: loginData.email,
          password: loginData.password,
          rememberMe: loginData.rememberMe,
          loginHeader: "Login failed",
          loginMessage: error.message,
        });
        // setVisible(!visible);
      }

      // if (loginData && validateEmail(loginData.email) && validatePassword(loginData.password)) {
      //     console.log("Login successful");
      //     setLoginInfo({
      //         loggedIn: true,
      //         email: loginData.email,
      //         password: loginData.password,
      //         rememberMe: loginData.rememberMe,
      //         loginHeader: 'Login successful',
      //         loginMessage: 'You have been logged out successfully'
      //     })
    } else {
      setLoginInfo({
        loggedIn: false,
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe,
        loginHeader: "Login failed",
        loginMessage: "Wrong email or password",
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
              <a href="#" className={classes.active}>
                Login
              </a>
              <a href="#">Register</a>
            </div>
            <LoginForm onLogin={handleVisibility} onRemember={loginInfo}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
