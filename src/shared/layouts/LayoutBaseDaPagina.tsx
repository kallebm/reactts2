import {
  Box,
  Typography,
  useTheme,
  Icon,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useAppDrawerContext } from "../contexts";

interface ILayoutPropsProvider {
  children: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: React.ReactNode;
}

export const LayoutBaseDaPagina: React.FC<ILayoutPropsProvider> = ({
  children,
  titulo,
  barraDeFerramentas,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawer } = useAppDrawerContext();

  return (
    <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
      <Box
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display={"flex"}
        alignItems={"center"}
      >
        {smDown && (
          <IconButton onClick={toggleDrawer}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {titulo}
        </Typography>
      </Box>
      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}

      <Box flex={1} overflow={"auto"}>
        {children}
      </Box>
    </Box>
  );
};
