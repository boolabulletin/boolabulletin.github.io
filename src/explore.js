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

function uploadFlyer(data) {
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

class FileInput extends React.Component {
  constructor(props) {
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
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

    uploadFlyer(data);
  }

  render() {
    // highlight-range{5}
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

// function getFlyer(fileName) {
// 	var image = new Image();
// 	fetch('https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/get-flyer?flyer=flyer3.jpg')
// 	.then(response => {
// 		console.log(response);
// 		const reader = response.body.getReader();
// 		return new ReadableStream({
// 			start(controller) {
// 				return pump();
// 				function pump() {
// 					return reader.read().then(({ done, value }) => {
// 						// When no more data needs to be consumed, close
// 						if (done) {
// 							controller.close();
// 							return;
// 						}
// 						// Enqueue the next data chunk into our target stream
// 						controller.enqueue(value);
// 						return pump();
// 					});
// 				}
// 			}  
// 		})
// 	})
// 	.then(stream => new Response(stream))
// 	.then(response => {
// 		console.log(response);
// 		var blob = response.blob();
// 		return blob;
// 	})
// 	.then(blob => {
// 		console.log(blob);
// 		return URL.createObjectURL(blob);
// 	})
// 	.then(url => fetch(url))
// 	.then(res => res.json().Body.data)
// 	.then(array => new Blob(array, {type: "image/jpeg"}))
// 	.then(b => URL.createObjectURL(b))
// 	.then(u => image.src = u)
// 	.catch(error => console.error(error));
// 	document.body.appendChild(image);
// }

// var gottenFlyer;

// function getFlyer(file) {
// 	const GATEWAY_URL = 'https://n03f9idwte.execute-api.us-east-1.amazonaws.com/prod/get-flyer';
// 	gottenFlyer = fetch(GATEWAY_URL, {});
// }

var fileNames = [];

async function getFlyers(boardName, callback, startKey) {
  var AWS = require('aws-sdk');
  AWS.config.update({
        accessKeyId: 'AKIAIW3FKMAYXQEW7GCQ',
        secretAccessKey: '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',
        region: 'us-east-1'
      });

      var S3 = new AWS.S3({params: {Bucket: 'boola-bulletin-flyers'}});
      var Dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
  let params = {
    TableName: 'Flyers',
    ProjectionExpression: 'file_path',
    KeyConditionExpression: 'board = :boardName',
    ExpressionAttributeValues: {
      ":boardName": boardName
    },
    ExclusiveStartKey: startKey,
  }

  Dynamo.query(params, function (err, data) {
    if (err) {
      return callback(err);
    }

    data.Items.map((item) => fileNames.push(item.file_path));
    console.log(fileNames);

    // if (data.LastEvaluatedKey) { // there are more pages to fetch
    //   // Soon ECMA6 will have tail call optimization :D
    //   return getFlyers('Yale', callback, data.LastEvaluatedKey);
    // } else {
    //   return callback(null);
    // }
  })
}

async function ExploreGridList(props) {
  const { classes } = props;
  // var formData = new FormData();
  // // var photo = {
  // //   uri: './flyers/flyer1.jpg',
  // //   type: 'jpg',
  // //   name: pictureSource.fileName,
  // // };
  // var photo = {
  //   uri: './flyers/flyer1.jpg',
  //   type: 'img/jpeg',
  //   name: 'flyer1',
  // };
  // formData.append('pic', './flyers/flyer1.jpg');  <img src={gottenFlyer} />
  // uploadFlyer(formData);
  await getFlyers('Yale', function(err) {
      if (err) {
        //console.log(err);
        this.setState({gotten: true});
      }
    });
  return (
    <React.Fragment>
    <FileInput />
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid container spacing={32}>
        {fileNames.map(flyerPath => (
          <Grid item key={flyerPath} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
            {console.log('https://s3.amazonaws.com/boola-bulletin-flyers/' + flyerPath)}
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

ExploreGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExploreGridList);

