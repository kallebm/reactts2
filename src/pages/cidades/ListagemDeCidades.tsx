import React, { useEffect, useMemo, useState } from "react";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import {
  Navigate,
  redirect,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  IListagemCidade,
  CidadesService,
} from "../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../shared/hooks/UseDebounce";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, true);

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca, pagina]);
  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente apagar?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((currentlyRows) =>
            currentlyRows.filter((row) => row.id !== id)
          );
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  return (
    <div>
      <LayoutBaseDaPagina
        titulo="Listagem de cidades"
        barraDeFerramentas={
          <FerramentasDaListagem
            textoDaBusca={searchParams.get("busca") ?? ""}
            textoBotaoNovo="Nova"
            aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
            mostrarInputDaBusca
            aoMudarTextoDaBusca={(text) => {
              setSearchParams({ busca: text, pagina: "1" }, { replace: true });
            }}
          />
        }
      >
        <TableContainer
          component={Paper}
          variant={"outlined"}
          sx={{ m: 2, width: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>Ações</TableCell>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      size={"small"}
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}
            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
              {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination
                      count={Math.ceil(
                        totalCount / Environment.LIMITE_DE_LINHAS
                      )}
                      page={pagina}
                      onChange={(e, newPage) =>
                        setSearchParams(
                          { busca, pagina: newPage.toString() },
                          { replace: true }
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutBaseDaPagina>
    </div>
  );
};
