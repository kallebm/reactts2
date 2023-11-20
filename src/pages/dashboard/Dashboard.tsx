import React, { useEffect, useState } from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import {
  FerramentasDaListagem,
  FerramentasDeDetalhe,
} from "../../shared/components";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);

  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      setTotalCountCidades(result.totalCount);
    });

    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      setTotalCountPessoas(result.totalCount);
    });
  }, []);

  return (
    <LayoutBaseDaPagina
      titulo="Dashboard"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoDaBusca={false} />}
    >
      <Box width={"100%"} display={"flex"}>
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>
                </CardContent>
                <Box
                  padding={6}
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {!isLoadingCidades && (
                    <Typography variant="h1">{totalCountCidades}</Typography>
                  )}
                  {isLoadingCidades && (
                    <Typography variant="h6">Carregando...</Typography>
                  )}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Pessoas
                  </Typography>
                </CardContent>
                <Box
                  padding={6}
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {!isLoadingPessoas && (
                    <Typography variant="h1">{totalCountPessoas}</Typography>
                  )}
                  {isLoadingPessoas && (
                    <Typography variant="h6">Carregando...</Typography>
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDaPagina>
  );
};
