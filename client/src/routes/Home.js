import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import { Link } from "react-router-dom";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const loadArticles = () => {
    fetch()
  }

  return <h1>Hello</h1>
};

export default Home;