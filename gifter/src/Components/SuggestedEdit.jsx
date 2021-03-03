import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import axios from "axios";

export default function SuggestedEdit({ match }) {
  //constant definitions for edit form
  const initSuggest = {
    name: "",
    price: "",
    description: "",
    attribute: "",
    image: "",
    url: "",
  };
  const attribute = [
    "Creative",
    "Curious",
    "Adventurous",
    "Humorous",
    "Outdoorsy",
    "Social",
    "Solitary",
  ];

  //constant definitions for state
  const [suggested, setSuggested] = useState(initSuggest);
  const [nameToast, setNameToast] = useState(false);
  const [attToast, setAttToast] = useState(false);
  const history = useHistory();

  //function definitions
  const handleChange = (event) =>
    setSuggested({ ...suggested, [event.target.name]: event.target.value });

  //******************  start here- refactor this handle submit based on how i refactored the handle submit for suggestion post, then add the bootstrap toast function to the alert like in the suggestion post component
  const handleSubmit = (event) => {
    event.preventDefault();

    // gift names are required in this schema, force the user to give the suggestion a name. Attributes are required for function of the site
    if (!suggested.name || suggested.name === " ") {
      setNameToast(true);
      return;
    } else if (!suggested.attribute) {
      setAttToast(true);
      return;
    } else {
      updateSuggestion().then(() => history.push(`/suggested`));
    }
  };
  console.log();

  const toggleNameToast = () => setNameToast(!nameToast);
  const toggleAttToast = () => setAttToast(!attToast);

  //api call for getting the suggestion to edit, find by id
  useEffect(() => getSuggested(match.params.id), []);
  const getSuggested = async (id) => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${id}`;

      const suggestedDet = await axios.get(url);
      setSuggested(suggestedDet.data);
    } catch (error) {
      console.log(error);
    }
  };

  //axios call for updating the suggested gift in the database
  const updateSuggestion = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${suggested._id}`;
      const suggestedGift = await axios.put(url, suggested);
      return suggestedGift.data._id;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit This Suggestion!</h1>
      <h6>
        Please Note: If a field is not filled in on this update form it will
        remain unchanged.
      </h6>
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
          <Form.Label>Price: $</Form.Label>
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

        {/* **********    add toast functionality here */}
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

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
