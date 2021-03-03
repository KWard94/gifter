import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function Home() {
  //Constant declarations and states
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [id, setId] = useState();
  const history = useHistory();
  const [sort, setSort] = useState();
  const sorted = gifts.filter((att) => att.attribute === sort);
  const [name, setName] = useState();

  //function declarations
  //below is the onClick function that sets state for the filter method which renders the suggested gifts
  const handleSelect = (att) => {
    const buttonAtt = att.target.value;
    setSort(buttonAtt);
  };

  //below is the function that pushes the user to the details of the suggested gift, selected by unique id
  const handleDetails = (id) => {
    history.push(`/gifts/${id}`);
    setId(id);
  };

  //below is the function for the user input of the gift recipient name. it will capitalize the first letter of the name, and sets a state for rendering items for that name
  const handleName = (a) => {
    const inputName = toTitleCase(a.target.value);
    setName(inputName);
  };

  //below function is the first letter to capital function for the handleName function
  const toTitleCase = (string) =>
    string
      ? string
          .split(" ")
          .map((word) => word[0].toUpperCase().concat(word.slice(1)))
          .join(" ")
      : null;

  // Below is the API call for the list of attrubutes from the database
  useEffect(() => getAttributes(), []);
  const getAttributes = async () => {
    try {
      const url = `https://gifter-backend-api.herokuapp.com/attributes`;
      // const url = `http://localhost:4500/attributes`;

      const attributeList = await axios.get(url);
      setAttributes(attributeList.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Below is the API call for the gift options
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

  //below the information from the attribute call is rendered on screen
  return (
    <div className="homepage">
      <div className="att-container">
        <div className="intro">
          <h1>
            Select From the List of Attributes Below to Find the Perfect Gift
            that You Have Been Searching For!
          </h1>
        </div>
        <div className="name-input">
          <Form>
            <Form.Label>Who is This Gift For?</Form.Label>
            <Form.Control
              type="text"
              className="name"
              size="lg"
              placeholder="Enter Name Here"
              onChange={(name) => handleName(name)}
            />
          </Form>
        </div>
        <div className="attributes">
          {loading ? (
            attributes.map((attribute) => {
              return (
                <ul>
                  <li>
                    <Button
                      variant="outline-secondary"
                      id="att-button"
                      value={attribute.attribute}
                      onClick={(att) => handleSelect(att, "value")}
                    >
                      {attribute.attribute}
                    </Button>
                  </li>
                </ul>
              );
            })
          ) : (
            <div className="loader">
              <Spinner animation="border" variant="secondary" />
            </div>
          )}
        </div>
      </div>

      {/* below here is rendered list of suggested gifts*/}

      <div className="home-list">
        {sort ? (
          <h3>
            Your Gift Suggestions for {name ? name : "your friend"} who is{" "}
            {sort}!
          </h3>
        ) : null}

        {sorted.map((gift) => {
          return (
            <div className="results">
              <ListGroup className="gift-list" key={gift._id}>
                <ListGroup.Item id="list-item">{gift.name}</ListGroup.Item>
                <Button
                  variant="secondary"
                  className="view-details"
                  size="sm"
                  id="home-gift-button"
                  onClick={() => handleDetails(gift._id)}
                >
                  View Gift Details
                </Button>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
