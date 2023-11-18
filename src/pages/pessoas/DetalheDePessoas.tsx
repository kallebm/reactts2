import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDaPagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm } from "../../forms";
import * as yup from "yup";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
  nomeCompleto: yup.string().required().min(3),
});

export const DetalheDePessoas = () => {
  const { id = "" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "nova") {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate(`/pessoas`);
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/pessoas");
              }
            }
          });
        }
        console.log(dadosValidados);
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        console.log(result);
        setIsLoading(false);
        if (result instanceof Error) {
          console.log(result);
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: "",
        cidadeId: "",
        email: "",
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
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas/")}
        />
      }
      titulo={id === "nova" ? "Nova pessoa" : nome}
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display={"flex"}
          flexDirection={"column"}
          component={Paper}
          variant="outlined"
        >
          <Grid container direction={"column"} padding={2} spacing={2}>
            <Grid item>
              {isLoading && <LinearProgress variant="indeterminate" />}
            </Grid>
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Nome completo"
                  name={"nomeCompleto"}
                  onChange={(e) => setNome(e.currentTarget.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label="Email" name={"email"} disabled={isLoading} />
              </Grid>
            </Grid>
            <Grid container item direction={"row"}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  label="Cidade"
                  name={"cidadeId"}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDaPagina>
  );
};
