import React, { useState } from "react";
import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios"; // Import Axios

interface SearchComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchResults: (items: any[]) => void; // To handle the search results
  handleRecentSearches: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
  handleRecentSearches,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    handleRecentSearches();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.length || !searchTerm.trim().length) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/item/search`,
        {
          params: { q: searchTerm },
        },
      );
      onSearchResults(response.data); // Pass the search results to the parent component
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchResults([]);
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      onSubmit={handleSubmit}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search items..."
        inputProps={{ "aria-label": "search items" }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <IconButton
          sx={{ p: "10px" }}
          aria-label="clear"
          onClick={handleClearSearch}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchComponent;
