import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { AuditDTO } from "../../api";
import { ResponseAuditDTO } from "../../types/Audit";


interface BasicTableProps {
  onAuditSelect: (selectedAudit: ResponseAuditDTO) => void,
  data: AuditDTO[] // Dodaj nowy prop
}
const AuditTable: React.FC<BasicTableProps> = ({ data, onAuditSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number | undefined) => {
    if(rowIndex === undefined) {
      return;
    }
    setSelectedRowIndex(rowIndex);
    const selectedAuditData = data.find((row) => row.id === rowIndex);

    if (selectedAuditData) {
      const selectedAudit: ResponseAuditDTO = {
        id: selectedAuditData.id,
        dateTime: selectedAuditData.dateTime,
        tableName: selectedAuditData.tableName || null || undefined,
        keyValues: selectedAuditData.keyValues || undefined,
        oldValues: selectedAuditData.oldValues || undefined,
        newValues: selectedAuditData.newValues || undefined,
        userId: selectedAuditData.userId || undefined,
        type: selectedAuditData.type || undefined
      };
      console.log(selectedAudit);
      if (onAuditSelect) {
        onAuditSelect(selectedAudit);
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
              Data zmiany
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Baza
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Pole
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Poprzednio
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Po zmianie
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              UserId
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Typ
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
              <TableCell  scope="row" style={{ color: "white" }}>
                {row.id}
              </TableCell>
              <TableCell  scope="row" style={{ color: "white" }}>
                {row.dateTime?.toString()}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.tableName}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.keyValues}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.oldValues}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.newValues}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.userId}
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                {row.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AuditTable;
