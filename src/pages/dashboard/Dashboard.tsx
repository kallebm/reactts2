import React from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import {
  FerramentasDaListagem,
  FerramentasDeDetalhe,
} from "../../shared/components";

export const Dashboard = () => {
  return (
    <LayoutBaseDaPagina
      titulo="Dashboard"
      barraDeFerramentas={<FerramentasDeDetalhe mostrarBotaoSalvarEFechar />}
    >
      testando
    </LayoutBaseDaPagina>
  );
};
