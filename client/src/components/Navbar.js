import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import * as colours from "../colours";
import WineBarIcon from "@mui/icons-material/WineBar";
import { NavLink } from "react-router-dom";

const backgroundGreen = colours.LIGHT_GREEN;
const darkGreen = "rgba(107, 112, 92, 0.4)";

const home = {
  link: "/",
  label: "Home",
};

const search = {
  link: "/search",
  label: "Search",
};

const employees = {
  link: "/employees",
  label: "Employees",
};

const suppliers = {
  link: "/suppliers",
  label: "Suppliers",
};

const grapeProduction = {
  link: "/grapeproduction",
  label: "Grape Production",
};

const wineProduction = {
  link: "/wineproduction",
  label: "Wine Production",
};

const wineBottles = {
  link: "/winebottles",
  label: "Wine Bottles",
};

const pages = [
  home,
  search,
  employees,
  suppliers,
  grapeProduction,
  wineProduction,
  wineBottles,
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: backgroundGreen }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WineBarIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Josefin Slab",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WineApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.link}
                    onClick={handleCloseNavMenu}
                    style={({ isActive }) => ({
                      color: isActive ? "#fff" : darkGreen,
                      background: isActive ? backgroundGreen : "#fff",
                      textDecoration: "none",
                      fontFamily: "Roboto",
                      textTransform: "uppercase",
                      fontSize: "14px",
                    })}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WineBarIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Josefin Slab",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                to={page.link}
                onClick={handleCloseNavMenu}
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#fff",
                  background: isActive ? darkGreen : backgroundGreen,
                  padding: "5px 10px",
                  textDecoration: "none",
                  fontFamily: "Roboto",
                  borderRadius: "5px",
                  textTransform: "uppercase",
                  fontSize: "14px",
                })}
              >
                {page.label}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
