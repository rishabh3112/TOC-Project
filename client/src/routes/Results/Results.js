import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { Link } from "react-router-dom";
import "./styles.css";

export default (props) => {
  const [state, dispatch] = useContext(Context);
  const pageNumber = props.match.params.page;
  useEffect(() => {
    console.log(state.pages[pageNumber]);
    if (!state.pages[pageNumber]) {
      console.log('SENDING REQUEST!');
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
              subjectivity: 0.124567,
              content: "AALKDLKSDGKJHGKJHSKJHDGKJHDSGKJHSGDKJHGSDK",
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
  }, [pageNumber]);

  if (!state.pages[pageNumber]) {
    return (
      <div style={{ color: "#fff" }}>
        <h2>Results for {state.query}</h2>
        <div style={{ padding: "25px" }}>
          <div className="cssload-thecube">
            <div className="cssload-cube cssload-c1"></div>
            <div className="cssload-cube cssload-c2"></div>
            <div className="cssload-cube cssload-c4"></div>
            <div className="cssload-cube cssload-c3"></div>
          </div>
        </div>
      </div>
    );
  }

  const cards = state.pages[pageNumber].map((article, index) => {
    return (
      <div className="result-card__results" key={article.link}>
        <Link className="result-title__results" to={`/news/${pageNumber}/${index}`}>
          {article.title}
        </Link>
        <span className="result-metadata__results">
          <span className="result-date__results">
            <span className="material-icons">signal_cellular_alt</span>
            <span style={{ marginLeft: "2px" }}>{article.sentiment}</span>
          </span>
          <span className="result-date__results">
            <span className="material-icons">fact_check</span>
            <span style={{ marginLeft: "2px" }}>
              {100 - Math.round(article.subjectivity * 100)}%
            </span>
          </span>
          <span className="result-date__results">
            <span className="material-icons">event</span>
            <span style={{ marginLeft: "2px" }}>{article.date}</span>
          </span>
        </span>
        <p className="result-desc__results">
          <b>Summary: </b>
          {article.summary}
        </p>
      </div>
    );
  });

  return (
    <div style={{ color: "#fff" }}>
        <Link to={"/results/" + (parseInt(pageNumber) + 1).toString()}>
          <button className="next_article">
            Next page
            <span className="material-icons">
              navigate_next
            </span>
          </button>
        </Link>
      <h2>
        Results for <span class="result-query">{state.query}</span>
      </h2>
      <div className="results__results">{cards}</div>
    </div>
  );
};
