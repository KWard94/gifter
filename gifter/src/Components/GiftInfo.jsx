import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

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
      <div className="list">
        {loading ? (
          <div className="gift-details">
            <h3 id="gift-header">
              This Gift is the: {gifts.name}, {gifts.price}
            </h3>
            <h4 id="gift-subheader">
              It is perfect for your friend who is: {gifts.attribute}
            </h4>
            <p>
              <Image
                src={gifts.image}
                alt="Display of Gift"
                rounded
                id="gift-image"
              />
            </p>

            <p id="gift-description">{gifts.description}</p>
            <h5 id="gift-link">
              <div id="gift-shop">
                Let's wrap this up.... <br />
                <a href={gifts.url} target="_blank" rel="noreferrer">
                  <Button id="crud-id" variant="secondary" className="toShop">
                    Shop for This Gift!
                  </Button>
                </a>
              </div>
            </h5>
          </div>
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </div>
    )
  );
}
