import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Price from './Price';

const items = [
  {"_id": 1, "name": "IRCR rune", "price": "1,600,000,000", "date": "December 6, 2023"},
  {"_id": 2, "name": "Force Gem Package (x100)", "price": "300,000,000", "date": "December 6, 2023"},
  {"_id": 3, "name": "Slot Extender (High)", "price": "330,000,000", "date": "December 6, 2023"},

  {"_id": 4, "name": "IRCR rune", "price": "1,600,000,000", "date": "December 6, 2023"},
  {"_id": 5, "name": "Force Gem Package (x100)", "price": "300,000,000", "date": "December 6, 2023"},
  {"_id": 6, "name": "Slot Extender (High)", "price": "330,000,000", "date": "December 6, 2023"},

  {"_id": 7, "name": "IRCR rune", "price": "1,600,000,000", "date": "December 6, 2023"},
  {"_id": 8, "name": "Force Gem Package (x100)", "price": "300,000,000", "date": "December 6, 2023"},
  {"_id": 9, "name": "Slot Extender (High)", "price": "330,000,000", "date": "December 6, 2023"}
];

function ItemsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ maxWidth: 900, margin: 'auto', mt: 2 }}>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right"><Price amount={row.price} /></TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ItemsTable;
