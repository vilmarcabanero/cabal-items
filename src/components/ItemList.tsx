/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Price from "./Price";
import { IItem } from "../model/item.interface";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

type Props = {
  items: IItem[];
};

function ItemsTable({ items }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ maxWidth: 900, margin: "auto", mt: 2 }}>
        <TableContainer>
          <Table>
            {items.length ? (
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <Price amount={row.price} />
                    </TableCell>
                    <TableCell align="right">{formatDate(row.date)}</TableCell>
                    {row.details ? (
                      <TableCell align="right">{row.details}</TableCell>
                    ) : null}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {items.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <div></div>
        )}
      </Paper>
    </div>
  );
}

export default ItemsTable;
