import React, { useState } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSearch(searchTerm);
    console.log(searchTerm)
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={handleSubmit} // Handle form submission
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search items..."
        inputProps={{ 'aria-label': 'search items' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchComponent;
