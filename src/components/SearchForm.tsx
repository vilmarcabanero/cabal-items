/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemFormModal from "./ItemForm";
import SearchComponent from "./Search";

export default function SearchForm({
  onSearchResults,
  handleRecentSearches,
}: any) {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        marginTop: "3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SearchComponent
        onSearchResults={onSearchResults}
        handleRecentSearches={handleRecentSearches}
      />
      <ItemFormModal />
    </div>
  );
}
