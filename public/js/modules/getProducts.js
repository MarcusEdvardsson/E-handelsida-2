export let getProducts = async () => {
    const URL = "http://localhost:8000/products";
    let response = await fetch(URL, { method: "GET" });
    let data = await response.json();
    return data.data;
  };