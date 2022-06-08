import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import UserType from "../../../../../../../@Types/UserType";
import { Avatar, ButtonGroup, Chip, Link } from "@mui/material";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateUser from "../updateUser/UpdateUser";

interface RowTableComponentProps {
  user: UserType;
  handleRefresh: Function;
}

export const RowTableComponent = (props: RowTableComponentProps) => {
  const { user, handleRefresh } = props;

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
      <TableCell align="center">
        <Link
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            textDecoration: "none",
            color: "#000",
          }}
          href={`mailto:${user.email}`}
        >
          <MailIcon sx={{ mr: 1 }} /> <Typography> {user.email}</Typography>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Link
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            textDecoration: "none",
          }}
          href={`tel:${user.phone}`}
        >
          <PhoneForwardedIcon sx={{ mr: 1 }} />{" "}
          <Typography> {user.phone}</Typography>
        </Link>
      </TableCell>
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
          <DeleteUser user={user} handleRefresh={handleRefresh} />
          <UpdateUser handleRefresh={handleRefresh} user={user} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default RowTableComponent;
