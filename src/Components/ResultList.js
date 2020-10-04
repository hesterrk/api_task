import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SearchForm from "./SearchForm";

export default function ResultList() {
  const classes = useStyles();

  const [portfolioData, setPortfolioData] = useState(null);
  const [taskData, setTaskData] = useState(null);

  const token = localStorage.getItem("token");

  const [filterPortfolioSite, setFilterPortfolioSite] = useState([]);
  const [filterPortfolioDoc, setFilterPortfolioDoc] = useState([]);
  const [filterPortfolioProj, setFilterPortfolioProj] = useState([]);

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

          setFilterPortfolioSite(responseOne);
          setFilterPortfolioDoc(responseOne);
          setFilterPortfolioProj(responseOne);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  function SearchDataSet(matchTask) {
    let siteResult = portfolioData
      ? portfolioData.Result.sites.filter((site) =>
          site.name.includes(matchTask)
        )
      : null;

    let documentResult = portfolioData
      ? portfolioData.Result.sites[0].projects[0].documents.filter((doc) =>
          doc.name.includes(matchTask)
        )
      : null;

    let projectResult = portfolioData
      ? portfolioData.Result.sites[0].projects.filter((proj) =>
          proj.name.includes(matchTask)
        )
      : null;

    if (siteResult && siteResult !== null) {
      let searchResult = siteResult.map((s) => s.name);
      setFilterPortfolioSite(searchResult);
    }
    if (documentResult && documentResult !== null) {
      let docResult = documentResult ? documentResult[0] : null;

      setFilterPortfolioDoc(docResult);
    }

    if (projectResult && projectResult !== null) {
      let projResult = projectResult ? projectResult[0] : null;

      setFilterPortfolioProj(projResult);
    }
  }

  function clear(e) {
    setFilterPortfolioSite(portfolioData);
    setFilterPortfolioDoc(portfolioData);
    setFilterPortfolioProj(portfolioData);
  }

  useEffect(() => {
    SearchDataSet(matchTask);
  }, [matchTask]);

  function changeHandler(event) {
    setMatchTask(event.target.value);
  }

  return (
    <div>
      <SearchForm changeHandler={changeHandler} />
      <h2 className={classes.header}> Your Results </h2>
      <button className={classes.clearButton} onClick={() => clear()}>
        Clear Results
      </button>

      <div className={classes.resultsContainer}>
        <p>{filterPortfolioSite ? filterPortfolioSite[0] : ""} </p>
        <p>{filterPortfolioDoc ? filterPortfolioDoc.name : ""} </p>
        <p>{filterPortfolioProj ? filterPortfolioProj.name : ""} </p>
      </div>

      <div className={classes.dataContainer}>
        <h2> Data</h2>
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
            : " "}
        </div>

        <div>
          <b> Task Count </b> :{taskData ? taskData.Result.tasks.length : " "}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  header: {
    fontSize: "1rem",
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "column",

    border: "2px solid lavender",
    width: "50%",
    margin: "0 auto",
    height: "auto",
    marginBottom: 20,
    marginTop: 20,
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

  clearButton: {
    borderRadius: "10px",
    backgroundColor: "transparent",
    borderColor: "black",
  },
});
