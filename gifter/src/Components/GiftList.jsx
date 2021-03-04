import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function GiftList() {
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

      const giftList = await axios.get(url);
      setGifts(giftList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    gifts && (
      <div className="list">
        <h3 id="list-title">THE LIST OF GIFTS</h3>
        <div className="gift-list">
          {loading ? (
            gifts.map((gift) => {
              return (
                <ListGroup className="gift-list">
                  <ListGroup.Item id="gift" key={gift._id}>
                    {gift.name}
                  </ListGroup.Item>
                  <Button
                    variant="secondary"
                    className="view-details"
                    id="gift-button"
                    onClick={() => handleDetails(gift._id)}
                  >
                    View Gift Details
                  </Button>
                </ListGroup>
              );
            })
          ) : (
            <Spinner animation="border" variant="secondary" />
          )}
        </div>
      </div>
    )
  );
}
