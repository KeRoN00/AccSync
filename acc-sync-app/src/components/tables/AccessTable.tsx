import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { AccessDTO } from "../../api";
import { ResponseAccessDTO } from "../../types/Access";

interface BasicTableProps {
  onAccessSelect?: (selectedApp: ResponseAccessDTO) => void;
  data: AccessDTO[];
}
const AccessTable: React.FC<BasicTableProps> = ({ data, onAccessSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number | undefined) => {
    if (rowIndex === undefined) {
      return;
    }
    setSelectedRowIndex(rowIndex);
    const selectedAccessData = data.find((row) => row.id === rowIndex);

    if (selectedAccessData) {
      const selectedAccess: AccessDTO = {
        id: selectedAccessData.id || undefined,
        userId: selectedAccessData.userId || undefined,
        userName: selectedAccessData.userName || undefined,
        roleId: selectedAccessData.roleId || undefined,
        roleName: selectedAccessData.roleName || undefined,
        appId: selectedAccessData.appId || undefined,
      };
      console.log(selectedAccess);
      if (onAccessSelect) {
        onAccessSelect(selectedAccess);
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
            <TableCell style={{ color: "white" }}>Id uprawnienia</TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Id użytkownika
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Nazwa użytkownika
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
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
                {row.userId}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.userName}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.roleId}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.roleName}
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
export default AccessTable;
