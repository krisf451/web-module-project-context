import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

//context stuff
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  //test change

  const addItem = (item) => {
    //added in a check to see if the item already exists in the cart
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      setCart([...cart]);
      //not working exactly how I want it, but kinda
      //   setAmount(amount + 1);
    } else {
      setCart([...cart, item]);
    }
    // setCart([...cart, item]);
  };
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  //   const setQuanity = () => {
  //     setAmount(/* I want to update the quanity when a duplicate item is added */);
  //   };
  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, amount, removeItem }}>
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
