import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Home() {
  const handleSelect = (att) => {
    const buttonAtt = att.target.value;
    setSort(buttonAtt);
  };

  //This is the function for the user input of the gift recipient name
  const handleName = (a) => {
    const inputName = a.target.value;
    console.log(inputName);
    return inputName;
  };

  // Below is the API call for the list of attrubutes from the database

  const [attributes, setAttributes] = useState([]);

  useEffect(() => getAttributes(), []);
  const getAttributes = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/attributes`;
      // const url = `http://localhost:4500/attributes`;

      const attributeList = await axios.get(url);
      setAttributes(attributeList.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Below is the API call for the gift options

  const [gifts, setGifts] = useState([]);

  const [id, setId] = useState();
  const history = useHistory();

  useEffect(() => getGifts(), []);

  const getGifts = async () => {
    try {
      const url = "https://gifter-backend-api.herokuapp.com/gifts";
      // const url = "http://localhost:4500/gifts/";

      const giftList = await axios.get(url);
      setGifts(giftList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [sort, setSort] = useState();

  const sorted = gifts.filter((att) => att.attribute === sort);

  const handleDetails = (id) => {
    history.push(`/gifts/${id}`);
    setId(id);
  };

  return (
    <div className="homepage">
      <div className="intro">
        <h1>
          Select From the List of Attributes Below to Find the Perfect Gift that
          You Have Been Searching For!
        </h1>
      </div>
      <form>
        <h4>
          Who is this gift for?{" "}
          <input
            type="text"
            className="name"
            onChange={(name) => handleName(name)}
          />
        </h4>
      </form>
      <div className="attributes">
        {attributes.map((attribute) => {
          return (
            <ul>
              <li>
                <button
                  id="att-button"
                  value={attribute.attribute}
                  onClick={(att) => handleSelect(att, "value")}
                >
                  {attribute.attribute}
                </button>
              </li>
            </ul>
          );
        })}
      </div>

      {/* below here is rendered list of suggested gifts*/}

      <div className="list">
        <h3>Your Gift Suggestions for someone who is {sort}!</h3>
        {sorted.map((gift) => {
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
        })}
      </div>
    </div>
  );
}
