import React from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";

export const Dashboard = () => {
  return (
    <LayoutBaseDaPagina
      titulo="sexo"
      barraDeFerramentas={<FerramentasDaListagem mostrarInputDaBusca />}
    >
      testando
    </LayoutBaseDaPagina>
  );
};
