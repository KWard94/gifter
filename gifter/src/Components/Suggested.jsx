import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

export default function Suggested() {
  //constants for form definitions
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

  //set constants for state
  const [suggestion, setSuggestion] = useState(initSuggest);
  const history = useHistory();
  const [nameToast, setNameToast] = useState(false);
  const [attToast, setAttToast] = useState(false);

  //function definitions
  const handleChange = (event) =>
    setSuggestion({ ...suggestion, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    // gift names are required in this schema, force the user to give the suggestion a name. Attributes are required for function of the site
    if (!suggestion.name || suggestion.name === "") {
      setNameToast(true);
      return;
    } else if (!suggestion.attribute) {
      setAttToast(true);
      return;
    } else {
      postSuggestion().then(() => history.push(`/suggested`));
    }
  };

  const toggleNameToast = () => setNameToast(!nameToast);
  const toggleAttToast = () => setAttToast(!attToast);

  // axios call to post suggestion to database
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

  return (
    <div className="suggest-form">
      <h1>Please Submit a Suggestion for this Website!</h1>
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
        <Form.Group className="price-container">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter a Price"
            name="price"
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
        <Form.Group className="textarea">
          {/* <Form.Label>Description:</Form.Label> */}
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            onChange={handleChange}
            placeholder="Please Enter a Description"
            name="description"
          />
        </Form.Group>
        <Form.Group className="url">
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={2}
            onChange={handleChange}
            placeholder="Please Enter the URL to find this gift"
            name="description"
          />
        </Form.Group>

        <Toast className="alert" show={nameToast} onClose={toggleNameToast}>
          <Toast.Header>Suggestion Name</Toast.Header>
          <Toast.Body>
            A Gift Name is Required to make a suggestion! Please enter a name of
            your gift to continue
          </Toast.Body>
        </Toast>
        <Toast className="alert" show={attToast} onClose={toggleAttToast}>
          <Toast.Header>Attribute Selection</Toast.Header>
          <Toast.Body>
            An Attribute is required for your gift to be used in this app!
            Please select an attribute from the dropdown menu in the above form
            to continue.
          </Toast.Body>
        </Toast>

        <Button type="submit" variant="secondary">
          Suggest!
        </Button>
      </Form>
      <br />
      <Link to="/suggested" id="suggested-link">
        <Button variant="outline-info">
          See the List of already Suggested Gifts Here
        </Button>
      </Link>
    </div>
  );
}
