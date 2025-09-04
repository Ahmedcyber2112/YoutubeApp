import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) navigate("search/" + searchTerm);
  };
  const wrapper = useRef();
  const foucusHandler = () => {
    wrapper.current.style.border = "1px solid #065fd4";
  };
  const blurHandler = () => {
    wrapper.current.style.border = "1px solid #303030";
  };
  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      ref={wrapper}
      sx={{
        borderRadius: 20,
        border: "1px solid #303030",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <input
        type="text"
        name=""
        id=""
        value={searchTerm}
        placeholder="search..."
        className="search-bar"
        onChange={(e) => setsearchTerm(e.target.value)}
        onFocus={foucusHandler}
        onBlur={blurHandler}
      />
      <IconButton type="submit" sx={{ p: "10px", color: "#fff" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
