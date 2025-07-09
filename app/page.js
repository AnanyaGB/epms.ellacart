"use client";
import { useAuth } from "@/lib/auth-context";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  const hours = new Date().getHours();
  let greeting = "";

  if (hours >= 0 && hours < 12) greeting = "Good morning";
  else if (hours >= 12 && hours <= 16) greeting = "Good afternoon";
  else greeting = "Good evening";

  const NotSignedIn = () => {
    return (
      <Alert severity="warning">
        You are not signed in. Sign in to access dashboard.
      </Alert>
    );
  };

  const Dir = ({ desc, title, href, gutter, btn, disabled, ...rest }) => {
    return (
      <Card
        {...rest}
        sx={{
          flex: 1,
          p: 1,
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            {gutter}
          </Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography my={2} variant="subtitle1">
            {desc}
          </Typography>
          <Button
            variant="contained"
            LinkComponent={Link}
            disabled={disabled}
            href={href}
          >
            {btn}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const dir = [
    {
      desc: "Add new products to the existing catalogue.",
      title: "Add products",
      href: "/products/add",
      gutter: "Authenticated route",
      btn: "Get started",
      disabled: false,
    },
    {
      desc: "Manage products included in the existing catalogue.",
      title: "Manage products",
      href: "/products",
      gutter: "Authenticated route",
      btn: "Get started",
      disabled: false,
    },
    {
      desc: "Get help on functionalities to add or manage products.",
      title: "Get documentation",
      href: "/products/add",
      gutter: "Non-authenticated route",
      btn: "Read documentation",
      disabled: true,
    },
  ];

  const SignedIn = () => {
    return (
      <Box>
        <Typography variant="h4">
          {greeting}, {user.displayName.split(" ")[0]}.
        </Typography>
        <Typography variant="body1">Let&apos;s get you started.</Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={6}
          mt={12}
          justifyContent={"space-between"}
        >
          {dir.map((item, index) => (
            <Dir
              desc={item.desc}
              title={item.title}
              href={item.href}
              gutter={item.gutter}
              btn={item.btn}
              key={index}
              disabled={item.disabled}
            />
          ))}
        </Stack>
      </Box>
    );
  };

  return (
    <Container
      sx={{
        py: 12,
      }}
    >
      {user ? <SignedIn /> : <NotSignedIn />}
    </Container>
  );
}
