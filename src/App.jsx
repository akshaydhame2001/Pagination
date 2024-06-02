import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="app">
      <div className="title">
        <h1>Products</h1>
      </div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <span key={prod.id} className="product__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              key={i}
              onClick={() => selectPageHandler(i + 1)}
              className={page === i + 1 ? "pagination__selected" : ""}
            >
              {i + 1}
            </span>
          ))}
          <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
        </div>
      )}
    </div>
  );
}

export default App;
