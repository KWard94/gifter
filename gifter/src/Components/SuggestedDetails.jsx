import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function SuggestedDetails({ match }) {
  //constant definitions for state
  const [suggested, setSuggested] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  //api call for the detail view of the suggested gifts
  useEffect(() => getSuggested(match.params.id), [match]);
  const getSuggested = async (id) => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${id}`;
      // const url = `http://localhost:4500/gifts/${id}`;

      const suggestedDet = await axios.get(url);
      setSuggested(suggestedDet.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSuggested = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${suggested._id}`;
      // const url = `http://localhost:4500/gifts/${id}`;

      await axios.delete(url);
      history.push("/suggested");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    suggested && (
      <div className="details">
        {loading ? (
          <div>
            <h3>
              This gift is the {suggested.name}, {suggested.price}
            </h3>
            <h4>It is perfect for your friend who is: {suggested.attribute}</h4>
            <p>{/* <img src={suggested.image} alt="Display of Gift" /> */}</p>
            <p>{suggested.description}</p>
            <h5>
              Let's wrap this up.... <br />
              <a href={suggested.url} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="toShop">
                  Shop for This Gift!
                </Button>
              </a>
              <div className="crud">
                <Button
                  variant="outline-danger"
                  onClick={() => deleteSuggested()}
                >
                  Delete This Suggestion
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => history.push(`/edit/${suggested._id}`)}
                >
                  Edit This Suggestion
                </Button>
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
