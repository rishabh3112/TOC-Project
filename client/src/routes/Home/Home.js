import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [query, setQuery] = useState(state.query);
  const [showResults, setShowResults] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    if (query != state.query) {
      setShowResults(true);
      dispatch({ type: "STASH_PAGES" });
      dispatch({ type: "SET_QUERY", payload: query });
    } else {
      history.push("/results/0");
    }
  }

  useEffect(() => {
    if (showResults) {
      setShowResults(false);
      history.push("/results/0");
    }
  }, [state.query]);

  return (
    <div className="home">
      <div className="banner__home">
        <div className="banner-heading__home">
          <h1>News Curator
          <span className="banner-icon__home material-icons">
            article
          </span>
          </h1>
          {/* <div style={{textAlign: 'center'}}>Get news with brain!</div> */}
        </div>
        <div className="search__home">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleClick}>
              <span className="material-icons">
                search
              </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
