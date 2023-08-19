import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { VTextField } from "../../forms";

export const DetalheDePessoas = () => {
  const { id = "" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
    }

    PessoasService.deleteById(Number(id)).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        navigate("/pessoas");
      } else {
        alert("Registro apagado com sucesso");
        navigate("/pessoas");
      }
    });
  };

  const handleSave = () => {
    // PessoasService.updateById(id, "");
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          console.log(result);
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  return (
    <LayoutBaseDaPagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas/")}
        />
      }
      titulo={id === "nova" ? "Nova pessoa" : nome}
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField name={"nomeCompleto"} />

        <button type="submit">Submit</button>
      </Form>
    </LayoutBaseDaPagina>
  );
};
