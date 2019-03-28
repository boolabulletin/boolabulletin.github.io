import React, { Component } from 'react';
import ExploreGridList from './explore.js';
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5e6771',
      main: '#343d46',
      dark: '#0e171f',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    background: {
    default: '#424242', // Make primary
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" color="secondary">
            <Toolbar color="inherit">
              <Typography variant="display1" align="left" color="inherit">
                Boola Bulletin
              </Typography>
            </Toolbar>
          </AppBar>
          <ExploreGridList />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
