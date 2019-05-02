import React from 'react';
import { 
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Grid,
	Typography,
	TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from './dialogTitle.js'
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	layout: {
		margin: 'auto',
		padding: 'auto',
		height: '100%'
	},
	form: {
		width: '100%',
	},
	preview: {
		maxWidth: '100%',
		height: 'auto',
		padding: '10px'
	},
	textField: {
		width: '100%'
	}
});

class Upload extends React.Component{
	constructor(props) {
		super(props);
		const remainder = 30 - (moment(new Date().toISOString()).minute() % 30);
		this.state = {
			open: false,
			title: '',
			location: '',
			description: '',
			preview: null,
			file: null,
			errorMessage: false,
			start: moment().add(remainder, "minutes").format("MMM DD YYYY h:mm A"),
			end: moment().add(remainder, "minutes").add(1, "hours").format("MMM DD YYYY h:mm A"),
		};
		this.fileInput = React.createRef();
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.upload = this.upload.bind(this);
		this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
	}

	handleOpen() {
		const remainder = 30 - (moment(new Date().toISOString()).minute() % 30);
		this.setState({
			open: true,
			start: moment().add(remainder, "minutes").format("MMM DD YYYY h:mm A"),
			end: moment().add(remainder, "minutes").add(1, "hours").format("MMM DD YYYY h:mm A"),
		});
	}

	handleClose () {
		this.setState({
			open: false,
			errorMessage: false
		});
	}

	handleFinishedUpload () {
		this.setState({
			open: false,
			errorMessage: false,
			title: '',
			location: '',
			description: '',
			preview: null,
			file: null,
		});
	}

    handleChange = name => event => {
    	this.setState({ [name]: event.target.value });
    }

    handleDateChange = name => date => {
    	this.setState({ [name]: date });
    }

    loadPreview = event => {
    	this.setState({
    		file: event.target.files[0],
    		preview: URL.createObjectURL(event.target.files[0])
    	});
    }

    handleSubmit(event) {
    	event.preventDefault();
    	if (!(this.state.title && this.state.location && this.state.description && this.state.file && this.state.start && this.state.end)) {
    		this.setState({errorMessage: true});
    		return;
    	}
    	var data = new FormData();
    	data.append('title', this.state.title);
    	data.append('location', this.state.location);
    	data.append('description', this.state.description);
    	data.append('start', this.state.start);
    	data.append('end', this.state.end);
    	data.append('img', this.state.file, this.state.file.name);
    	this.upload(data);

    	var flyer = [{
    		title: this.state.title,
    		location: this.state.location,
    		description: this.state.description,
    		start: this.state.start,
    		end: this.state.end,
    		file_path: this.state.preview
    	}];
    	this.props.hang(flyer);
    	this.handleFinishedUpload();
    }

    upload(data) {
		// console.log(this.state.flyersToDisplay);
		const GATEWAY_URL = ['https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/upload-flyer'];
		let req = new Request (GATEWAY_URL, {
			method: 'POST',
			headers: {},
			body: data
		});
		fetch(req).catch(error => console.log(error));
		// .then(response => response.json())
		// .then(json => new Array(json.body.key))
		// .then(newFlyer => this.setState((prevState) =>
		// 	({flyersToDisplay: newFlyer.concat(prevState.flyersToDisplay)})
		// ))
	}

	render () {
		const { classes } = this.props;
		return (
			<div>
				<Button variant="contained" color="primary" onClick={this.handleOpen}>
					Hang a flyer
				</Button>
				<Dialog open={this.state.open} onClose={this.handleClose} maxWidth="md">
					<div className={classes.layout}>
					<Grid container justify="flex-end">
						{this.state.preview ?
						<Grid item sm>
							<img className={classes.preview} src={this.state.preview ? this.state.preview : null} width={850} height={1100} alt="Flyer"/>
						</Grid> : <div />}
						<Grid item sm>
							<div className={classes.form}>
								<DialogTitle onClose={this.handleClose}>Hang a Flyer</DialogTitle>
								<DialogContent>
									<form noValidate>
										<Grid container direction="row"spacing={8} alignItems="center" justify="space-between">
										<Grid item>
										<input
										accept="image/*"
										className={classes.input}
										style={{ display: 'none' }}
										id="select-file"
										type="file"
										ref={this.fileInput}
										onChange={this.loadPreview}
									/>
									<label htmlFor="select-file">
										<Button variant="contained" component="span" color="primary" className={classes.button}>
											Select File
											</Button>
									</label> 
									</Grid>
									<Grid item xs={12} md={8}>
										<TextField
										autoFocus
										margin="dense"
										id="title"
										label="Title"
										type="text"
										fullWidth
										className={classes.textField}
										variant="outlined"
										value={this.state.title}
										onChange={this.handleChange('title')}
										/>
										</Grid>
									</Grid>
										<MuiPickersUtilsProvider utils={MomentUtils}>
									        <Grid container className={classes.grid} justify="space-between">
									          <DateTimePicker
									            margin="normal"
									            label="Start"
									            value={this.state.start}
									            onChange={this.handleDateChange('start')}
									            variant="outlined"
									          />
									          <DateTimePicker
									            margin="normal"
									            label="End"
									            value={this.state.end}
									            onChange={this.handleDateChange('end')}
									            variant="outlined"
									          />
									        </Grid>
									      </MuiPickersUtilsProvider>
										<TextField
										margin="dense"
										id="location"
										label="Where"
										type="text"
										fullWidth
										className={classes.textField}
										variant="outlined"
										value={this.state.location}
										onChange={this.handleChange('location')}
										/>
										<TextField
										id="description"
										label="Description"
										multiline
										rows="10"
										rowsMax="10"
										value={this.state.description}
										onChange={this.handleChange('description')}
										className={classes.textField}
										margin="normal"
										variant="outlined"
								        />
									</form>
									{ this.state.errorMessage ? 
									<Typography color="error">
										All fields must be filled
									</Typography> : <div />}
								</DialogContent>
								<DialogActions>
									<Button variant="contained" color="primary" onClick={this.handleSubmit}>Upload</Button>
								</DialogActions>
							</div>
						</Grid>
			        </Grid>
			        </div>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(Upload);
