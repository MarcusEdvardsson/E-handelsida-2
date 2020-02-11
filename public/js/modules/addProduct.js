export let addToCart = async (id) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const URL = "http://localhost:8000/orders";
    let response = await fetch(URL, options);
    let data = await response.json();
    return await data;
  };