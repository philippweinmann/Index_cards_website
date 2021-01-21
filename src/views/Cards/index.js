import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import Page from 'src/components/Page';
import OtherCards from './OtherCards';
import Cards from './Cards';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    paddingTop: theme.spacing(2),
    borderRadius: 20,
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  }
}));

const CardsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Cards"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={1}
            md={6}
            xs={12}
          />
          <Grid
            item
            lg={7}
            md={6}
            xs={12}
          >
            <Cards />
          </Grid>

          <Grid
            item
            lg={1}
            md={6}
            xs={12}
          />
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography align="center" variant="h4" gutterBottom>
              Other cards
            </Typography>
            <Paper className={classes.paper}>
              <OtherCards />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CardsView;
