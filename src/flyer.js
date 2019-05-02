import React from 'react';
import {
	CardActionArea,
	Card,
	CardMedia
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FlyerModal from './modal.js';

const styles = themes => ({
	card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
  },
  cardMedia: {
    paddingTop: '130%',
  }
});

class Flyer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen() {
		this.setState({open: true});
	}

	handleClose () {
		this.setState({open: false});
	}
	
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<CardActionArea onClick={this.handleOpen}>
					<Card className={classes.card}>
			          <CardMedia
			            className={classes.cardMedia}
			            image={this.props.data.file_path}
			          />
			        </Card>
		        </CardActionArea>
		        <FlyerModal open={this.state.open} onClose={this.handleClose} data={this.props.data} />
		    </React.Fragment>
		);
	}
}

export default withStyles(styles)(Flyer);
