import React, {useState, useRef, useEfect} from "react"
import logo from './logo.svg';
import './App.css';
import Counter from './Counter';

const cars = [
  {
    name: 'BMW',
    price: 400,
  },
  {
    name: 'Bentley',
    price: 300,
  },
  {
    name: 'Tesla',
    price: 300,
  },
  {
    name: 'Lamborghini',
    price: 300,
  },
  {
    name: 'Mercedez',
    price: 300,
  },
  {
    name: 'Porsche',
    price: 300,
  },
  {
    name: 'Buggatti',
    price: 300,
  },
  {
    name: 'Ferrari',
    price: 300,
  },
];

function App({ name, location, coOrdinates: {latitude, longitude}, age, primes }) {
  
  console.log(name, location, 'ccheck props');

  const [productName, setProductName] = useState('Tesla');

  const [productPrice, setProductPrice] = useState('200');

  const [products, setProducts] = useState([]);

  const handleAddproduct = (e) => 
  {
    setProducts([
      ...products, {id: Date(), name: productName, price: productPrice}
    ]);
    setProductName('');
    setProductPrice(0);
  }  

  const handleRemoveproduct = (id) => 
    setProducts(products.filter(p => p.id !== id));

  // const handleEditproduct = (id) => {
  //   setProducts(products.filter(p => p.id !== id));
  //   setProducts(products.find(p => p.id === id));
  //   console.log('selectedItem');
  // }
    


  // const { name, location, coOrdinates: {latitude, longitude}, age, primes } = props;
  return (
    <div className="App">
      <h1>{name}</h1>
      <h1>{location}</h1>
      <h1>{latitude}' North</h1>
      <h1>{longitude}'East</h1>
      <h1>{age} years</h1>
      <h2>Primes: {primes}  {primes.length} primes</h2>
      <Counter />
      <h1>Cars</h1>
      <ul>
      {products.map(car => (
        <li key={car.id}>
          <span>{car.name}</span>
          <span>{car.price}</span>
          <button>
            edit
          </button>
          <button onClick={e => handleRemoveproduct(car.id)}>
            x
          </button>
        </li>
      ))}
      </ul>
      <input 
        value={productName}
       onChange={e => setProductName(e.target.value)}
       />
      <input
        type="number"
        value={productPrice}
        onChange={e => setProductPrice(e.target.value)}
       />
       <button onClick={handleAddproduct} >
        add
       </button>

    </div>
  );
}

export default App;
