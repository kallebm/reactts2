import React from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import {
  FerramentasDaListagem,
  FerramentasDeDetalhe,
} from "../../shared/components";

export const Dashboard = () => {
  return (
    <LayoutBaseDaPagina
      titulo="sexo"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoSalvarEFecharCarregando
          mostrarBotaoNovoCarregando
        />
      }
    >
      testando
    </LayoutBaseDaPagina>
  );
};
