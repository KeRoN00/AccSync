import BasicTable from "./BasicTable";
import Layout from "./Layout";
import AddButton from "../Atoms/AddButton";
import DeleteButton from "../Atoms/DeleteButton";
import EditButton from "../Atoms/EditButton";
import AddUserForm from "../forms/add/AddUserForm";
import EditUserForm from "../forms/edit/EditUserForm";
import { useState, useEffect } from "react";
import {UserDTO} from '../api/models/UserDTO'
import {UsersApi} from '../api'
import  CircularProgress  from "@mui/material/CircularProgress";
import DeleteUserForm from "../forms/delete/DeleteUserForm";
import { useNavigate } from "react-router-dom";


const Users = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<Array<UserDTO>>([]);
  const token: string | null = localStorage.getItem('accessToken');
  
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate('/');
        return;
      }

      setIsLoading(true);
      try {
        const api = new UsersApi();
        const response = await api.apiUsersGet(token);
        setResponseData(response);
      } catch (error) {
        setError("Sesja wygasła, zaloguj się ponownie");
      } finally {
        setTimeout(()=> setIsLoading(false),500);
        
      }
  };

    fetchData();
  }, [token, navigate,]);
  
  const [selectedUser, setSelectedUser] = useState<UserDTO>({
    id: 999999999,
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSelectUser = (user: UserDTO) => {
    setSelectedUser(user);
    console.log("Users", user);
  };

  

  return (
    <Layout user="admin">
      <h1 className="p-4">Użytkownicy</h1>
      <div className="p-4">
        
        {error && error}
        {isLoading ? <CircularProgress/> : responseData ? <BasicTable onUserSelect={handleSelectUser} data={responseData}/> : <div>Brak Danych</div>}
        
 
        <AddButton formComponent={AddUserForm}>Dodaj</AddButton>
        <EditButton
          formComponent={EditUserForm}
          data={selectedUser}
        >
          Edytuj
        </EditButton>
        <DeleteButton formComponent={DeleteUserForm} data={selectedUser.id}>Usuń</DeleteButton>
         
      </div>
    </Layout>
  );
};

export default Users;
