import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SuggestedList() {
  const [suggest, setSuggest] = useState([]);
  const [id, setId] = useState();
  const history = useHistory();

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

  const handleDetails = (id) => {
    history.push(`/suggestion/${id}`);
    setId(id);
  };

  return (
    <div className="suggested-page">
      <div className="suggested-list">
        {suggest.map((suggested) => {
          return (
            <ul>
              <li>{suggested.name}</li>
              <button
                className="view-details"
                onClick={() => handleDetails(suggested._id)}
              >
                See Details
              </button>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

// return (
//     gifts && (
//       <div className="list">
//         <h1>API CALL DATA</h1>
//         <h3>THE LIST OF GIFTS</h3>
//         {gifts.map((gift) => {
//           return (
//             <ul className="gift-list" key={gift._id}>
//               <li>{gift.name}</li>
//               <button
//                 className="view-details"
//                 onClick={() => handleDetails(gift._id)}
//               >
//                 View Gift Details
//               </button>
//             </ul>
//           );
//         })}
//       </div>
//     )
//   );
