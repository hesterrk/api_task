import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SearchForm from "./SearchForm";

export default function ResultList() {
  const classes = useStyles();

  const [portfolioData, setPortfolioData] = useState(null);
  const [taskData, setTaskData] = useState(null);

  const token = localStorage.getItem("token");

  const configPortfolio = {
    method: "get",
    url: "https://edocsapi.azurewebsites.net/Core6/api/Portfolio/ByUserId",
    headers: {
      Authorization: `Digest username="{{appToken}}" realm="_root_" password=${token}`,
    },
  };

  const configTask = {
    method: "get",
    url: "https://edocsapi.azurewebsites.net/Core6/api/Tasks/ByUser",
    headers: {
      Authorization: `Digest username="{{appToken}}" realm="_root_" password=${token}`,
    },
  };

  const requestOne = axios(configPortfolio);
  const requestTwo = axios(configTask);

  useEffect(() => {
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          let responseOne = responses[0].data;
          let responseTwo = responses[1].data;

          setPortfolioData(responseOne);
          setTaskData(responseTwo);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  return (
    <div>
      <SearchForm />
      <h2 className={classes.header}> Your Results </h2>
    </div>
  );
}

const useStyles = makeStyles({
  header: {
    fontSize: "1rem",
  },
});
