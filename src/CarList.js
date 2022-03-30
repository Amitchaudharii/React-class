import React, { useState, useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

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
  
function CarList(){
    // console.log(name, location, "ccheck props");
  // const { name, location, coOrdinates: {latitude, longitude}, age, primes } = props;
  const [productName, setProductName] = useState("");
  const [pricep, productp] = useState(0);
  const [products, setproducts] = useState([]);
  const [editState, setEditState] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);

  useEffect(() => {
    console.log("changed!!!");
    if (!editState) {
      setProductName("");
      productp(0);
    }
  }, [editState]);

  const handleAddUpdateProduct = (e) => {
    if (!editState) {
      setproducts([
        ...products,
        { id: Date(), name: productName, price: pricep },
      ]);
      localStorage.setItem(
        "products",
        JSON.stringify([
          ...products,
          { id: Date(), name: productName, price: pricep },
        ])
      );
    } else {
      setproducts(
        products.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              name: productName,
              price: pricep,
            };
          }
          return p;
        })
      );
      localStorage.setItem(
        "products",
        JSON.stringify(
          products.map((p) => {
            if (p.id === selectedProduct.id) {
              return {
                ...p,
                name: productName,
                price: pricep,
              };
            }
            return p;
          })
        )
      );
      setEditState(false);
    }
    setProductName("");
    productp(0);
  };
  const handelRemoveProduct = (id) => {
    setproducts(products.filter((p) => p.id !== id));
    localStorage.setItem(
      "products",
      JSON.stringify(products.filter((p) => p.id))
    );
  };

  const handelLetEditProduct = (product) => {
    setEditState(true);
    setSelectProduct(product);
    setProductName(product.name);
    productp(product.price);
    nameInputRef?.current.focus();
  };

  const handlePressAtNameInput = (e) => {
    if (e.code === "Enter") {
      priceInputRef?.current.focus();
    }
  };

  const handlePressAtPriceInput = (e) => {
    if (e.code === "Enter") {
      handleAddUpdateProduct();
      nameInputRef?.current.focus();
    }
  };

  useEffect(() => {
    const a = localStorage.getItem("products");
    if (a) {
      setproducts(JSON.parse(a));
    }
  }, []);

  return (
    <div className="App">
      <h1>Cars</h1>
      <div className="expense-container">
        {products.map((car) => (
          <li key={car.id}>
            <span>{car.name}</span>
            <span>{car.price}</span>
            <button onClick={(f) => handelLetEditProduct(car)}>Edit</button>
            <button onClick={(e) => handelRemoveProduct(car.id)}>
              <RiDeleteBin2Fill color={"red"} size={"15px"}/>
            </button>
          </li>
        ))}
      </div>
      <div className="input">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          ref={nameInputRef}
          onKeyPress={handlePressAtNameInput}
        />
        <input
          type="number"
          value={pricep}
          onChange={(f) => productp(f.target.value)}
          ref={priceInputRef}
          onKeyPress={handlePressAtPriceInput}
        />
      </div>
      <button onClick={handleAddUpdateProduct}>
        {editState ? "update" : "add"}
      </button>
      {editState ? (
        <button onClick={(e) => setEditState(false)}>cancel</button>
      ) : null}
    </div>
  );
};

export default CarList;