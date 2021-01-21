import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    marginBottom: theme.spacing(1),
    borderRadius: 20,
    backgroundColor: theme.palette.background.dark,
    width: '100%',
    '&:hover': {
      borderRadius: 30,
      boxShadow: '0px 20px 20px 0px rgba(0,0,0,0.2)',
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const OtherCards = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [allCardsInfo = [], setAllCardsInfo] = React.useState('');

  useEffect(() => fetch('http://116.202.29.212:3000/index_cards').then((response) => response.json()).then((data) => {
    setAllCardsInfo(data);
    console.log(allCardsInfo);
  }), []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {[...allCardsInfo].map((item) => (
        <Card variant="outlined" className={classes.root}>
          <CardHeader
            avatar={(
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
        )}
            action={(
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
        )}
            title={item.title}
            subheader="5 hours ago"
          />
          <Divider />
          <CardContent>
            <Typography variant="h6" color="textSecondary" component="p">
              {item.front}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Chip label={item.field} color="secondary" size="small" />
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Answer:</Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                {item.back}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}

    </Grid>
  );
};
export default OtherCards;
