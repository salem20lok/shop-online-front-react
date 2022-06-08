import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RootState, useAppDispatch } from "../../../../../store";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../../../store/UsersSlice/action";
import { useSelector } from "react-redux";
import RowTableComponent from "./parts/RowTable/RowTableComponent";
import Box from "@mui/material/Box";
import AddUser from "./parts/AddUser/AddUser";
import { Pagination } from "@mui/material";
import { FormattedMessage } from "react-intl";

const Users = () => {
  const dispatch = useAppDispatch();

  const [refresh, setRefresh] = useState<boolean>(false);

  const [page, setPage] = useState(1);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    dispatch(fetchUsers({ limit: 6, skip: (page - 1) * 6 }));
  }, [refresh, page]);

  const users = useSelector((state: RootState) => {
    return state.users;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddUser handleRefresh={handleRefresh} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <FormattedMessage id="FullName" />
              </TableCell>
              <TableCell align="center">
                <FormattedMessage id="login.email" />
              </TableCell>
              <TableCell align="center">
                <FormattedMessage id="Phone" />
              </TableCell>
              <TableCell align="center">
                <FormattedMessage id="Role" />
              </TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.users.map((user) => (
              <RowTableComponent
                handleRefresh={handleRefresh}
                user={user}
                key={user._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Pagination
          defaultPage={1}
          page={page}
          count={Math.ceil(users.count / 6)}
          onChange={(e, page) => {
            setPage(page);
          }}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Users;
