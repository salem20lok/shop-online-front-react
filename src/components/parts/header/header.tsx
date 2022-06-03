import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchComponent from "./parts/searchComponent/SearchComponent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const settings = [
  {
    name: <FormattedMessage id="Profile.title" />,
    link: "Profile",
  },
  {
    name: <FormattedMessage id="Dashboard.title" />,
    link: "Dashboard",
  },
  {
    name: <FormattedMessage id="login.title" />,
    link: "login",
  },
  {
    name: <FormattedMessage id="register.title" />,
    link: "register",
  },
  {
    name: <FormattedMessage id="Logout.title" />,
    link: "Logout",
  },
];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <img src={"/images/logo.png"} width={70} />
          </IconButton>

          <SearchComponent />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={17}
                  color="error"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{ mr: 2 }}
                >
                  <ShoppingCartIcon />
                </Badge>
                <Typography>0.00 DT</Typography>
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ bgcolor: "#fff" }}
                    alt="Remy Sharp"
                    src="/images/avatar.png"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.link}
                    component={Link}
                    to={setting.link}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
