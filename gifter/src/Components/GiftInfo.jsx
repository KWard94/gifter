import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function GiftInfo({ match }) {
  const [gifts, setGifts] = useState([]);
  //   const history = useHistory();

  useEffect(() => getGifts(match.params.id), [match]);

  const getGifts = async (id) => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/gifts/${id}`;
      // const url = `http://localhost:4500/gifts/${id}`;

      const giftList = await axios.get(url);
      console.log(giftList.data);
      setGifts(giftList.data);
    } catch (error) {
      console.log(error);
    }
    // const url = giftList.image;
  };
  return (
    <div className="details">
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
  );
}
