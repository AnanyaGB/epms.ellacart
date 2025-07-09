"use client";
import Logo from "@/components/logo";
import { useAuth } from "@/lib/auth-context";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase.config";

export default function Home() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, logOut } = useAuth();
  const db = getFirestore(app);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    signIn(data.email, data.password)
      .then((user) => {
        getDoc(doc(db, "admins", user.user.uid)).then((snap) => {
          if (snap.exists()) {
            router.push("/");
          } else {
            logOut();
            setError(
              "No EPMS account linked with the given credential. Contact your manager."
            );
          }
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
      });
  };

  return (
    <div>
      <Container maxWidth="xs" sx={{ py: 12 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Logo />
              <Typography variant="h4">EPMS Authentication</Typography>
              <Typography variant="subtitle1">
                Sign in using your EPMS credentials.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                required
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(!showPassword)}
                  />
                }
                label="Show password"
              />
              <Button variant="contained" type="submit" loading={loading}>
                Sign in
              </Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </form>
      </Container>
    </div>
  );
}
