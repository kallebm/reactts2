import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks/UseDebounce";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cidadeId");
  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [busca, setBusca] = useState<string>("");
  const [selectedID, setSelectedID] = useState<number | undefined>(
    defaultValue
  );

  const { debounce } = useDebounce();
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedID,
      setValue: (_, newSelectedID) => setSelectedID(newSelectedID),
    });
  }, [registerField, fieldName, selectedID]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setOpcoes(
          result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
        );
      });
    });
  }, []);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedID) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedID);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedID, opcoes]);

  return (
    <Autocomplete
      value={autoCompleteSelectedOption}
      disablePortal
      loading={isLoading}
      disabled={isExternalLoading}
      onChange={(_, newValue) => {
        setSelectedID(newValue?.id);
        setBusca("");
        clearError();
      }}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onInputChange={(_, newValue) => {
        setBusca(newValue);
      }}
      options={opcoes}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};

export default AutoCompleteCidade;
