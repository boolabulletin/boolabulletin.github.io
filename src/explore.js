import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import flyerData from './flyerData';
import flyer1 from './flyers/flyer1.jpg';

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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '130%',
  },
});

class FileInput extends React.Component {
  constructor(props) {
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.uploadFlyer = this.uploadFlyer.bind(this);
  }

  uploadFlyer(data) {
	const GATEWAY_URL = ['https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/upload-flyer'];
	let req = new Request (GATEWAY_URL, {
    	method: 'POST',
    	headers: {},
    	body: data
    });
	fetch(req)
	.then(response => response.json())
	.then(success => console.log(success))
	.catch(error => console.log(error));
}

  handleSubmit(event) {
    // highlight-range{4}
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
    var data = new FormData();
    let file = this.fileInput.current.files[0];
    data.append('img', file, file.name);
    this.uploadFlyer(data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class ExploreView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { flyersToDisplay: [] };
		this.getFlyers = this.getFlyers.bind(this);
	}

	getFlyers(boardName) {
	 return fetch('https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/get-flyer?board=Yale')
	.then(response => response.json())
	.then(body => body.map((obj) => obj.file_path));
}

	componentDidMount() {
		this.getFlyers('Yale').then(
		(flyers) => this.setState({flyersToDisplay: flyers}));
	}
	
	render() {
		const classes = this.props.classes;
		return(
			<React.Fragment>
		    <FileInput />
		    <div className={classNames(classes.layout, classes.cardGrid)}>
		      <Grid container spacing={32}>
		        {this.state.flyersToDisplay.map(flyerPath => (
		          <Grid item key={flyerPath} xs={12} sm={6} md={4} lg={3}>
		            <Card className={classes.card}>
		              <CardMedia
		                className={classes.cardMedia}
		                image={'https://s3.amazonaws.com/boola-bulletin-flyers/' + flyerPath}
		              />
		            </Card>
		          </Grid>
		        ))}
		      </Grid>
		    </div>
		    </React.Fragment>
		);
	}
}

ExploreView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExploreView);

