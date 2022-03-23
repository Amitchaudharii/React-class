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

  const [productName, setProductName] = useState('');

  const [productPrice, setProductPrice] = useState(0);

  const [products, setProducts] = useState([]);

  const [editState, setEditState] = useState(false);

  const [selectedproduct, setSelectedProduct] = useState(null);

  const handleAddUpdateproduct = (e) => 
  {
   if(!editState){ //editState ==false means button should add
    setProducts([
      ...products, {id: Date(), name: productName, price: productPrice},
    ]);
   }
   else{ //editstate == true means button should update/save
     setProducts(products.map(p => {
       if (p.id === selectedproduct.id){
        return{
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
  }  

  const handleRemoveproduct = (id) => 
    setProducts(products.filter(p => p.id !== id));

  const handleEditproduct = (products) => {
    setEditState(true);
    setSelectedProduct(products);
    setProductName(products.name);
    setProductPrice(products.price);
  }
    


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
          <button onClick={e => handleEditproduct(car)}>
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
       {/* <button onClick={handleAddproduct} >
        add
       </button> */}
       <button onClick={handleAddUpdateproduct} >{editState ? "update":"add"}</button>

    </div>
  );
}

export default App;
