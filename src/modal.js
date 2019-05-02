import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
	Dialog,
	DialogContent,
	DialogActions,
	Card,
	CardMedia,
	Button,
	Grid,
	Typography,
} from '@material-ui/core';
import DialogTitle from './dialogTitle.js'
import moment from 'moment';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	layout: {
		margin: 'auto',
		padding: 'auto',
		overflowY: 'scroll'
	},
	flyer: {
		maxWidth: '100%',
		height: 'auto',
		padding: '10px'
	},
	description: {
		fontSize: 16,
		whiteSpace: 'pre-wrap',
		overflow: 'auto',
		maxHeight: '45vh',
	},
	time: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingTop: 10,
		whiteSpace: 'pre-wrap'
	},
	place: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	cal: {
		// paddingBottom: 10,
		// paddingRight: 10
		marginLeft: -5,
		paddingBottom: 15
	},
	dialogPaper: {
		// maxHeight: '00px'
	},
	content: {
		// maxHeight: '50vh'
	}
});

class FlyerModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showPreview = this.showPreview.bind(this);
		this.getDate = this.getDate.bind(this);
		this.getLink = this.getLink.bind(this);
	};

	handleChange(event) {
		console.log(event.target.files[0]);
		this.setState({
			file: URL.createObjectURL(event.target.files[0])
		});
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
	    this.props.upload(data);
  }

  showPreview() {
  	if (this.state.file) {
  		console.log(this.state.file);
  		return (
  			<Card>
			        <CardMedia image={this.state.file} />
			    </Card>
  			);
  	}
  }

  getDate(start, end) {
  	const fromFormat = "ddd MMM D YYYY HH:mm:ss";
  	const alt = "MMM DD YYYY h:mm A";
  	const toFormat = "ddd, MMM D h:mm A";
  	var s = moment(start, [fromFormat, alt]);
  	var e = moment(end, [fromFormat, alt]);
  	if(s.isSame(e, 'day')) {
  		return s.format(toFormat) + " - " + e.format("h:mm A");
  	} else {
  		return s.format(toFormat) + " - " + e.format(toFormat);
  	}
  }

  getLink(data) {
  	const fromFormat = "ddd MMM DD YYYY HH:mm:ss";
  	const toFormat = "YYYYMMDD[T]HHmmss";
  	var s = moment(data.start, fromFormat).format(toFormat);
  	var e = moment(data.end, fromFormat).format(toFormat);

  	return "https://www.google.com/calendar/render?action=TEMPLATE&text=" 
  	+ encodeURIComponent(data.title) 
  	+ "&dates=" 
  	+ s + "/" + e 
  	+ "&details=" + encodeURIComponent(data.description) 
  	+ "&location=" + encodeURIComponent(data.location) 
  	+ "&sf=true&output=xml";
  }


	render() {
		const { classes, data } = this.props;
		return(
			<div className={classes.root}>
				<Dialog classes={{paper: classes.dialogPaper}} open={this.props.open} onClose={this.props.onClose} maxWidth="md" fullWidth={true}>
					<div className={classes.layout}>
					<Grid container>
						<Grid item xs={12} md={6}>
							<img className={classes.flyer} src={data.file_path} width={850} height={1100} alt="Flyer"/>
						</Grid>
						<Grid item xs={12} md={6}>
							<div className={classes.content}>
							<DialogTitle className={classes.title} onClose={this.props.onClose}>{data.title}</DialogTitle>
							<DialogContent>
								<Grid container direction="column" alignItems="flex-start">
									<Grid item>
										<Typography className={classes.time} gutterbottom="true">
											{this.getDate(data.start, data.end)}
										</Typography>
									</Grid>
									<Grid item>
										<Typography className={classes.place} gutterbottom="true">
											{data.location}
										</Typography>
									</Grid>
									<Grid item>
										<DialogActions className={classes.cal}>
								<Button variant="contained" color="primary" href={this.getLink(data)}
									target="_blank">Add to Gcal</Button>
							</DialogActions>
									</Grid>
								</Grid>
								<Typography className={classes.description}gutterbottom="true">
									{data.description}
								</Typography>
							</DialogContent>
							</div>
						</Grid>
			        </Grid>
			        </div>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(FlyerModal);