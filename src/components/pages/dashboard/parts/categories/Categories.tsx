import { RootState, useAppDispatch } from "../../../../../store";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../../../../store/CategorySlice/action";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowTableCategory from "./parts/RowTableCategory/RowTableCategory";
import AddCategory from "./parts/AddCategory/AddCategory";

const useStyle = makeStyles({
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Categories = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    dispatch(fetchCategory({ limit: 6, skip: 0 }));
  }, [refresh]);
  const category = useSelector((state: RootState) => {
    return state.category;
  });

  return (
    <Box>
      <Box sx={{ m: 1 }} className={classes.flexEnd}>
        <AddCategory handleRefresh={handleRefresh} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {category.category.map((el) => {
              return (
                <RowTableCategory
                  handleRefresh={handleRefresh}
                  key={el._id}
                  category={el}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Categories;
