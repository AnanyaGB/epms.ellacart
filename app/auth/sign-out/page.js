"use client";

import { useAuth } from "@/lib/auth-context";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignOut() {
  const { logOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    logOut().then(() => {
      router.push("/auth/sign-in");
      setLoading(false);
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        py: 12,
      }}
    >
      <Typography gutterBottom variant="h4">
        Sign out
      </Typography>
      <Typography variant="body1">
        Are you sure you want to sign out?
      </Typography>
      <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant="contained"
          color="error"
          loading={loading}
          onClick={handleSignOut}
        >
          Yes, sign out.
        </Button>
        <Button color="inherit" LinkComponent={Link} href="/">
          Cancel
        </Button>
      </Stack>
    </Container>
  );
}

export default SignOut;
