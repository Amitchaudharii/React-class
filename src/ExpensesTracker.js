import "./App.css";
import "./Counter.css";
import { useEffect, useState } from "react";
import ExpensesItem from "./ExpensesItem";

function ExpensesTracker() {
  // console.log(name, location, "ccheck props");
  const [productName, setProductName] = useState("");

  const [productPrice, setProductPrice] = useState(0);

  const [date, setDate] = useState(new Date());

  const [products, setProducts] = useState([]);

  const [editState, setEditState] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("changed!!!");
    if (!editState) {
      setProductName("");
      setProductPrice(0);
    }
  }, [editState]);

  const handleAddUpdateProduct = (e) => {
    if (!editState) {
      // editState == false means button should add
      setProducts([
        ...products,
        { id: Date(), name: productName, price: productPrice },
      ]);
    } else {
      // editState == true means button should update/save
      setProducts(
        products.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              name: productName,
              price: productPrice,
            };
          }
          return p;
        })
      );
      setEditState(false);
    }
    setProductName("");
    setProductPrice(0);
  };

  const handleRemoveProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  const handleEditProduct = (product) => {
    setEditState(true);
    setSelectedProduct(product);
    setProductName(product.name);
    setProductPrice(product.price);
  };

  return (
    <div className="main-container">
      <h1>Expenses</h1>
      <div className="form">
        <div className="input">
          <input
            placeholder="Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type={"number"}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="add-btn">
          <button className="add-btn01" onClick={handleAddUpdateProduct}>
            {editState ? "Update" : "Add"}
          </button>
          {editState ? (
            <button className="add-btn02" onClick={(e) => setEditState(false)}>Cancel</button>
          ) : null}
        </div>
      </div>
      <ul>
        {products.map((car) => (
          <ExpensesItem
            key={car.id}
            expense={car}
            onEdit={(e) => {
              handleEditProduct(car);
            }}
            onRemove={(e) => {
              handleRemoveProduct(car.id);
            }}
          />
        ))}
        <div className="total">
          <span>Total</span>
          <span>{products.reduce((a, v) => a + +v.price, 0)}</span>
        </div>
      </ul>
    </div>
  );
}
export default ExpensesTracker;
