import React, { useEffect, useState } from "react";

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
      <div className="App">
        <div className="entries-container">
          {entries.map((en) => (
            <div>
              <span>{en.productName}</span>
              <span>{+en.quantity}</span>
              <span>{+en.price}</span>
              <span>{+en.price * +en.quantity}</span>
            </div>
          ))}
          <p>
            <span>subTotal</span>
            <span>
              {entries.reduce((a, v) => a + +v.price * +v.quantity, 0)}
            </span>
          </p>
          <p>
            <span>Discount amount</span>
            <span>
              {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                discountRate) /
                100}
            </span>
          </p>
          <p>
            <span>Total</span>
            <span>
              {entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                (1 - discountRate / 100)}
            </span>
          </p>
          <p>
            <span>vat amount</span>
            <span>
              {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                (1 - discountRate / 100) *
                vatRate) /
                100}
            </span>
          </p>
          <p>
            <span>Grand Total</span>
            <span>
              {entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
                (1 - discountRate / 100) *
                (1 + vatRate / 100)}
            </span>
          </p>
        </div>
        <div>
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            {products.map((p) => (
              <option id={p.name} key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleAddEntry}>Add Entry</button>

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
      </div>
    </div>
  );
};

export default BillingList;
