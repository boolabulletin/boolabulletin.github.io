import React from 'react';
// import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Flyer from './flyer.js';
import NavBar from './navbar.js';
import Petition from './petition.js';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
    marginTop: '-20px'
  }
});

class ExploreView extends React.Component {
	constructor(props) {
		super(props);
		var params = new URLSearchParams(window.location.search);
		this.state = { 
			flyersToDisplay: [],
			petitionOpen: params.has('p'),
		};
		this.getFlyers = this.getFlyers.bind(this);
		this.hangFlyer = this.hangFlyer.bind(this);
		this.onOpenPetition = this.onOpenPetition.bind(this);
		this.onClosePetition = this.onClosePetition.bind(this);
	}

	getFlyers(boardName) {
		return fetch('https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/get-flyer?board=Yale')
		.then(response => response.json());
	}

	componentDidMount() {
		this.getFlyers('Yale')
		.then((flyers) => this.setState({ flyersToDisplay: flyers}));
	}

	hangFlyer(flyer) {
		this.setState((prevState) =>
			({flyersToDisplay: flyer.concat(prevState.flyersToDisplay)}));
	}

	onOpenPetition() {
		this.setState({petitionOpen: true});
	}

	onClosePetition() {
		this.setState({petitionOpen: false});
	}
	
	render() {
		const { classes } = this.props;
		return(
			<React.Fragment>
			<Petition open={this.state.petitionOpen} onClose={this.onClosePetition} />
			<NavBar openPetition={this.onOpenPetition} hang={this.hangFlyer}/>
		    <div className={classNames(classes.layout, classes.cardGrid)}>
		      <Grid container spacing={32}>
		        {this.state.flyersToDisplay.map(flyerData => (
		          <Grid item key={flyerData.file_path} xs={12} md={3} lg={3}>
		          	<Flyer data={flyerData} />
		          </Grid>
		        ))}
		      </Grid>
		    </div>
		    </React.Fragment>
		);
	}
}

export default withStyles(styles)(ExploreView);

