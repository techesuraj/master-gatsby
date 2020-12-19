import React, { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";
export default function usePizza({ pizzas, values }) {
  // Create a some state to hold our order
  // const [order, setOrder] = React.useState([]);
  // We got rid of above the line we moved useState up to the provider
  // Make a function add things to order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      //   everything before the item we want to remove
      ...order.slice(0, index),
      //   everthing after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // Send this data to the serverless function
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // Gather all data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // Send this data the a serveless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // Check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage("Success! Come on down for your pizza");
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
