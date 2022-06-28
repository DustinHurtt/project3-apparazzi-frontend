import React from "react";
import { useNavigate } from "react-router-dom";

const Tags = () => {
  const [query, setQuery] = React.useState("");

  let navigate = useNavigate();

  let handleChange = (e) => {
    setQuery(e.target.value);
  };

  let handleSubmit = () => {
    navigate(`/${query}/tag`);
  };

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <h2>Tag Search</h2>
        <br />
        <form>
          <label>Search #</label>
          <input
            onChange={handleChange}
            type="text"
            name="search"
            value={query}
          ></input>
          <button type="button" onClick={handleSubmit}>
            Find Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tags;
