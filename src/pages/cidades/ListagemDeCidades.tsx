import React, { useMemo } from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);
  return (
    <div>
      <LayoutBaseDaPagina
        titulo="Listagem de cidades"
        barraDeFerramentas={
          <FerramentasDaListagem
            textoDaBusca={searchParams.get("busca") ?? ""}
            textoBotaoNovo="Nova"
            mostrarInputDaBusca
            aoMudarTextoDaBusca={(text) => {
              setSearchParams({ busca: text }, { replace: true });
              console.log(searchParams);
            }}
          />
        }
      >
        dad
      </LayoutBaseDaPagina>
    </div>
  );
};
