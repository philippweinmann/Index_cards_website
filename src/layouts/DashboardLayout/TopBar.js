import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles, List
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#444444',
  },
  avatar: {
    width: 60,
    height: 60
  },
  button: {
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#444444',
    '&:hover': {
      color: '#444444',
      backgroundColor: 'white',
    }
  },
  logo: {
    color: 'white',
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={10}
      {...rest}
    >
      <Toolbar>
        <Hidden mdDown>
          <RouterLink to="/">
            <Typography variant="h4" className={classes.logo}>
              CARDS HERO
            </Typography>
          </RouterLink>
          <Box flexGrow={1} />
          <Button
            variant="outlined"
            key="Add new card"
            title="Add new card"
            href="/addCard"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add new card
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            href="/"
          >
            <HomeOutlinedIcon />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton
            color="inherit"
            href="/addCard"
          >
            <AddIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
