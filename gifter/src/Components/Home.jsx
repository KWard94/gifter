import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GiftInfo({ match }) {
  const [attributes, setAttributes] = useState([]);

  const [select, setSelect] = useState();

  useEffect(() => getAttributes(), []);

  const handleSelect = (att) => {
    console.log(att.target.value);
  };

  //maybe re render the full list and use .filter method? then I can use dom manipulation to get the value of button, and filter the API call results on one component rather than a component for each list.

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
    </div>
  );
}
