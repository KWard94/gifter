import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GiftInfo({ match }) {
  const [attributes, setAttributes] = useState([]);

  const [select, setSelect] = useState();

  useEffect(() => getAttributes(), []);

  const attSelected = [];
  const handleSelect = () => {
    attSelected.push("hello");
    setSelect(attSelected);
    console.log(attributes[0].attribute);
  };
  //use dom manipulation techniques to access button value?
  //or create routes for the attribute names for individial get requests for each list for each attribute?
  // I am unsure how to logic out the matching of button value to the gift list
  console.log(select);

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
          Who is this gift for? <input type="text" className="name" />
        </h4>
      </form>
      <div className="attributes">
        {attributes.map((attribute) => {
          return (
            <ul>
              <li>
                <button id="att-button" onClick={() => handleSelect()}>
                  {attribute.attribute}
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
