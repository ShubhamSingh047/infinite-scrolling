import axios from "axios";
import { useEffect, useState } from "react";

const useBookSerarch = (query, pageNumb) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // console.log(books, "useState");

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "Get",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumb },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks(() => {
          return [...books, ...res.data.docs.map((b) => b.title)];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      // .then((res) => {
      //   setBooks((prevBooks) => {
      //     return [...prevBooks, ...res.data.docs.map((b) => b.title)];
      //   });
      //   setHasMore(res.data.docs.length > 0);
      //   setLoading(false);
      // })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumb]);

  return { loading, error, books, hasMore };
};

export default useBookSerarch;
