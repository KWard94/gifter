import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function GiftInfo({ match }) {
  //constant declarations
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);

  //api call for individual gift by id from gift list
  useEffect(() => getGifts(match.params.id), [match]);
  const getGifts = async (id) => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/gifts/${id}`;

      const giftList = await axios.get(url);
      console.log(giftList.data);
      setGifts(giftList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    gifts && (
      <div className="details">
        {loading ? (
          <div>
            <h3>THE DETAIL OF GIFTS</h3>
            <h1>
              This gift is the {gifts.name}, {gifts.price}
            </h1>
            <h3>It is perfect for your friend who is: {gifts.attribute}</h3>
            <p>
              <img src={gifts.image} alt="Display of Gift" />
            </p>
            <p>{gifts.description}</p>
            <h6>
              Let's wrap this up....{" "}
              <a href={gifts.url} target="_blank" rel="noreferrer">
                <button className="toShop">Shop for this gift!</button>
              </a>
            </h6>
          </div>
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </div>
    )
  );
}
