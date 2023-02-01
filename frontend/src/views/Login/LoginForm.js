import { useState, useRef } from "react";
import classes from "./LoginForm.module.css";
// importar LocalStorage
import { LocalStorage } from "../../services/LocalStorage.service";

function LoginForm(props) {
  console.log(props.location);
  const refName = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refCheckbox = useRef(false);

  const [loginData, setLoginData] = useState({
    email: LocalStorage.getItem("email") || "",
    password: LocalStorage.getItem("password") || "",
    rememberMe: (LocalStorage.getItem("rememberMe") && true) || false,
  });

  const [loginError, setLoginError] = useState({
    emptyEmail: false,
    emptyPassword: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    setLoginData({
      ...loginData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // validar que el email y el password no estén vacíos
    if (refEmail.current.value === "") {
      // establecer error en el email
      setLoginError({
        ...loginError,
        emptyEmail: true,
      });
      //poner el foco en el input del email
      refEmail.current.focus();
    } else if (refPassword.current.value === "") {
      // establecer error en el password
      setLoginError({
        emptyEmail: false,
        emptyPassword: true,
      });
      //poner el foco en el input del password
      refPassword.current.focus();
    } else {
      // si no hay errores, modificar el estado de loginError, y enviar los datos al componente padre
      setLoginError({
        emptyEmail: false,
        emptyPassword: false,
      });
      const loginData = {
        email: refEmail.current.value,
        password: refPassword.current.value,
        rememberMe: refCheckbox.current.checked,
      };

      props.onLogin(loginData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.location && (
        //input for name
        <input
          ref={refName}
          className={`${classes["form-control"]} ${
            loginError.emptyName && classes["not-fullfilled"]
          }`}
          type="text"
          name="name"
          onChange={handleChange}
          value={loginData.name || ""}
          placeholder="Name"
        />
      )}
      <input
        ref={refEmail}
        className={`${classes["form-control"]} ${
          loginError.emptyEmail && classes["not-fullfilled"]
        }`}
        type="email"
        name="email"
        onChange={handleChange}
        value={loginData.email || ""}
        placeholder="E-mail Address"
      />
      <input
        ref={refPassword}
        className={`${classes["form-control"]} ${
          loginError.emptyPassword && classes["not-fullfilled"]
        }`}
        type="password"
        name="password"
        onChange={handleChange}
        value={loginData.password || ""}
        placeholder="Password"
      />
      <div className={classes.remember}>
        <input
          ref={refCheckbox}
          type="checkbox"
          id="check1"
          onChange={handleChange}
          checked={loginData.rememberMe || false}
        />
        <label htmlFor="check1">Remember me</label>
      </div>
      <div className={classes["form-button"]}>
        <button type="submit">Login</button>
        <a href="#">Forget password?</a>
      </div>
    </form>
  );
}

export default LoginForm;
