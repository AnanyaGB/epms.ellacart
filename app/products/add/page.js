"use client";
import { app } from "@/lib/firebase.config";
import FallbackLoader from "@/public/loader-fallback.gif";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddProduct() {
  const [data, setData] = useState({
    category: "",
    company: "",
    title: "",
    description: "",
    units: "",
    price: "",
    country: "",
    images: "",
  });

  const db = getFirestore(app);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    addDoc(collection(db, "products"), data)
      .then(() => {
        router.push("/products");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 12,
      }}
    >
      <Typography variant="h4" mb={8}>
        Add products
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h5">Frontmatter</Typography>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                value={data.category}
                onChange={(e) =>
                  setData({
                    ...data,
                    category: e.target.value,
                  })
                }
              >
                <MenuItem value="phones">Phones</MenuItem>
                <MenuItem value="laptops">Laptops</MenuItem>
                <MenuItem value="watches-trackers">
                  Watches &amp; trackers
                </MenuItem>
                <MenuItem value="listening">Listening</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <TextField
              label="Company"
              type="text"
              required
              fullWidth
              value={data.company}
              onChange={(e) =>
                setData({
                  ...data,
                  company: e.target.value,
                })
              }
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Add a product title"
              type="text"
              required
              fullWidth
              value={data.title}
              onChange={(e) => {
                setData({
                  ...data,
                  title: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12} mt={2}>
            <Typography variant="h5">Description</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Add a product description"
              type="text"
              required
              fullWidth
              value={data.description}
              onChange={(e) =>
                setData({
                  ...data,
                  description: e.target.value,
                })
              }
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Units"
              type="number"
              required
              fullWidth
              value={data.units}
              onChange={(e) =>
                setData({
                  ...data,
                  units: e.target.value,
                })
              }
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Per unit price"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
              value={data.price}
              onChange={(e) =>
                setData({
                  ...data,
                  price: e.target.value,
                })
              }
              required
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Country of origin"
              type="text"
              required
              value={data.country}
              onChange={(e) =>
                setData({
                  ...data,
                  country: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid size={12} mt={2}>
            <Typography variant="h5">Image gallery</Typography>
          </Grid>
          <Grid size={12}>
            <Alert
              severity="info"
              sx={{
                mb: 2,
              }}
            >
              Add links to multiple images, seperated by semicolon &#40;;&#41;.
            </Alert>
            <TextField
              label="Image links"
              type="text"
              required
              value={data.images}
              onChange={(e) =>
                setData({
                  ...data,
                  images: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} size={12}>
            {data.images &&
              data.images
                .replace(/ /g, "")
                .split(";")
                .map((image, index) => (
                  <Grid
                    size={4}
                    position="relative"
                    sx={{
                      aspectRatio: "1/1",
                    }}
                    key={index}
                  >
                    <Image
                      src={image ? image : FallbackLoader}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                      alt={image.toString()}
                      rel="preload"
                    />
                  </Grid>
                ))}
          </Grid>
          <Grid size={12} mt={2}>
            <Stack direction="row" gap={2}>
              <Button type="submit" variant="contained" loading={loading}>
                Add product
              </Button>
              <Button LinkComponent={Link} color="inherit" href="/products">
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default AddProduct;
