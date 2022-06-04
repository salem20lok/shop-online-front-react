import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchComponent from "./parts/searchComponent/SearchComponent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AvatarComponent from "./parts/AvatarComponent/AvatarComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface HeaderProps {
  connected: boolean;
  refresh: Function;
}

const Header = (props: HeaderProps) => {
  const { connected, refresh } = props;

  const profile = useSelector((state: RootState) => {
    return state.profile.profile;
  });

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
            <AvatarComponent
              profile={profile}
              connected={connected}
              refresh={refresh}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
