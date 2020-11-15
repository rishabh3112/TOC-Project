import React, { useEffect, useContext } from "react";
import { Context } from "../../Store";
import "./styles.css";

export default (props) => {
  const [state, dispatch] = useContext(Context);
  console.log(props);
  const pageNumber = props.match.params.page;
  const index = props.match.params.index;

  try {
    const article = state.pages[pageNumber][index];
    if (!article) {
      return <h1>Hello</h1>;
    }

    return (
      <div className="news_container">
        <div className="banner__home">
          <h1 className="banner-heading__home">{article.title}</h1>
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
        </div>
        <br />
        <p className="news_content">
          <h4>News article (<a class="link" target="_blank" href={article.link}>Original Source</a>)</h4>
          {article.content}
        </p>
      </div>
    );
  } catch {
    return <h1>Hello</h1>;
  }
};
