import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { RoleDTO } from "../../api";
import { ResponseRoleDTO } from "../../types/Role";


interface BasicTableProps {
  onRoleSelect?: (selectedRole: ResponseRoleDTO) => void;
  data: RoleDTO[] // Dodaj nowy prop
}
const RoleTable: React.FC<BasicTableProps> = ({ data, onRoleSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number | undefined) => {
    if(rowIndex === undefined) {
      return;
    }
    setSelectedRowIndex(rowIndex);
    const selectedRoleData = data.find((row) => row.id === rowIndex);

    if (selectedRoleData) {
      const selectedRole: ResponseRoleDTO = {
        id: selectedRoleData.id,
        name: selectedRoleData!.name || null || undefined,
        appId: selectedRoleData!.appId || undefined,
      };
      console.log(selectedRole);
      if (onRoleSelect) {
        onRoleSelect(selectedRole);
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
              Id roli
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Nazwa roli
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Id aplikacji
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
              <TableCell align="right" style={{ color: "white" }}>
                {row.name}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.appId}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RoleTable;
