"use client";

import { app } from "@/lib/firebase.config";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app);
  const [deleteId, setDeleteId] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setLoading(true);
    deleteDoc(doc(db, "products", deleteId)).then(() => {
      setShowDialog(false);
      setDeleteId("");
      setLoading(false);
      window.location.href = "/products";
    });
  };

  useEffect(() => {
    getDocs(collection(db, "products")).then((snaps) => {
      let data = [];
      snaps.forEach((snap) => {
        data.push({
          id: snap.id,
          data: snap.data(),
        });
      });
      setProducts(data);
    });
  }, []);

  return (
    <Container
      sx={{
        pt: 12,
      }}
    >
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Product &#40;ID:{" "}
            <span
              style={{
                fontFamily: "monospace",
              }}
            >
              {deleteId}
            </span>
            &#41; will be permanently deleted from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="error" loading={loading}>
            Delete
          </Button>
          <Button onClick={() => setShowDialog(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" mb={4}>
        Product catalogue
      </Typography>
      <Box mb={4}>
        <Button variant="contained" LinkComponent={Link} href="/products/add">
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.data.category.toUpperCase()}</TableCell>
                <TableCell>{product.data.title}</TableCell>
                <TableCell>{product.data.units}</TableCell>
                <TableCell>{product.data.price}</TableCell>
                <TableCell>
                  {product.data.sold ? product.data.sold : 0}
                </TableCell>
                <TableCell>
                  <IconButton
                    LinkComponent={Link}
                    href={`/products/edit/${product.id}`}
                  >
                    <PencilIcon size={16} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(product.id)}
                    color="error"
                  >
                    <TrashIcon size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Products;
