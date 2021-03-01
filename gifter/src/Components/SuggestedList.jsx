import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SuggestedList() {
  const [suggest, setSuggest] = useState([]);
  useEffect(() => getSuggested(), []);

  const getSuggested = async () => {
    try {
      const url = "https://gifter-backend-api.herokuapp.com/suggestion";
      // const url = "http://localhost:4500/gifts/";

      const suggestedList = await axios.get(url);
      setSuggest(suggestedList.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="suggested-page">
      <div className="suggested-list">
        {suggest.map((suggested) => {
          return (
            <ul>
              <li>{suggested.name}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
