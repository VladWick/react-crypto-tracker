import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';
import { onSnapshot, doc } from "firebase/firestore";
import axios from 'axios';
import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            console.log(coin.data().coins);
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        })
    }, []);

    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
  
      setCoins(data);
      setLoading(false);
    };

    useEffect(() => {
        if(currency === "RUB") setSymbol("₽");
        else if(currency === "USD") setSymbol("$");

        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    return (
        <Crypto.Provider 
        value={{ 
            currency, 
            setCurrency, 
            symbol, 
            alert,
            setAlert,
            user,
            watchlist,
            loading,
            coins
        }}>
            { children }
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};