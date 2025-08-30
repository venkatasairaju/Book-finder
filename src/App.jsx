import { useState } from "react";
import "./App.css";
import logo from "./assets/books.avif";
import SearchBox from "./components/SearchBox";
import BookList from "./components/BookList";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books from Open Library
  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        setBooks(data.docs.slice(0, 10)); // it show only  10 results
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1>
          {" "}
          <img src={logo} /> Book Finder
        </h1>

        {/* Search Component */}
        <SearchBox query={query} setQuery={setQuery} onSearch={searchBooks} />

        {/* Loading / Error */}
        {loading && <p className="message">Loading...</p>}
        {error && <p className="message error">{error}</p>}

        {/* Book List Component */}
        <BookList books={books} />
      </div>
    </>
  );
}
