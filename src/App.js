import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import ExpensesTracker from "./ExpensesTracker";
import { useEffect, useState } from "react";
import moment from "moment";

const cars = [
  {
    name: "BMW",
    price: 400,
  },
  {
    name: "Bentley",
    price: 300,
  },
  {
    name: "Tesla",
    price: 300,
  },
  {
    name: "Lamborghini",
    price: 300,
  },
  {
    name: "Mercedez",
    price: 300,
  },
  {
    name: "Porsche",
    price: 300,
  },
  {
    name: "Buggatti",
    price: 300,
  },
  {
    name: "Ferrari",
    price: 300,
  },
];

function App({
  name,
  location,
  coOrdinates: { latitude, longitude },
  age,
  primes,
}) {
  // console.log(name, location, "ccheck props");
  const [productName, setProductName] = useState("");

  const [productPrice, setProductPrice] = useState(0);

  const [products, setProducts] = useState([]);

  const [editState, setEditState] = useState(false);

  const  [selectedProduct, setSelectedProduct] = useState(null);
  const [total, setDate] = useState(0);

  useEffect(() => {
    console.log('changed!!!')
    if(!editState) {
      setProductName('');
      setProductPrice(0);
    }
  },[editState]);

  const handleAddUpdateProduct = (e) =>
    {
      if(!editState) { // editState == false means button should add
        setProducts([
          ...products,
          { id: Date(), name: productName, price: productPrice },
        ]);
      }
      else { // editState == true means button should update/save
        setProducts(products.map(p => {
            if(p.id === selectedProduct.id) {
              return {
                ...p,
                name: productName,
                price: productPrice,
              }
            }
            return p
        }))
        setEditState(false);
      }
    setProductName('');
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
    <div className="App">
      <h1>{name}</h1>
      <h1>{location}</h1>
      <h1>{latitude}' North</h1>
      <h1>{longitude}'East</h1>
      <h1>{age} years</h1>
      <h2>
        Primes: {primes} {primes.length} primes
      </h2>
      <Counter />
      <h1>Cars</h1>
      <ul>
        {products.map((car) => (
          <li key={car.id}>
            <span>{moment(car.date).format("")}</span>
            <span>{car.name}</span>
            <span>{car.price}</span>
            <button onClick={(e) => handleEditProduct(car)}>Edit</button>
            <button onClick={(e) => handleRemoveProduct(car.id)}>X</button>
          </li>
        ))}
        <div>
          <span>Total</span>
          <span>{products.reduce((a,v)=> a+v.price,0)}</span>
        </div>
      </ul>
      <ul>
        <input type="date" />
      </ul>
      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type={"number"}
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <button onClick={handleAddUpdateProduct}>{editState ? "Update":"Add"}</button>
      {editState ? <button onClick={e => setEditState(false)}>Cancel</button>:null}
    </div>
  );
}

export default App;
