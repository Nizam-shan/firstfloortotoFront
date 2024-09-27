import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
export const Search = ({ setSearchQuery, setFilter }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        // mt: 3,
        // mx: 5,
        p: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "50%" }}>
        Search:
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Search"
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ ml: 2 }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 2, width: "50%" }}
      >
        <p style={{ whiteSpace: "nowrap" }}>Sort by : </p>
        <FormControl sx={{ width: "150px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            fullWidth
            onChange={(e) => setFilter(e.target.value)}
            // label="Age"
            defaultValue={"all"}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
};
