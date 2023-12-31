import {
  Drawer,
  Box,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useAppDrawerContext, useAppThemeContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

interface IMenuPropsProvider {
  children: React.ReactNode;
}

interface IListItemProps {
  label: string;
  to: string;
  icon: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemProps> = ({
  label,
  to,
  icon,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuPropsProvider> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawer, drawerOptions } = useAppDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();
  const { logout } = useAuthContext();
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawer}
      >
        <Box
          width={theme.spacing(28)}
          display={"flex"}
          flexDirection={"column"}
          height="100%"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://cdn-icons-png.flaticon.com/512/4792/4792929.png"
            />
          </Box>

          <Divider />
          <Box flex={1}>
            <List component={"nav"}>
              {drawerOptions.map(({ icon, label, path }) => (
                <ListItemLink
                  icon={icon}
                  label={label}
                  to={path}
                  onClick={smDown ? toggleDrawer : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component={"nav"}>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>
                    {themeName !== "light" ? "light_mode" : "dark_mode"}
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={`Tema ${themeName !== "light" ? "claro" : "escuro"}`}
                />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
