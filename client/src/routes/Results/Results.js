import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { Link } from "react-router-dom";

export default (props) => {
  const [state, dispatch] = useContext(Context);
  const pageNumber = props.match.params.page;
  useEffect(() => {
    if (!state.pages[pageNumber]) {
      fetch(`${state.base}/api/${state.query}/${pageNumber}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          console.log(response.text());
          return {};
        })
        .then((articles) => {
          dispatch({
            type: "SET_PAGE",
            payload: {
              page: pageNumber,
              data: articles,
            },
          });
        });
    }
  }, []);

  if (!state.pages[pageNumber]) {
    return <Loader active />;
  }

  const cards = state.pages[pageNumber].map((article) => {
    return (
      <div key={article.link}>
          <h3>{article.title}</h3>
          <span>
            {article.sentiment}
            <span style={{ float: "right" }}>{article.date}</span>
          </span>
      </div>
    );
  });

  return (
    <div style={{ padding: "25px" }}>
      <h2>Results for {state.query}</h2>
      <div>
        {cards}
      </div>
    </div>
  );
};
