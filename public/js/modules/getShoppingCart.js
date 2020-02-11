export let getShoppingCart = async () => {
    const URL = "http://localhost:8000/orders";
    let response = await fetch(URL, { method: "GET" });
    let data = await response.json();
    return data.data;
  };