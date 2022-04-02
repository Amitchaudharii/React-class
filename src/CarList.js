import React, { useState, useEffect, useRef } from "react";
import "./CarList.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition } from "react-toastify";
import Modal from "react-modal";

// const Zoom = cssTransition({
//   enter: 'zoomIn',
//   exit: 'zoomOut',
//   appendPosition: false,
//   collapse: true,
//   collapseDuration: 300
// });

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

function CarList() {
  // console.log(name, location, "ccheck props");
  // const { name, location, coOrdinates: {latitude, longitude}, age, primes } = props;
  const [productName, setProductName] = useState("");
  const [pricep, productp] = useState(0);
  const [products, setproducts] = useState([]);
  const [editState, setEditState] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    // console.log("changed!!!");
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
      toast("Car " + productName + ": Price " + pricep + ": Added");
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
      toast("Car " + productName + ": Price " + pricep + ": Updated");
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
    toast("product Removed ");
    setOpenModel(false);
    setSelectProduct(null);
  };

  const handleClickRemove = (pr) => {
    setOpenModel(true);
    setSelectProduct(pr);
  };

  const handelEditProduct = (product) => {
    setEditState(true);
    setSelectProduct(product);
    setProductName(product.name);
    productp(product.price);

    nameInputRef?.current.focus();
    toast("Added for Edit");
  };

  const handleCancelUpdateProduct = (e) => {
    setEditState(false);
    toast("Update cancel");
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
    <div className="main-container">
      <h1>Cars</h1>
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
            placeholder="Price"
            type="number"
            value={pricep}
            onChange={(f) => productp(f.target.value)}
            ref={priceInputRef}
            onKeyPress={handlePressAtPriceInput}
          />
        </div>
        <div className="add-btn">
          <button className="add-btn01" onClick={handleAddUpdateProduct}>
            {editState ? "update" : "add"}
          </button>
          {editState ? (
            <button className="add-btn02" onClick={handleCancelUpdateProduct}>
              cancel
            </button>
          ) : null}
        </div>
      </div>
      <div className="car-container">
        {products.map((car) => (
          <div className="car-details">
            <div className="list">
              <ul key={car.id}>
                <li>
                  <span>{car.name}</span>
                </li>
                <li>
                  <span>{car.price}</span>
                </li>
              </ul>
            </div>
            <div className="button">
              <button
                type="button"
                className="btn01"
                onClick={(f) => handelEditProduct(car)}
              >
                <FiEdit />
              </button>
              <button
                type="button"
                className="btn02"
                onClick={(e) => handleClickRemove(car)}
              >
                <RiDeleteBin2Fill />
              </button>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
                draggable
                pauseOnHover
              />
              <Modal isOpen={openModel}>
                <div>
                  <p>Do you want delete</p>
                  <button onClick={(e) => handelRemoveProduct(selectedProduct.id)}>
                    Yes
                  </button>
                  <button onClick={(e) => setOpenModel(false)}>
                    cancel
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
