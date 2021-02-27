import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function List() {
  const [gifts, setGifts] = useState([]);

  const [id, setId] = useState();
  const history = useHistory();

  useEffect(() => getGifts(), []);

  const getGifts = async () => {
    try {
      const url = "https://gifter-backend-api.herokuapp.com/gifts";
      // const url = "http://localhost:4500/gifts/";

      const giftList = await axios.get(url);
      // console.log(giftList.data);
      setGifts(giftList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetails = (id) => {
    history.push(`/gifts/${id}`);
    setId(id);
  };

  return (
    gifts && (
      <div className="list">
        <h1>API CALL DATA</h1>
        <h3>THE LIST OF GIFTS</h3>
        {gifts.map((gift) => {
          return (
            <ul className="gift-list" key={gift._id}>
              <li>{gift.name}</li>
              <button
                className="view-details"
                onClick={() => handleDetails(gift._id)}
              >
                View Gift Details
              </button>
            </ul>
          );
        })}
      </div>
    )
  );
}
