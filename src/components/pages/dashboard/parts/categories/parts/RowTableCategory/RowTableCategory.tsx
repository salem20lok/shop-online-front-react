import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CategoryType from "../../../../../../../@Types/CategoryType";
import { Avatar, Button, ButtonGroup } from "@mui/material";

interface RowTableCategoryProps {
  category: CategoryType;
  handleRefresh: Function;
}

const RowTableCategory = (props: RowTableCategoryProps) => {
  const { category, handleRefresh } = props;

  return (
    <TableRow
      key={category._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar
          alt={category.image}
          src={category.image}
          sx={{ width: 56, height: 56 }}
        />
      </TableCell>
      <TableCell align="right"> {category.name} </TableCell>
      <TableCell align="right">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default RowTableCategory;
