import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  card: {
    maxWidth: 700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  mobileStepper: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
}));

const Cards = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [allCardsInfo = [], setAllCardsInfo] = React.useState('');

  useEffect(() => fetch('http://116.202.29.212:3000/index_cards').then((response) => response.json()).then((data) => {
    setAllCardsInfo(data);
    console.log(allCardsInfo);
  }), []);

  const maxSteps = allCardsInfo.length;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // eslint-disable-next-line no-nested-ternary
  if (isMobile) {
    window.addEventListener('resize', handleExpandClick);
  }

  const handleNext = () => {
    setExpanded(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Card elevation={5} className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar aria-label="recipe" className={classes.avatar}>
              {allCardsInfo ? allCardsInfo[activeStep].title[0] : <Skeleton variant="circle" />}
            </Avatar>
        )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        )}
          title={allCardsInfo ? allCardsInfo[activeStep].title : <Skeleton variant="text" />}
          subheader="5 hours ago"
        />
        <Divider />
        <CardContent>
          <Typography variant="h3" color="textPrimary" component="p">
            {allCardsInfo ? allCardsInfo[activeStep].front : <Skeleton variant="rect" width={210} height={118} />}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <Typography variant="body1">
            Answer:
          </Typography>
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
        <Divider variant="middle" />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h3" color="textPrimary" paragraph>
              {allCardsInfo ? allCardsInfo[activeStep].back : <Skeleton variant="rect" width={210} height={118} />}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

      <MobileStepper
        className={classes.mobileStepper}
        elevation={5}
        steps={maxSteps}
        position="static"
        variant="progress"
        activeStep={activeStep}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        )}
      />
    </div>
  );
};
export default Cards;
