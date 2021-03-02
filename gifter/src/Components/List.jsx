import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function List() {
  //constant declarations
  const [gifts, setGifts] = useState([]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //function declarations
  const handleDetails = (id) => {
    history.push(`/gifts/${id}`);
    setId(id);
  };

  //api call for gift list
  useEffect(() => getGifts(), []);
  const getGifts = async () => {
    try {
      const url = "https://gifter-backend-api.herokuapp.com/gifts";
      // const url = "http://localhost:4500/gifts/";

      const giftList = await axios.get(url);
      // console.log(giftList.data);
      setGifts(giftList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    gifts && (
      <div className="list">
        <h1>API CALL DATA</h1>
        <h3>THE LIST OF GIFTS</h3>
        {loading ? (
          gifts.map((gift) => {
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
          })
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </div>
    )
  );
}
