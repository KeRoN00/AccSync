import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ResponseUserDTO } from "../types/User";
import { useState } from "react";
import { UserDTO } from "../api";


interface BasicTableProps {
  onUserSelect?: (selectedUser: ResponseUserDTO) => void;
  data: UserDTO[] // Dodaj nowy prop
}
const BasicTable: React.FC<BasicTableProps> = ({ data, onUserSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number | undefined) => {
    if(rowIndex === undefined) {
      return;
    }
    setSelectedRowIndex(rowIndex);
    const selectedUserData = data.find((row) => row.id === rowIndex);

    if (selectedUserData) {
      const selectedUser: ResponseUserDTO = {
        id: selectedUserData.id,
        firstName: selectedUserData!.firstName || null || undefined,
        lastName: selectedUserData!.lastName || undefined,
        email: selectedUserData!.email || undefined,
      };
      console.log(selectedUser);
      if (onUserSelect) {
        onUserSelect(selectedUser);
      }
    }
  };
  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "#3f3f46", color: "white" }}
      className="p-4"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>
              ID
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              FirstName
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              LastName
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              E-Mail
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor: row.id === selectedRowIndex ? "gray" : "",
                "&:hover": { backgroundColor: "gray", cursor: "pointer" },
              }}
              onClick={() => handleRowClick(row.id)}
            >
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {row.firstName}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.lastName}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BasicTable;
