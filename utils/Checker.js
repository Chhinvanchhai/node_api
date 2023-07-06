const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });

exports.userExist = async (email) => {
    try{
        var params = {
            TableName: 'Website',
            IndexName: 'index_type_id',
            KeyConditionExpression: "#type = :type and begins_with(id,:id)",
            ExpressionAttributeNames: {
                '#type' : 'type'
            },
            FilterExpression: 'email = :email',
            ScanIndexForward: true,
            ExpressionAttributeValues: {
                ":id": "u-",
                ":type" : "User",
                ":email": email
            }
        };
        const result = await docClient.query(params).promise()
        if(result != ''){
            return result
        }else{
            return ''  
        }
    } catch (err) {
        console.error(err)
  }

}
