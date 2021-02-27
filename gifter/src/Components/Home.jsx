import React from "react";

export default function Home() {
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
    </div>
  );
}
