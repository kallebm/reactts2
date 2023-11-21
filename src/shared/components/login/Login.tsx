import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card>
        <CardContent>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={250}
            gap={2}
            alignItems={"center"}
          >
            <Typography variant="h6">Identifique-se</Typography>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              value={email}
              type="email"
            ></TextField>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Senha"
              value={password}
              type="password"
            ></TextField>
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display={"flex"} justifyContent={"center"}>
            <Button variant="contained" onClick={() => login("", "")}>
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
