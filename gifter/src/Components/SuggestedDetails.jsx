import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SuggestedDetails({ match }) {
  const [suggested, setSuggested] = useState([]);
  const history = useHistory();

  useEffect(() => getSuggested(match.params.id), [match]);

  const getSuggested = async (id) => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${id}`;
      // const url = `http://localhost:4500/gifts/${id}`;

      const suggestedDet = await axios.get(url);
      setSuggested(suggestedDet.data);
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
        <h3>THE DETAIL OF GIFTS</h3>
        <h1>
          This gift is the {suggested.name}, {suggested.price}
        </h1>
        <h3>It is perfect for your friend who is: {suggested.attribute}</h3>
        <p>{/* <img src={suggested.image} alt="Display of Gift" /> */}</p>
        <p>{suggested.description}</p>
        <h6>
          Let's wrap this up....{" "}
          <a href={suggested.url} target="_blank" rel="noreferrer">
            <button className="toShop">Link to This Gift!</button>
          </a>
          <button onClick={() => deleteSuggested()}>
            Delete This Suggestion
          </button>
          <button onClick={() => history.push(`/edit/${suggested._id}`)}>
            Edit This Suggestion
          </button>
        </h6>
      </div>
    )
  );
}
