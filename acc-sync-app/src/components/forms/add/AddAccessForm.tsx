import React, { useState, ChangeEvent, FormEvent, useEffect, SelectHTMLAttributes} from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { AccessesApi, UsersApi, RolesApi, AppsApi, CreateAccessDTO, AppDTO, UserDTO, RoleDTO } from "../../../api";
import { Select } from "@mui/material";

export interface AddAccessFormProps {
  onSubmit: () => void;
}
const initialFormData = {
  id: 99999999,
  userId: 99999999,
  userName: "",
  roleId: 99999999,
  roleName: "",
  appId: 99999999,
};
type formDataType = {
  id: number;
  userId: number;
  userName: string;
  roleId: number;
  roleName: string;
  appId: number;
};
const AddAccessForm: React.ElementType<AddAccessFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [appsData, setAppsData] = useState<AppDTO[]>([{id: 99999999, name:""}]);
  const [usersData, setUsersData] = useState<UserDTO[]>([{id: 99999999,username: "" }]);
  const [rolesData, setRolesData] = useState<RoleDTO[]>([{id: 99999999,name: "" }]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<RoleDTO[]>([{id: 99999999,name: "", appId: 99999999}])
  type SelectChangeEvent = ChangeEvent<{name: string, value: string}>
  const navigate = useNavigate();
  const usersApi = new UsersApi();
  const appsApi = new AppsApi();
  const rolesApi = new RolesApi();
  const token: string | null = localStorage.getItem("accessToken");
  if (!token) {
    navigate("/");
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const responseApps = await appsApi.apiAppsGet(token);
        setAppsData(responseApps);
        const responseUsers = await usersApi.apiUsersGet(token);
        setUsersData(responseUsers);
        const responseRoles = await rolesApi.apiRolesGet(token);
        setRolesData(responseRoles);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, [token, navigate]);
  const handleChange = (e: SelectChangeEvent) => {
    console.log("Changed!: ", e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeApp = (e: SelectChangeEvent) => {
    console.log("Changed!: ", e.target.value)
    setFormData({ ...formData, appId: parseInt(e.target.value,10) });
    const selected = rolesData.filter(role => e.target.value == role.appId?.toString()); 
    setSelectedRoles(selected);
  };
  const handleBack = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
      return;
    }
    setFormData(formData);

    setIsLoading(true);

    try {
      const api = new AccessesApi();
      const formattedAccess: CreateAccessDTO = {
        userId: formData.userId,
        roleId: formData.roleId,
        appId: formData.appId,
      };
      if (!token) {
        navigate("/");
        return;
      }
      await api.apiAccessesPost(token, { createAccessDTO: formattedAccess });
      
      navigate(0);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    } finally {
      setIsLoading(false);
    }
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col"
    >
      <h1>Dodaj Uprawnienie</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          
          <InputLabel>Użytkownik</InputLabel>
          <Select required fullWidth label="Użytkownik" placeholder="Użytkownik"  name="userId" onChange={(e)=> handleChange(e)}>{usersData.map(user => {return <MenuItem value={user.id}>{user.username}</MenuItem>})}</Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Rola</InputLabel>
        <Select disabled={!selectedRoles} required fullWidth label="Rola" placeholder="Rola"  name="roleId" onChange={(e)=> handleChange(e)}>{selectedRoles.map(role => {return <MenuItem value={role.id}>{role.name}</MenuItem>})}</Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Aplikacja</InputLabel>
        <Select required fullWidth label="Aplikacja" placeholder="Aplikacja"  name="appId" onChange={(e)=> handleChangeApp(e)}>{appsData.map(app => {return <MenuItem value={app.id}>{app.name}</MenuItem>})}</Select>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress /> : "Dodaj Uprawnienie"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={(e) => handleBack(e)}
            variant="contained"
            color="error"
            fullWidth
          >
            Anuluj
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAccessForm;
