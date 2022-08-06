import "./app.css";
import useBookSerarch from "./hooks/useBookSerarch";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumb, setPageNumb] = useState(1);
  const { loading, error, books, hasMore } = useBookSerarch(query, pageNumb);

  console.log(books, "books");

  const queryHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setPageNumb(1);
  };
  return (
    <div>
      <input type="text" onChange={queryHandler} />
      {books &&
        books.map((b) => <div key={new Date().getTime().toString()}>{b}</div>)}
      <div>{loading && <h1>Loading....</h1>}</div>
      <div>{error && <h1>Error....</h1>}</div>
    </div>
  );
}

export default App;
