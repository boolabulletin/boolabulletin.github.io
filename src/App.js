import React, { Component } from 'react';
import ExploreGridList from './explore.js';
import {
	CssBaseline,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5e6771',
      main: '#000000',
      dark: '#0e171f',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#63a4ff',
      main: '#ffffff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    background: {
    default: '#fafafa', // Make primary
    },
  },
  typography: {
      fontFamily: "'Roboto', sans-serif",
      useNextVariants: true,
    }
});

const styles = theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '14px',
      height: '18px'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      height: '6px',
    border: '4px solid rgba(0, 0, 0, 0)',
    backgroundClip: 'padding-box',
    '-webkit-border-radius': '7px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    '-webkit-box-shadow': 'inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)'
    },
    '::-webkit-scrollbar-button': {
    width: 0,
    height: 0,
    display: 'none'
},
'::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent'
}
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ExploreGridList />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
