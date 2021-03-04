import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function SuggestedList() {
  //constant definitions for state
  const [suggest, setSuggest] = useState([]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //function definitions
  const handleDetails = (id) => {
    history.push(`/suggestion/${id}`);
    setId(id);
  };

  // api call for the suggested gift list
  useEffect(() => getSuggested(), []);
  const getSuggested = async () => {
    try {
      const url = "https://gifter-backend-api.herokuapp.com/suggestion";

      const suggestedList = await axios.get(url);
      setSuggest(suggestedList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  //info render on screen
  return (
    suggest && (
      <div className="list">
        <h3>List of Suggestions</h3>
        <div className="gift-list">
          {loading ? (
            suggest.map((suggested) => {
              return (
                <ListGroup className="gift-list">
                  <ListGroup.Item id="gift">{suggested.name}</ListGroup.Item>
                  <Button
                    variant="secondary"
                    className="view-details"
                    id="gift-button"
                    onClick={() => handleDetails(suggested._id)}
                  >
                    See Details
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
