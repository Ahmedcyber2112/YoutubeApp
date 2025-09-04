import React, { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { categories } from "../utils/constant";
const SideBar = ({selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          key={category.name}
          className="category-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            color: "#fff",
            backgroundColor:
              category.name === selectedCategory ? "#FC1503" : "",
          }}
          onClick={() => {
            setSelectedCategory(category.name);
          }}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "#FC1503",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
