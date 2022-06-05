import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import UserType from "../../../../../../../@Types/UserType";
import { Avatar, Button, ButtonGroup, Chip } from "@mui/material";

interface RowTableComponentProps {
  user: UserType;
}

export const RowTableComponent = (props: RowTableComponentProps) => {
  const { user } = props;

  return (
    <TableRow
      key={user._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">
        <Avatar
          sx={{ width: 46, height: 46 }}
          alt={user.firstName}
          src={user.avatar}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">{user.phone}</TableCell>
      <TableCell align="center">
        {user.role.map((e, idx) => {
          return (
            <Chip
              sx={{ m: 1 }}
              avatar={<Avatar alt={user.firstName} src={user.avatar} />}
              label={e}
              key={idx}
              variant="outlined"
            />
          );
        })}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default RowTableComponent;
