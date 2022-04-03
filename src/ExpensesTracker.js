import "./App.css";
import "./Counter.css";
import { useEffect, useState, useRef } from "react";
import ExpensesItem from "./ExpensesItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ExpensesTracker() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [editState, setEditState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  // const [total, setTotal] = useState(0);

  useEffect(() => {
    // console.log("changed!!!");
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
      toast( "name " + productName + ": price " + productPrice + " Added");
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
      toast("Name " + productName + ": Price " + productPrice + " Updated"); //popup toast
    }
    setProductName("");
    setProductPrice(0);
  };

  const handleRemoveProduct = (id) =>{ //for expense remove
    setProducts(products.filter((p) => p.id !== id));
    toast("Product Removed"); //popup toast
  };
    

  const handleEditProduct = (product) => { // for expense edit
    setEditState(true);
    setSelectedProduct(product);
    setProductName(product.name);
    setProductPrice(product.price);
    nameInputRef?.current.focus();
    toast("Added for edit")
  };

  const handleCancelUpdateProduct = (e) => { //for update cancel
    setEditState(false);
    toast("Update Cancel")
  };

  const handlePressAtNameInput = (e) => { // focus in priceinput form
    if (e.code === "Enter") {
      priceInputRef?.current.focus();
    }
  };

  const handlePressAtPriceInput = (e) => { //focus in nameinput form
    if (e.code === "Enter") {
      handleAddUpdateProduct(); // for add expenses
      nameInputRef?.current.focus();
    }
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
            ref={nameInputRef}
            onKeyPress={handlePressAtNameInput}
          />
          <input
            type={"number"}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            ref={priceInputRef}
            onKeyPress={handlePressAtPriceInput}
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
            <button className="add-btn02" onClick={handleCancelUpdateProduct}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>
      <ul>
        {products.map((car) => (
          <div>
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
            <ToastContainer
            // Toast features uses
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
                draggable
                pauseOnHover
              />
          </div>
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
