import {
  Box,
  TextField,
  Button,
  Paper,
  useTheme,
  InputAdornment,
  Icon,
} from "@mui/material";
import React from "react";
import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputDaBusca?: boolean;
  aoMudarTextoDaBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoDaBusca?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputDaBusca = false,
  aoMudarTextoDaBusca,
  aoClicarEmNovo,
  mostrarBotaoDaBusca = true,
  textoBotaoNovo = "Novo",
}) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      display={"flex"}
      alignItems={"center"}
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
    >
      {mostrarInputDaBusca && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_DE_BUSCA}
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box flex={1} display={"flex"} justifyContent={"end"}>
        {mostrarBotaoDaBusca && (
          <Button
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
