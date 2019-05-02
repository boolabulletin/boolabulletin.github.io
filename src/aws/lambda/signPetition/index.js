const Busboy = require('busboy');
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

var result = {}; // Data pulled from received form

const getContentType = (event) => {
    const contentType = event.headers['content-type'];
    if (!contentType) {
        return event.headers['Content-Type'];
    }
    return contentType;
};

const parser = (event) => new Promise((resolve, reject) => {
    const busboy = new Busboy({
        headers: {
            'content-type': getContentType(event)
        }
    });

    busboy.on('field', (fieldname, value) => {
        result[fieldname] = value;
    });

    busboy.on('error', error => reject(error));
    busboy.on('finish', () => {
        event.body = result;
        resolve(event);
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
});

function saveSignature(event, context, callback) {
  parser(event).then(() => {
      var params = {
        TableName: 'Petition',
      Item: {
        name: result.name,
        email: result.email,
        affiliation: result.affiliation,
        comments: result.comments
    }
  };
  dynamo.put(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
      callback(null, {
        statusCode: '200',
        body: JSON.stringify(event),
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    })
    .catch(() => {
      // Handle upload errors
      callback(null, {
        statusCode: '500',
        body: JSON.stringify(event),
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    });
  });
}

exports.handler = (event, context, callback) => {
  saveSignature(event, context, callback);
};
