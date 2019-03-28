exports.getFlyers = function(event, context, callback) {
  var params = {
    TableName: process.env.TABLE_NAME,
    // FilterExpression: 'contains (myKey , :query)',
    // ExpressionAttributeValues: {
    //   ':query': query
    // }
  };

  var dynamoScan = new Promise(function(resolve, reject) {
    var results = [];
    var onScan = (err, data) => {
      if (err) {
        return reject(err);
      }
      results = results.concat(data.Items);
      // if (typeof data.LastEvaluatedKey != 'undefined') {
      //   params.ExclusiveStartKey = data.LastEvaluatedKey;
      //   Dynamo.scan(params, onScan)
      // } else {
      //   return resolve(results)
      // }
      return resolve(results);
    };
    Dynamo.scan(params, onScan);
  });
  dynamoScan
    .then((results) => {
      console.log(JSON.stringify(results));
      callback(null, {
        statusCode: '200',
        body: JSON.stringify(results),
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
