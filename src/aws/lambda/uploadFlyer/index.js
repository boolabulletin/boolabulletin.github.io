const Busboy = require('busboy');

var result = {}; // Data pulled from received form
const bucketName = "boola-bulletin-flyers"; // dynamically generate later

function generateId(length, fileName) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	console.log("Text: " + text);
	console.log("File: " + fileName);
	return text + "-" + fileName;
}

const getContentType = (event) => {
    const contentType = event.headers['content-type']
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

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        file.on('data', data => {
            result.file = data;
        });

        file.on('end', () => {
            result.filename = filename;
            result.contentType = mimetype;
        });
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

const uploadFile = (buffer) => new Promise((resolve, reject) => {
  const fileName =  generateId(5, result.filename);
  result.key = fileName;
  const data = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
  };
  s3.putObject(data, (error) => {
    if (!error) {
      resolve('success');
    } else {
      reject(new Error('error during put'));
    }
  });
});

function uploadFlyer(event, context, callback) {
  parser(event).then(() => {
    uploadFile(event.body.file)
    .then(() => {
      // Handle successful upload
      var params = {
		TableName: 'Flyers',
		Item: {
			board: 'Yale',
			file_path: result.key
		}
	}
	dynamo.put(params, context.done);
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
	uploadFlyer(event, context, callback);
};
