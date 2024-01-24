import React, { useState } from "react";
import priceContext from './PriceContext';


export default function PriceState(props) {
  const host = 'https://backendcrypto.adaptable.app';
  

  const [prices, setPrices] = useState()
  const [coinUd, setcoinUd] = useState(null);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(null);

  //Getting all the price data value

  async function getPrice() {

    //Making the API call to add note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const jsonall = await response.json();
    setPrices(jsonall)
  }

  //Adding a new pricetag

  async function addPrice(title, pricetag, price, marketCap, change, image) {

    //Making the API call to add note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, pricetag, price, marketCap, change, image })
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      showAlert(`${data.data.title} has been successfully addded to Watchlist`, 'success', 'Great')
      setError(false)
    }
    else if (data.error1) {
      console.log("Sorry, this cryptocurrency is already present.");
      showAlert(`${data.data.title} is already present in the watchlist`, 'warning', 'Sorry')
      setError(true)
    }
  }

  // Updating the pricetag
  async function updatePrice(id, pricetag) {

    //Making the API call to edit
    console.log("we are updating");
    console.log(pricetag);

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ pricetag })

    });
    const json1 = await response.json();
   

    // Logic to edit in the client
    let newPrices = JSON.parse(JSON.stringify(prices))

    newPrices.forEach((element) => {
      if (element._id === id) {

        element.pricetag = pricetag;
      }
    })
    setPrices(newPrices)
  }

  // Deleting a pricetag
  async function deletePrice(id) {

    //Making the API call to delete

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    const newPrices = prices.filter((note) => { return note._id !== id })
    setPrices(newPrices)
  }

  function showAlert(message, type, header) {
    setAlert({
      msg: message,
      type: type,
      header: header,
    })
    setTimeout(() => {
      setAlert(null)

    }, 5000);
  }
  return (
    <priceContext.Provider value={{prices, addPrice, deletePrice, getPrice, setcoinUd, coinUd, error, updatePrice, showAlert, alert} }>
      {props.children}
    </priceContext.Provider>
  )
}
