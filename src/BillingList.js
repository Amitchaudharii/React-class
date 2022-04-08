import React, { useEffect, useState, useRef } from "react";
import "./BillingList.css";
import moment from "moment";
import Select from "react-select";
import ReactSelect from "react-select";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const BillingList = () => {
  const [entries, setEntries] = useState([]);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(Date());
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [subTotal, setSubtotal] = useState(0);
  const [discountRate, setDiscountRate] = useState(3);
  const [vatRate, setVatRate] = useState(13);
  const pselectInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const disrateInputRef = useRef(null);
  const vatrateInputRef = useRef(null);

  const handlePressAtselectInput = (e) => {
    if (e.code === "Enter") {
      quantityInputRef?.current.focus();
    }
  };

  const handlePressAtquantityInput = (e) => {
    if (e.code === "Enter") {
      disrateInputRef?.current.focus();
    }
  };

  const handlePressAtdisrateInput = (e) => {
    if (e.code === "Enter") {
      vatrateInputRef?.current.focus();
    }
  };

  const handlePressAtvatrateInput = (e) => {
    if (e.code === "Enter") {
      handleAddEntry();
      pselectInputRef?.current.focus();
    }
  };

  // const handleEditProduct = (product) => {
  //   setSelectProduct(product);
  //   setQuantity(product.quantity);
  //   setDiscountRate(product.Disrate);
  //   setVatRate(product.vatrate);
  // };

  // const handleRemoveProduct = (id) => {
  //   setProducts(products.filter((p) => p.id !== id));
  // };


  useEffect(() => {
    const productsRecorded = JSON.parse(localStorage.getItem("products"));
    if (productsRecorded) {
      setProducts(productsRecorded);
    }
  }, []);

  const handleAddEntry = (e) => {
    const productt = products.find((pr) => pr.id === product);
    setEntries([
      ...entries,
      {
        productId: product,
        productName: productt.name,
        price: productt.price,
        quantity,
      },
    ]);
  };

  console.log(products, product);
  return (
    <div>
      <div className="main-container">
        <div className="box">
          <h1>Billing List</h1>

          <div className="billinglist-form">
            {/* <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {products.map((p) => (
                <option id={p.name} key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select> */}
            <ReactSelect
              options={products.map((p) => ({
                ...p,
                value: p.id,
                label: p.name,
              }))}
              onChange={(a) => setProduct(a.id)}
              placeholder={"Select product"}
              ref={pselectInputRef}
              onKeyDown={handlePressAtselectInput}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              ref={quantityInputRef}
              onKeyDown={handlePressAtquantityInput}
            />
            <div className="add-btn">
              <button className="add-btn01" onClick={handleAddEntry}>
                Add Entry
              </button>
            </div>
            <label htmlFor="disrate">Discount Rate</label>
            <input
              id="disrate"
              value={discountRate}
              type="number"
              onChange={(e) => setDiscountRate(e.target.value)}
              ref={disrateInputRef}
              onKeyDown={handlePressAtdisrateInput}
            />
            <label htmlFor="vatrate">Vate Rate</label>
            <input
              id="vatrate"
              value={vatRate}
              type="number"
              onChange={(e) => setVatRate(e.target.value)}
              ref={vatrateInputRef}
              onKeyDown={handlePressAtvatrateInput}
            />
          </div>
          <div className="billinglist-details">
            <div className="list-details">
              <ul>
                <li>Date</li>
                <li>Product</li>
                <li>Quantity</li>
                <li>Price</li>
                <li>Total</li>
              </ul>
              {entries.map((en) => (
                <div key={en.id} className="car-details">
                  <span>{moment().format("MM DD, YYYY")}</span>
                  <span>{en.productName}</span>
                  <span>{+en.quantity}</span>
                  <span>{+en.price}</span>
                  <span>{+en.price * +en.quantity}</span>
                  <div className="button">
                    <button
                      type="button"
                      className="btn01"
                      // onClick={(f) => handleEditProduct()}
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      className="btn02"
                      // onClick={(e) => handleRemoveProduct(en.id)}
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="car-details">
              <span>subTotal</span>
              <span>
                {entries.reduce((a, v) => a + +v.price * +v.quantity, 0)}
              </span>
            </div>
            <div className="car-details">
              <span>Discount amount</span>
              <span>
                {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  discountRate) /
                  100}
              </span>
            </div>
            <div className="car-details">
              <span>Total</span>
              <span>
                {(
                  entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  (1 - discountRate / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="car-details">
              <span>vat amount</span>
              <span>
                {(
                  (entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                    (1 - discountRate / 100) *
                    vatRate) /
                  100
                ).toFixed(2)}
              </span>
            </div>
            <div className="car-details">
              <span>Grand Total</span>
              <span>
                {(
                  entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  (1 - discountRate / 100) *
                  (1 + vatRate / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingList;
