import { Input, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersApi } from "../api";

// Utwórz funkcjonalny komponent
const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const api = new UsersApi();
      const response = await api.apiUsersPost({
        loginDTO: { username: login, password: password },
      });
      const token = response as string;
      if (token) {
        localStorage.setItem("accessToken", token);
        navigate("/audits");
      } else {
        navigate(0);
      }
    } catch (error) {
      setError("Login i/lub hasło są niepoprawne lub użytkownik nie istnieje");
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
      {error ? <div>{error}</div> : <></>}
      <Button onClick={(e) => fetchData(e)}>Zaloguj</Button>
    </form>
  );
};

export default LoginPage;
