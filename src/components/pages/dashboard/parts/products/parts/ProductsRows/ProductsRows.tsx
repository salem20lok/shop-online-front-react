import TableCell from "@mui/material/TableCell";
import { Avatar, ButtonGroup } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import ProductsType from "../../../../../../../@Types/ProductsType";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import UpdateProduct from "../UpdateProduct/UpdateProduct";

interface ProductsRowsProps {
  product: ProductsType;
  handleRefresh: Function;
}

const ProductsRows = (props: ProductsRowsProps) => {
  const { product, handleRefresh } = props;

  return (
    <TableRow
      key={product._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar
          alt={product.name}
          src={product.images[0]}
          sx={{ width: 56, height: 56 }}
        />
      </TableCell>
      <TableCell align="center"> {product.name}</TableCell>
      <TableCell align="center">{product.category}</TableCell>
      <TableCell align="center">{product.price}</TableCell>
      <TableCell align="center">{product.quantity}</TableCell>
      <TableCell align="center">{product.sales}</TableCell>
      <TableCell align="center">{product.tva}</TableCell>
      <TableCell align="center">
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
          <DeleteProduct product={product} handleRefresh={handleRefresh} />
          <UpdateProduct product={product} handleRefresh={handleRefresh} />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default ProductsRows;
