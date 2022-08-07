import "./app.css";
import useBookSerarch from "./hooks/useBookSerarch";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumb, setPageNumb] = useState(1);
  const { loading, error, books, hasMore } = useBookSerarch(query, pageNumb);

  const queryHandler = (e) => {
    // e.preventDefault();
    setQuery(e.target.value);
    setPageNumb(1);
  };
  return (
    <div>
      <input type="text" onChange={queryHandler} />
      {books &&
        books.map((b, i) => (
          <div key={i}>
            <li>{b}</li>
          </div>
        ))}
      <div>{loading && <h1>Loading....</h1>}</div>
      <div>{error && <h1>Error....</h1>}</div>
    </div>
  );
}

export default App;
