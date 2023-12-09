/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import ItemsTable from "./components/ItemList";
import { IItem } from "./model/item.interface";
import axios from "axios";

function App() {
  // State to store search results
  const [searchResults, setSearchResults] = useState<IItem[]>([]);

  // Function to fetch recent searches
  const fetchRecentSearches = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/item/recent`,
      ); // Replace with your actual API endpoint

      const items = data
        .map((search: { results: any }) => search.results)
        .flat(); // Flatten the results into a single array
      setSearchResults(items);
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  // Fetch recent searches on initial load
  useEffect(() => {
    fetchRecentSearches();
  }, []);

  // Function to handle search results
  const handleSearchResults = (items: IItem[]) => {
    setSearchResults(items);
  };

  return (
    <div>
      <SearchForm
        onSearchResults={handleSearchResults}
        handleRecentSearches={fetchRecentSearches}
      />
      <ItemsTable items={searchResults} />
    </div>
  );
}

export default App;
