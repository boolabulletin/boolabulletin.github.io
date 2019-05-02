import React from 'react';
import { 
	Dialog,
	DialogContent,
	Button,
	Grid,
	Typography,
	TextField,
	AppBar,
	Toolbar,
	IconButton,
	Slide,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from './dialogTitle.js'
import CloseIcon from '@material-ui/icons/Close';
import letter from './letter.js';
import AffiliationSelector from './affiliationSelector';

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
		marginTop: '-5%'
	},
	textField: {
		width: '100%'
	},
	appBar: {
		
	},
	letter: {
		whiteSpace: 'pre-wrap'
	},
	submit: {
		margin: '2%'
	}
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Petition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			affiliation: '',
			comments: '',
			errorMessage: false,
			labelWidth: 0
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.upload = this.upload.bind(this);
		this.handleFinishedUpload = this.handleFinishedUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClose () {
		this.setState({
			open: false,
			errorMessage: false
		});
	}

	handleFinishedUpload () {
		this.props.onClose();
		this.setState({
			errorMessage: false,
			name: '',
			email: '',
			affiliation: '',
			comments: '',
		});
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	};

    handleSubmit(event) {
    	event.preventDefault();
    	if (!(this.state.name && this.state.email)) {
    		this.setState({errorMessage: true});
    		return;
    	}
    	// console.log(this.state);
    	var data = new FormData();
    	data.append('name', this.state.name);
    	data.append('email', this.state.email);
    	data.append('affiliation', this.state.affiliation);
    	data.append('comments', this.state.comments);
    	this.upload(data);
    	this.handleFinishedUpload();
    }

    upload(data) {
    	// Make new
		const GATEWAY_URL = ['https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/sign-petition'];
		let req = new Request (GATEWAY_URL, {
			method: 'POST',
			headers: {},
			body: data
		});
		fetch(req).catch(error => console.log(error));
	}

	

	render () {
		const { classes } = this.props;
		return (
			<div>
				<Dialog open={this.props.open} fullScreen TransitionComponent={Transition}>
					<AppBar position="sticky" className={classes.appBar}>
			            <Toolbar>
			              <Typography variant="h6" color="inherit" className={classes.flex}>
			                Sign the Petition
			              </Typography>
			              <div className={classes.grow} />
			              <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
			                <CloseIcon />
			              </IconButton>
			            </Toolbar>
			         </AppBar>
					<div className={classes.layout}>
					<Grid container direction="column" justify="center" alignItems="center">
						<Grid item xs={6}>
							<DialogTitle>Lorem ipsum dolor</DialogTitle>
							<DialogContent className={classes.letter}>
								{ letter }
							</DialogContent>
							<div className={classes.form}>
								<DialogContent>
									<form noValidate>
										<TextField
										margin="dense"
										name="name"
										label="Full Name"
										type="text"
										fullWidth
										className={classes.textField}
										variant="outlined"
										value={this.state.name}
										onChange={this.handleChange}
										/>

										<TextField
										margin="dense"
										name="email"
										label="Email"
										type="text"
										fullWidth
										className={classes.textField}
										variant="outlined"
										value={this.state.email}
										onChange={this.handleChange}
										/>

										<AffiliationSelector save={this.handleChange}/>

										<TextField
										name="comments"
										label="Comments"
										multiline
										rows="5"
										rowsMax="5"
										value={this.state.comments}
										onChange={this.handleChange}
										className={classes.textField}
										margin="dense"
										variant="outlined"
								        />
									</form>
									
									<Grid container direction="row" justify="space-between">
										<Grid item>
											<div className={classes.grow}> 
												{ this.state.errorMessage ? 
													<Typography color="error">
														Must provide name, email, and affiliation
													</Typography> : <div />}
											</div>
										</Grid>
										<Grid item>
											<Button className={classes.submit} variant="contained" color="primary" onClick={this.handleSubmit}>Sign</Button>
										</Grid>
									</Grid>
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

export default withStyles(styles)(Petition);
