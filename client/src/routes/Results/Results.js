import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { Link } from "react-router-dom";
import "./styles.css";

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
          return [];
        })
        .then((articles) => {
          dispatch({
            type: "SET_PAGE",
            payload: {
              page: pageNumber,
              data: articles,
            },
          });
        })
        .catch((err) => {
          const fakeData = [
            {
              title: "Not Found",
              link: "/",
              date: "4hrs ago",
              sentiment: "Positive",
              summary: "AALKDLKSDGKJHGKJHSKJHDGKJHDSGKJHSGDKJHGSDK",
            },
          ];
          dispatch({
            type: "SET_PAGE",
            payload: {
              page: pageNumber,
              data: fakeData,
            },
          });
        });
    }
  }, []);

  if (!state.pages[pageNumber]) {
    return (
      <div style={{ color: "#fff" }}>
        <h2>Results for {state.query}</h2>
        <div style={{ padding: "25px" }}>Loading...</div>
      </div>
    );
  }

  const cards = state.pages[pageNumber].map((article) => {
    return (
      <div className="result-card__results" key={article.link}>
        <a className="result-title__results" href={article.link}>
          {article.title}
        </a>
        <span className="result-metadata__results">
          <span className="result-date__results">
            <span className="material-icons">signal_cellular_alt</span>
            <span style={{ marginLeft: "2px" }}>{article.sentiment}</span>
          </span>
          <span className="result-date__results" style={{ float: "right" }}>
            <span className="material-icons">event</span>
            <span style={{ marginLeft: "2px" }}>{article.date}</span>
          </span>
        </span>
        <p className="result-desc__results">
          {article.summary.slice(0, 400)}...
        </p>
      </div>
    );
  });

  return (
    <div style={{ color: "#fff" }}>
      <h2>Results for {state.query}</h2>
      <div className="results__results" style={{ padding: "25px" }}>
        {cards}
      </div>
    </div>
  );
};
