import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SearchForm from "./SearchForm";

export default function ResultList() {
  const classes = useStyles();

  const [portfolioData, setPortfolioData] = useState(null);
  const [taskData, setTaskData] = useState(null);

  const token = localStorage.getItem("token");

  const [filterPortfolioData, setFilterPortfolioData] = useState([]);
  const [matchTask, setMatchTask] = useState();

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

          setFilterPortfolioData(responseOne);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  function changeHandler(event) {
    setMatchTask(event.target.value);
  }

  return (
    <div>
      <SearchForm changeHandler={changeHandler} />
      <h2 className={classes.header}> Your Results </h2>

      <div className={classes.dataContainer}>
        <div>
          {portfolioData
            ? portfolioData.Result.sites.map((site, i) => {
                return (
                  <div>
                    <p>
                      <b> Site Name </b>: {site.name}
                    </p>
                    <div>
                      {site.projects.map((proj) => {
                        return (
                          <p>
                            <b>Project Name</b>: {proj.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : "nothing"}
        </div>

        <div>
          {portfolioData
            ? portfolioData.Result.sites[0].projects[0].documents.map(
                (doc, i) => {
                  return (
                    <p>
                      <b>Document Name </b>: {doc.name}
                    </p>
                  );
                }
              )
            : "nothing "}
        </div>

        <div>
          <b> Task Count </b> :
          {taskData ? taskData.Result.tasks.length : "empty "}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  header: {
    fontSize: "1rem",
  },

  dataContainer: {
    border: "2px solid #928DAB",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    width: "75%",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
});
