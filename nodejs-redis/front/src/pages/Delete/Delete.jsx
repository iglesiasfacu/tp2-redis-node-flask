import React, { useState } from "react";
import { Link } from "react-router-dom";
import goBack from "../../assets/back.png";

const Delete = () => {
  const [episode, setEpisode] = useState();
  const [character, setCharacter] = useState();
  const [carga, setCarga] = useState();

  const fetchDeleteCharacter = async () => {
    await fetch("http://localhost:3001/delete", {
      method: "DELETE",
      body: JSON.stringify({ episode, character }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setCarga(true);
      })
      .catch(() => {
        setCarga(false);
      });
  };

  return (
    <>
      <div className="main-card">
        <Link to="/">
          <img src={goBack} alt="go-back" />
        </Link>
        <div className="card-title">
          <h1>Delete character</h1>
        </div>
        <div className="card-input">
          <input
            type="text"
            name="episode"
            placeholder="Episode number.."
            required={true}
            onChange={(e) => {
              setEpisode(e.target.value);
            }}
          />
          <input
            type="text"
            name="character"
            placeholder="Character name.."
            onChange={(e) => {
              setCharacter(e.target.value);
            }}
          />
        </div>
        <div className="card-result">
          {carga !== undefined ? (
            <>
              {carga ? (
                <>
                  <p style={{ color: "green" }}>Personaje eliminado</p>
                </>
              ) : (
                <>
                  <p style={{ color: "red" }}>ERROR</p>
                </>
              )}
            </>
          ) : null}
        </div>
        <div className="card-button">
          <button onClick={fetchDeleteCharacter}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default Delete;
