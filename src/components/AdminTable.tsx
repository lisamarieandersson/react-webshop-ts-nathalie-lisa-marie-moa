import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { products } from "../../data";
import AdminProductRows from "./AdminProductRows";

function AdminTable() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Admin</h2>
      </Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Id
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <AdminProductRows key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminTable;
