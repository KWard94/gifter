import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

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
      // const url = "http://localhost:4500/gifts/";

      const suggestedList = await axios.get(url);
      setSuggest(suggestedList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  //info render on screen
  return (
    <div className="suggested-page">
      <div className="suggested-list">
        {loading ? (
          suggest.map((suggested) => {
            return (
              <ul>
                <li>{suggested.name}</li>
                <button
                  className="view-details"
                  onClick={() => handleDetails(suggested._id)}
                >
                  See Details
                </button>
              </ul>
            );
          })
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </div>
    </div>
  );
}
