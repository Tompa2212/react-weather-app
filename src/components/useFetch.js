import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);

    const response = await fetch(url);
    const response_data = await response.json();

    setData(response_data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { loading, data };
};
