import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GiftInfo({ match }) {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => getAttributes(), []);

  const getAttributes = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/attributes`;
      // const url = `http://localhost:4500/attributes`;

      const attributeList = await axios.get(url);
      console.log(attributeList.data);
      setAttributes(attributeList.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="homepage">
      <h1>
        Select From the List of Attributes Below to Find the Perfect Gift that
        You Have Been Searching For!
      </h1>
      <form>
        <h4>
          Who is this gift for? <input type="text" className="name" />
        </h4>
      </form>
      <div className="attributes">
        {attributes.map((attribute) => {
          return (
            <ul>
              <li>{attribute.attribute}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
