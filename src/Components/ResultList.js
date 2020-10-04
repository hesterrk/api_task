import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

export default function ResultList() {
  const classes = useStyles();

  return (
    <div>
      <h2 className={classes.header}> Your Results </h2>
    </div>
  );
}

const useStyles = makeStyles({
  header: {
    fontSize: "1rem",
  },
});
