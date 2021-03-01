/* eslint-disable no-restricted-imports */
import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


function ProductGroupsBar() {
    const classes = useStyles();
  return <Paper className={classes.paper}>xs=12</Paper>
}
export default ProductGroupsBar;
