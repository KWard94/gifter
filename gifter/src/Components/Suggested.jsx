import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function Suggested() {
  const attribute = [
    "Creative",
    "Curious",
    "Adventurous",
    "Humorous",
    "Outdoorsy",
    "Social",
    "Solitary",
  ];
  const initSuggest = {
    name: "",
    price: "",
    description: "",
    attribute: "",
    image: "",
    url: "",
  };

  const [suggestion, setSuggestion] = useState(initSuggest);
  const history = useHistory();

  //   useEffect(() => getSuggested(), []);

  const postSuggestion = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion`;
      // const url = `http://localhost:4500/attributes`;

      const suggestedGift = await axios.post(url, suggestion);
      console.log(suggestedGift.data);
      //   setAttributes(attributeList.data);
    } catch (error) {
      console.log(error);
    }
  };

  //maybe remove spread operator?
  const handleChange = (event) =>
    setSuggestion({ ...suggestion, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    // gift names are REQUIRED in this schema
    // force the user to give the character a name before they can submit
    if (!suggestion.name || suggestion.name === "") {
      alert("A Name is Required");
      return;
    } else {
      postSuggestion().then(() => history.push(`/suggested`));
    }
  };

  return (
    <div>
      <h1>SUGGESTION FORM HERE</h1>
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Group className="name-container">
          <Form.Label>Gift Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter a Gift Name"
            name="name"
          />
        </Form.Group>
        <Form.Group className="dropdown-container">
          <Form.Label>Attribute:</Form.Label>
          <select
            name="attribute"
            defaultValue="select"
            onChange={handleChange}
          >
            <option value="select" disabled hidden>
              Select an Attribute
            </option>
            {attribute.map((att) => (
              <option key={att} value={att}>
                {att}
              </option>
            ))}
          </select>
        </Form.Group>
      </Form>
      <Link to="/suggested">See the List of already Suggested Gifts Here</Link>
    </div>
  );
}
