export default function SearchBox({ query, setQuery, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // i made this so i no need to go
      onSearch(); // on search button alway just press enter
    }
  };
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </>
  );
}
