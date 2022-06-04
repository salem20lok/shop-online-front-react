import Box from "@mui/material/Box";
import {
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import { MouseEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import UserType from "../../../../../@Types/UserType";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { removeProfile } from "../../../../../store/ProfileSlice/ProfileSlice";

interface AvatarComponentProps {
  connected: boolean;
  profile: UserType;
  refresh: Function;
}

const AvatarComponent = (props: AvatarComponentProps) => {
  const { profile, connected, refresh } = props;

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const location = pathname.slice(1);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ bgcolor: "#fff" }}
            alt="Remy Sharp"
            src={connected ? profile.avatar : "/images/avatar.png"}
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
        {connected ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                p: 1,
              }}
            >
              {profile.role.map((el, idx) => {
                return <Chip key={idx} label={el} />;
              })}
            </Box>
            <Divider />
            <MenuItem
              key={"Profile"}
              component={Link}
              to={"/Profile"}
              onClick={handleCloseUserMenu}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              disabled={location === "Profile"}
            >
              <Typography textAlign="center">
                <FormattedMessage id="Profile.title" />
              </Typography>
              <AccountCircleIcon />
            </MenuItem>

            {profile.role.includes("admin") ? (
              <MenuItem
                key={"dashboard"}
                component={Link}
                to={"/dashboard"}
                onClick={handleCloseUserMenu}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                disabled={location === "Dashboard"}
              >
                <Typography textAlign="center">
                  <FormattedMessage id="Dashboard.title" />
                </Typography>
                <DashboardIcon />
              </MenuItem>
            ) : (
              ""
            )}
            <Divider />
            <MenuItem
              key={"Logout"}
              component={Link}
              to={"/Logout"}
              onClick={() => {
                handleCloseUserMenu();
                localStorage.removeItem("accessToken");
                dispatch(removeProfile());
                refresh();
              }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              disabled={location === "Logout"}
            >
              <Typography textAlign="center">
                <FormattedMessage id="Logout.title" />
              </Typography>
              <ExitToAppIcon />
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              key={"login"}
              component={Link}
              to={"/login"}
              onClick={handleCloseUserMenu}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              disabled={location === "login"}
            >
              <Typography textAlign="center">
                <FormattedMessage id="login.title" />
              </Typography>
              <LockOpenIcon />
            </MenuItem>

            <MenuItem
              key={"register"}
              component={Link}
              to={"/register"}
              onClick={handleCloseUserMenu}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              disabled={location === "register"}
            >
              <Typography textAlign="center">
                <FormattedMessage id="register.title" />
              </Typography>
              <HowToRegIcon />
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default AvatarComponent;
