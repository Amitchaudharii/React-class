import React, { useEffect, useState } from "react";
import "./BillingList.css";
import moment from "moment";
import Select from 'react-select'
import ReactSelect from "react-select";

const BillingList = () => {
  const [entries, setEntries] = useState([]);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(Date());
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [subTotal, setSubtotal] = useState(0);
  const [discountRate, setDiscoutRate] = useState(3);
  const [vatRate, setVatRate] = useState(13);

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
            <ReactSelect options={products.map(p => ({
              ...p,
              value: p.id,
              label: p.name,
            }))}
            onChange={a => setProduct(a.id)}
            placeholder={"Select product"}
            />
            <input
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="add-btn"actSelect>
              <button className="add-btn01" onClick={handleAddEntry}>
                Add Entry
              </button>
            </div>
            <input
              value={discountRate}
              type="number"
              onChange={(e) => setDiscoutRate(e.target.value)}
            />
            <input
              value={vatRate}
              type="number"
              onChange={(e) => setVatRate(e.target.value)}
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
                {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  (1 - discountRate / 100)).toFixed(2)}
              </span>
            </div>
            <div className="car-details">
              <span>vat amount</span>
              <span>
                {((entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  (1 - discountRate / 100) *
                  vatRate) /
                  100).toFixed(2)}
              </span>
            </div>
            <div className="car-details">
              <span>Grand Total</span>
              <span>
                {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                  (1 - discountRate / 100) *
                  (1 + vatRate / 100)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingList;
