/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  InputBase,
  Paper,
  IconButton,
  Typography,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios"; // Import Axios
import { IItem } from "../model/item.interface";

interface SearchComponentProps {
  onSearchResults: (items: any[]) => void; // To handle the search results
  handleRecentSearches: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
  handleRecentSearches,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const suggestionClickedRef = useRef (false);


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

  const handleSuggestionClick = async (item: IItem) => {
    suggestionClickedRef.current = true;
    try {
      // Assuming you want to search using the clicked item's name
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/item/search`,
        { params: { q: item.name } },
      );
      
      setSearchTerm(item.name);
      setSuggestions([]);
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (suggestionClickedRef.current) {
        setSuggestions([]);
        suggestionClickedRef.current = false; // Reset the flag
      } else if (searchTerm) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/item/autosuggest`,
            {
              params: { q: searchTerm },
            },
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions when input is empty
      }
    };

    const timerId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Add some debounce

    return () => { 
      clearTimeout(timerId);
    }
  }, [searchTerm]);

  return (
    <div style={{position: 'relative'}}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        onSubmit={handleSubmit}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '14px' }}
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
      <div style={{ position: 'absolute', width: '100%', top: '100%', left: 0, zIndex: 1, background: 'white' }}>
      {suggestions.map((item: IItem) => (
        <ListItem key={item._id} onClick={() => handleSuggestionClick(item)} sx={{':hover': { background: '#f8f9fa' }, paddingLeft: '55px', margin: 0.5}}>
          {/* <ListItemText primary={item.name} sx={{ fontSize: '12px' }} /> */}
          <Typography variant="body1" sx={{ fontSize: '14px', cursor: 'default' }}>{item.name}</Typography>
        </ListItem>
      ))}
      </div>
    </div>
  );
};

export default SearchComponent;
