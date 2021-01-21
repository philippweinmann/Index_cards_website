import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActionArea } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: 130,
    borderRadius: 20,
    margin: theme.spacing(2)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  div: {
  }
}));

const subjects = [
  {
    title: 'Informatik',
    id: 1,
    color: 'primary',
  },
];

const Subjects = () => {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Grid container justify="center">
        {subjects.map((item) => (
          <Card elevation={10} className={classes.root}>
            <CardActionArea
              title={item.title}
              href="/informatik/programmieren"
            >
              <Typography style={{ paddingTop: '10%', paddingBottom: '15%' }} align="center" variant="h1" color={item.color} gutterBottom>
                {item.title}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </div>
  );
};
export default Subjects;
