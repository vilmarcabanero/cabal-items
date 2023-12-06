import ItemFormModal from "./ItemForm";
import SearchComponent from "./Search";

export default function SearchForm() {
  return <div style={{maxWidth: 900, margin: 'auto', marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <SearchComponent onSearch={() => {}} />
    <ItemFormModal />
  </div>
}