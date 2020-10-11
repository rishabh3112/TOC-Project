import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [query, setQuery] = useState(state.query);

  useEffect(() => {
    if (query != state.query) {
      dispatch({ type: "STASH_PAGES" });
      dispatch({ type: "SET_QUERY", payload: query });
    }
  }, [query]);

  return (
    <div className="home">
      <div className="banner__home">
        <h1 className="banner-heading__home">
          News Reader 
          <span className="banner-icon__home material-icons">
            article
          </span>
        </h1>
        <div className="search__home">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Link to="/results/0">
            <button>
              <span className="material-icons">
                search
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
