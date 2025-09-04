import React from "react";
import { Stack } from "@mui/material";
import { logo } from "../utils/constant";
import { Link } from "react-router-dom";
import { SearchBar } from "./index";
const NavBar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      px={{ xs: 2, sm: 3, md: 4 }}
      py={3}
      sx={{
        background: "#000",
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        zIndex: 100,
      }}
    >
      <Link to="/">
        <img src={logo} alt="logo" height={40} />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default NavBar;
