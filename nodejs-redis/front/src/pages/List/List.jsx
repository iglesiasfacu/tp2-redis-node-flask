import React, { useState } from "react";
import { Link } from "react-router-dom";
import goBack from "../../assets/back.png";
import "./List.css";

const List = () => {
  const [episode, setEpisode] = useState();
  const [characters, setCharacters] = useState();

  const fetchListCharacter = async () => {
    const res = await fetch(`http://localhost:3001/list/${episode}`);
    const arrayCharacter = await res.json();
    setCharacters(arrayCharacter);
  };

  return (
    <>
      <div className="list-card">
        <Link to="/">
          <img src={goBack} alt="go-back" />
        </Link>
        <div className="list-title">
          <h1>List of characters by episode</h1>
        </div>
        <div className="list-input">
          <input
            type="text"
            name="episode"
            placeholder="Episode number.."
            size={40}
            onChange={(e) => setEpisode(e.target.value)}
          />
        </div>
        <div className="card-button">
          <button onClick={fetchListCharacter}>Show</button>
        </div>

        <div className="character-list">
          {characters ? (
            <>
              {characters.length ? (
                <>
                  {characters.map((item) => {
                    return <p>{item}</p>;
                  })}
                </>
              ) : (
                <>
                  <p>No characters found :c</p>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default List;
