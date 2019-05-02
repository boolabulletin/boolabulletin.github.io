import React from 'react';
import Upload from './upload.js';
import {
	AppBar,
	Toolbar,
	Button,
	Tooltip,
	InputBase,
	Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
	grow: {
		flexGrow: 1
	},
	buttons: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	button: {
		minWidth: '10%',
		marginLeft: 5,
		marginRight: 5
	},
	logo: {
		position: 'absolute',
		width: '15%',
		height: "auto",
		left: 0,
		marginLeft: 10,
		[theme.breakpoints.down('xs')]: {
      width: '40%',
    }
	},
	upload: {
		position: 'absolute',
		right: 0,
		marginRight: 10
	},
	space: {
		width: 10
	},
	tooltip: {
		marginTop: '0%'
	},
	time: {
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'block',
		[theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    }
		// marginLeft: '-50px'
	},
	search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.9),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',  
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class NavBar extends React.Component{
	state = {
		tooltipOpen: false
	};

	handleTooltipOpen = () => {
		this.setState({tooltipOpen: true});
	};

	handleTooltipClose = () => {
		this.setState({tooltipOpen: false});
	};

	getDate = () => {
  	const toFormat = "dddd, MMMM Do YYYY";
  	return moment().format(toFormat);
  };

  handeClick = () => {
  	this.props.openPetition();
  };

	render () {
		const { classes } = this.props;
		return (
			<AppBar position="sticky" color="secondary" elevation={2}>
	            <Toolbar color="inherit">
        			<img className={classes.logo} src={require("./logo.png")} alt="Logo" />
        			<div className={classes.grow} />
        			{/* <div className={classes.search}>
        				<div className={classes.searchIcon}>
        					<SearchIcon />
        				</div>
        				<InputBase
        					placeholder="Search…"
        					classes={{root: classes.inputRoot, input: classes.inputInput}}
        					/>
        			</div>
        			<div className={classes.grow} /> */}
        				{/* <Button variant="contained" color="primary" onClick={this.handeClick} className={classes.button}>
        					#DisarmYPD
        				</Button>
        				<div className={classes.space} />
        				<CopyToClipboard text={"www.boolabulletin.com?p"}>
        					<Tooltip 
        						className={classes.tooltip}
        						open={this.state.tooltipOpen} 
        						onClose={this.handleTooltipClose} 
        						title="Copied petition link to clipboard"
        						placement="right">
            					<Button variant="contained" color="primary" onClick={this.handleTooltipOpen} className={classes.button}>
            						Share Petition
            					</Button>
            				</Tooltip>
        				</CopyToClipboard>
        			<Typography className={classes.time}>{this.getDate()}</Typography> */}
        			<Button variant="contained" color="primary"
									target="_blank"
									className={classes.button}>
									Abstract</Button>
					<Button variant="contained" color="primary"
									target="_blank"
									className={classes.button}>
									Report</Button>
					<Button variant="contained" color="primary"
									target="_blank"
									className={classes.button}>
									Code</Button>
        			<div className={classes.grow} />
        			<div className={classes.upload}>
        				<Upload hang={this.props.hang}/>
        			</div>
	            </Toolbar>
          </AppBar>
		);
	}
}

export default withStyles(styles)(NavBar);
