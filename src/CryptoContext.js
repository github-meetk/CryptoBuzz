import React, { createContext, useEffect, useState } from "react";
import {CurrencyList} from './api';
import axios from "axios";
import getSymbolFromCurrency from 'currency-symbol-map';

export const CryptoContext  = createContext();


export default function CryptoContextProvider({children}){
  const [currencies, setCurrencies] = useState();
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCurrencyList = async () => {
    try {
      const {data} = await axios.get(CurrencyList());
      // console.log(data);
      setCurrencies(data);
    }
     catch (error) {
      console.log("Error occured in fetching Currency List API");
    }
  };

  useEffect(() => {
    fetchCurrencyList();
  }, []);

  useEffect(() => {

    currencies?.map((data) => {
      data = data.toUpperCase();
      const currencySymbol = getSymbolFromCurrency(data);

      if(currency === data){ setSymbol(currencySymbol);}

      return null;
    })

    // if (currency === "INR") setSymbol("₹");
    // else if (currency === "USD") setSymbol("$");
    // eslint-disable-next-line 
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol, currencies, numberWithCommas}}>
      {children}
    </CryptoContext.Provider>
  );
};

