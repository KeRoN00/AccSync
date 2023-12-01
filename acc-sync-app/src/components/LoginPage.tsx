import { Input, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersApi } from "../api";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import emailjs from "@emailjs/browser";
// Utwórz funkcjonalny komponent
const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [error, setError] = useState<{
    loginError: string;
    captchaError: string;
  }>({ loginError: "", captchaError: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const public_key =  "Z8aTpMQOkqvXnTU64";
  const template_id = "template_zdy42pa";
  const service_id = "service_fnrqhw6";
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  useEffect(() => {
    loadCaptchaEnginge(8);
   emailjs.init(public_key);
  }, []);
  useEffect(() => {
    checkLoginAttempts();
  }, [loginAttempts]);

  const checkLoginAttempts = (): void => {
    const storedAttempts = localStorage.getItem('loginAttempts');
    const attempts: number = storedAttempts ? parseInt(storedAttempts, 10) : 0;
    setLoginAttempts(attempts);

    if (attempts >= 3) {
      sendEmail();
      resetLoginAttempts();
    }
  };
  const sendEmail = (): void => {
    emailjs.send(service_id, template_id, {to_name: "Admin"}, public_key)
      .then((response) => console.log('Email sent:', response))
      .catch((error) => console.error('Email error:', error));
  };

  const incrementLoginAttempts = (): void => {
    const attempts: number = loginAttempts + 1;
    setLoginAttempts(attempts);
    localStorage.setItem('loginAttempts', attempts.toString());
  };

  const resetLoginAttempts = (): void => {
    setLoginAttempts(0);
    localStorage.removeItem('loginAttempts');
  };


  const fetchData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateCaptcha(captcha)) {
      setError({
        captchaError: "Nie podano/podano złe captcha",
        loginError: "",
      });
      setIsLoading(false);
      incrementLoginAttempts();
      return;
    }
    try {
      const api = new UsersApi();
      const response = await api.apiUsersPost({
        loginDTO: { username: login, password: password },
      });
      const token = response as string;
      if (token) {
        localStorage.setItem("accessToken", token);
        resetLoginAttempts();
        navigate("/audits");
      } else {
        navigate(0);
      }
    } catch (error) {
      incrementLoginAttempts();
      setError({
        captchaError: "",
        loginError:
          "Login i/lub hasło są niepoprawne lub użytkownik nie istnieje",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-5xl mx-auto flex flex-col gap-4 justify-center items-center bg-zinc-700 text-white  min-h-screen">
      {isLoading ? <CircularProgress /> : <></>}
      <Input
        inputProps={{ style: { color: "white" } }}
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        inputProps={{ style: { color: "white" } }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        inputProps={{ style: { color: "white" } }}
        type="password"
        placeholder="Wprowadź wartość captcha"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
      />
      <LoadCanvasTemplate />
      {(error && error.captchaError) || error.loginError}
      <Button onClick={(e) => fetchData(e)} color="primary" variant="contained">
        Zaloguj
      </Button>
    </form>
  );
};

export default LoginPage;
//pkik123@outlook.pl
//pk123!@#ik
