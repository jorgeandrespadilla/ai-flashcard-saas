import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container sx={{ maxWidth: "100vw" }}>
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          Flashcard SaaS
        </Typography>
        <Box display="flex" gap={2}>
          <Button color="inherit">
            <Link href="/sign-in" style={{ color: "white", textDecoration: "none" }} passHref>
              Sign In
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" style={{ color: "white", textDecoration: "none" }} passHref>
              Sign Up
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      my={4}
    >
      {children}
    </Box>
  </Container>
  );
}
