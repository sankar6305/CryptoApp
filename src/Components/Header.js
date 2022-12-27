import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    fontWeight: 1500,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  Btn: {
    background: 'linear-gradient(90deg, #c62828 30%, #4a148c 90%)',
    fontWeight: 50,
  },
  Logo: {
    fontFamily: ['Libre Baskerville', 'serif'].join(','),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    fontWeight: 550,
  },
});

export default function ButtonAppBar() {
  const classes = useStyles();

  const handleClick = () => {
    window.location.href = '/';
    // console.log('clicked');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Typography variant="h3" sx={{ fontStyle: 'italic', flexGrow: 2 }} className={classes.Logo} onClick={handleClick}>
            CryptoMania
          </Typography>
          <div className='HeaderButtons'>
            <Link to='/trading'>
              <Button className={classes.Btn}> Trade Here </Button>
            </Link>
            <Link to='/Signup'>
              <Button className={classes.Btn}>Sign Up</Button>
            </Link>
            <Link to='/Signin'>
              <Button className={classes.Btn}>Sign in</Button>
            </Link>
          </div>
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}