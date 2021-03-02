import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function SuggestedEdit({ match }) {
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

  const [suggested, setSuggested] = useState(initSuggest);
  const history = useHistory();

  useEffect(() => getSuggested(match.params.id), []);

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

  //603d3bd7c1ed2f0015d8a9f2
  const updateSuggestion = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/suggestion/${suggested._id}`;
      //   const url = `https://gifter-backend-api.herokuapp.com/suggestion/603d3bd7c1ed2f0015d8a9f2`;
      const suggestedGift = await axios.put(url, suggested);
      return suggestedGift.data._id;
    } catch (error) {
      console.log(error);
    }
  };

  //maybe remove spread operator?
  const handleChange = (event) =>
    setSuggested({ ...suggested, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    // gift names are REQUIRED in this schema
    // force the user to give the character a name before they can submit
    if (!suggested.name || suggested.name === "") {
      alert("A Name is Required");
      return;
    } else if (!suggested.attribute) {
      alert("An Attribute is Required");
      return;
    } else {
      updateSuggestion().then(() => history.push(`/suggested`));
    }
  };

  return (
    <div>
      <h1>EDIT FORM HERE</h1>
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
