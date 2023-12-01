import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { AppDTO } from "../../api";
import { ResponseAppDTO } from "../../types/App";


interface BasicTableProps {
  onAppSelect?: (selectedApp: ResponseAppDTO) => void;
  data: AppDTO[] // Dodaj nowy prop
}
const AppTable: React.FC<BasicTableProps> = ({ data, onAppSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number | undefined) => {
    if(rowIndex === undefined) {
      return;
    }
    setSelectedRowIndex(rowIndex);
    const selectedAppData = data.find((row) => row.id === rowIndex);

    if (selectedAppData) {
      const selectedApp: ResponseAppDTO = {
        id: selectedAppData.id,
        name: selectedAppData!.name || null || undefined,
      };
      console.log(selectedApp);
      if (onAppSelect) {
        onAppSelect(selectedApp);
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
              Name
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AppTable;
