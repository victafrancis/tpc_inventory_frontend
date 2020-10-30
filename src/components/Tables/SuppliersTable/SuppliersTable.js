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
  TextField,
  InputAdornment,
} from "@material-ui/core";

//icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

//context
import { useSuppliers } from "contexts/SuppliersContext";
import { useNavigation } from "contexts/NavigationContext";

import styles from "./SuppliersTable.module.css";

const SuppliersTable = (props) => {
  const { suppliers } = useSuppliers();
  const { viewDetails } = useNavigation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let result = suppliers;
  if (searchTerm) {
    result = suppliers.filter((supplier) => {
      var digits = supplier.id.toString();
      var search = searchTerm.toLowerCase();
      if (digits.includes(searchTerm)) return supplier;
      else if (supplier.supplier_name?.toLowerCase().includes(search))
        return true;
      else if (supplier.supplier_email?.toLowerCase().includes(search)) {
        return true;
      } else if (supplier.supplier_contact?.toLowerCase().includes(search)) {
        return true;
      } else if (supplier.supplier_notes?.toLowerCase().includes(search))
        return true;
    });
  }

  return (
    <Paper>
      <div className={styles["table-toolbar"]}>
        <h1>Suppliers</h1>
        <div>
          <div className={styles["search-bar"]}>
            <TextField
              value={searchTerm}
              onChange={handleSearchTermChange}
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles["sort"]}></div>
        </div>
      </div>
      <TableContainer className={styles["container"]}>
        <Table className={styles["table"]} aria-label="simple table">
          <TableHead className={styles["table-header"]}>
            <TableRow>
              <TableCell align="left" width="15%">
                <b>Name</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Email</b>
              </TableCell>
              {/* <TableCell align="left" width="10%">
              <b>Phone #</b>
            </TableCell>
            <TableCell align="left" width="20%">
              <b>Address</b>
            </TableCell> */}
              <TableCell align="left" width="20%">
                <b>Contact</b>
              </TableCell>
              <TableCell align="left" width="20%">
                <b>Notes</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className={styles["table-row"]}
                  onClick={() =>
                    viewDetails(`suppliers/supplier-details/${row["id"]}`)
                  }
                >
                  <TableCell align="left">{row["supplier_name"]}</TableCell>
                  <TableCell align="left">
                    {row["supplier_email"] === null
                      ? "N/A"
                      : row["supplier_email"]}
                  </TableCell>
                  {/* <TableCell align="left">
                  {row["supplier_phone"] === null
                    ? "N/A"
                    : row["supplier_phone"]}
                </TableCell>
                <TableCell align="left">
                  {row["supplier_address"] === null
                    ? "N/A"
                    : row["supplier_address"]}
                </TableCell> */}
                  <TableCell align="left">
                    {row["supplier_contact"] === null
                      ? "N/A"
                      : row["supplier_contact"]}
                  </TableCell>
                  <TableCell align="left">
                    {row["supplier_notes"] === null
                      ? "N/A"
                      : row["supplier_notes"]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        count={suppliers.length}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SuppliersTable;
