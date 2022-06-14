import { RootState, useAppDispatch } from "../../../../../store";
import { useEffect, useState } from "react";
import fetchProducts from "../../../../../store/ProductsSlice/action";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductsType from "../../../../../@Types/ProductsType";
import ProductsRows from "./parts/ProductsRows/ProductsRows";
import Box from "@mui/material/Box";
import AddProduct from "./parts/AddProduct/AddProduct";
import { Pagination } from "@mui/material";

const Products = () => {
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState<number>(1);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ limit: 6, skip: (page - 1) * 6 }));
  }, [refresh]);

  const products = useSelector((state: RootState) => {
    return state.products;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <AddProduct handleRefresh={handleRefresh} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Sales</TableCell>
              <TableCell align="center">Tva</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.products.map((row: ProductsType) => (
              <ProductsRows
                handleRefresh={handleRefresh}
                key={row._id}
                product={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Pagination
          defaultPage={1}
          page={page}
          count={Math.ceil(products.count / 6)}
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

export default Products;
