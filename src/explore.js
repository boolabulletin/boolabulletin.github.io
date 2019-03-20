import React, { Component } from 'react';
import './explore.css';

var flyer1 = require("./flyers/flyer1.jpg");
var flyer2 = require("./flyers/flyer2.jpg");
var flyer3 = require("./flyers/flyer3.jpg");
var flyer4 = require("./flyers/flyer4.jpg");
var flyer5 = require("./flyers/flyer5.jpg");
var flyer6 = require("./flyers/flyer6.jpg");
var flyer7 = require("./flyers/flyer7.jpg");

class Explore extends Component {
	render() {
		return (
			<div className="Explore">
				<img src={ flyer1 } className="Explore-flyer" />
				<img src={ flyer2 } className="Explore-flyer" />
				<img src={ flyer3 } className="Explore-flyer" />
				<img src={ flyer4 } className="Explore-flyer" />
				<img src={ flyer5 } className="Explore-flyer" />
				<img src={ flyer6 } className="Explore-flyer" />
				<img src={ flyer7 } className="Explore-flyer" />
				<img src={ flyer1 } className="Explore-flyer" />
				<img src={ flyer1 } className="Explore-flyer" />
				<img src={ flyer2 } className="Explore-flyer" />
				<img src={ flyer3 } className="Explore-flyer" />
				<img src={ flyer4 } className="Explore-flyer" />
				<img src={ flyer5 } className="Explore-flyer" />
				<img src={ flyer6 } className="Explore-flyer" />
				<img src={ flyer7 } className="Explore-flyer" />
				<img src={ flyer1 } className="Explore-flyer" />
				<img src={ flyer1 } className="Explore-flyer" />
				<img src={ flyer2 } className="Explore-flyer" />
				<img src={ flyer3 } className="Explore-flyer" />
				<img src={ flyer4 } className="Explore-flyer" />
				<img src={ flyer5 } className="Explore-flyer" />
				<img src={ flyer6 } className="Explore-flyer" />
				<img src={ flyer7 } className="Explore-flyer" />
				<img src={ flyer1 } className="Explore-flyer" />
			</div>
		);
	}
}

export default Explore;
