import { Box, Container, Link as MuiLink, Typography } from "@mui/material";
import Logo from "./logo";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <Box
      position="sticky"
      sx={{
        backgroundColor: "#f0f0f0",
        zIndex: 99,
      }}
      top={0}
    >
      <Container
        sx={{
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MuiLink
          component={Link}
          underline="none"
          style={{
            color: "black",
          }}
          href={"/"}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                scale: ".8",
              }}
            >
              <Logo />
            </div>
            <Typography variant="h5">
              <span>EPMS</span>
            </Typography>
          </div>
        </MuiLink>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <MuiLink
            component={Link}
            href={`/auth/sign-${user ? "out" : "in"}`}
            color="textPrimary"
            sx={{
              ":hover": {
                color: "royalblue",
              },
            }}
          >
            Sign {user ? "out" : "in"}
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
