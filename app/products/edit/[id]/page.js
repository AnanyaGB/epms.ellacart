"use client";
import FallbackLoader from "@/public/loader-fallback.gif";
import { app } from "@/lib/firebase.config";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { setDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditProduct() {
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

  const params = useParams();
  const id = params.id;
  const db = getFirestore(app);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "products", id)).then((snap) => {
      if (snap.exists()) {
        setData(snap.data());
      } else {
        setError("No such document exists");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDoc(doc(db, "products", id), data)
      .then(() => {
        setShowModal(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 12,
      }}
    >
      {error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <>
          <Dialog open={showModal} onClose={() => setShowModal(false)}>
            <DialogTitle>Updated successfully</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Product &#40;ID:{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                  }}
                >
                  {id}
                </span>
                &#41; has been updated with the new data.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowModal(false)}>Got it</Button>
            </DialogActions>
          </Dialog>
          <Typography variant="h4" mb={4}>
            Edit product
          </Typography>
          <Chip
            sx={{
              marginBottom: 4,
            }}
            label={id}
          />
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
                  Add links to multiple images, seperated by semicolon
                  &#40;;&#41;.
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
                {data &&
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
                    Update product
                  </Button>
                  <Button LinkComponent={Link} color="inherit" href="/products">
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Container>
  );
}

export default EditProduct;
