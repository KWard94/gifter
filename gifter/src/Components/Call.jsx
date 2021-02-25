import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Call() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => getGifts(), []);

  const getGifts = async () => {
    try {
      //   const url = "https://gifter-backend-api.herokuapp.com/";
      const url = "http://localhost:4500/gifts/";

      const giftList = await axios.get(url);
      console.log(giftList.data);
      setGifts(giftList.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>API CALL DATA</h1>
      <h3>THE LIST OF GIFTS</h3>
      {gifts.map((gift) => {
        return (
          <ul className="gift-list">
            <li>{gift.name}</li>
          </ul>
        );
      })}
    </div>
  );
}
