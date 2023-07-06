
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });

exports.createUserTable = (req , res , next) => {
    var tableName = "Users";
    var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
            { AttributeName: "email", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "email", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        },
        GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
            { 
                IndexName: 'index_email_id', 
                KeySchema: [
                    { // Required HASH type attribute
                        AttributeName: 'email',
                        KeyType: 'HASH',
                    },
                    { // Optional RANGE key type for HASH + RANGE secondary indexes
                        AttributeName: 'id', 
                        KeyType: 'RANGE', 
                    }
                ],
                Projection: { // attributes to project into the index
                    ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
                },
                ProvisionedThroughput: { // throughput to provision to the index
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10,
                },
            },
            // ... more global secondary indexes ...
        ]
    };
    

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

}

exports.updateUserTable = (req , res , next) => {
    var tableName = "Users";
    var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
            { AttributeName: "type", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "type", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        },
        GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
            { 
                IndexName: 'index_type_id', 
                KeySchema: [
                    { // Required HASH type attribute
                        AttributeName: 'id',
                        KeyType: 'HASH',
                    },
                    { // Optional RANGE key type for HASH + RANGE secondary indexes
                        AttributeName: 'type', 
                        KeyType: 'RANGE', 
                    }
                ],
                Projection: { // attributes to project into the index
                    ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
                },
                ProvisionedThroughput: { // throughput to provision to the index
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10,
                },
            },
            // ... more global secondary indexes ...
        ]
    };
    

    dynamodb.updateTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

}

exports.deleteUserTable = (req , res , next) => {
    var params = {
        TableName : "Users"
    };
    
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

exports.test = (req , res , next) => {
    res.status(200).json({
        success: "test",
    })
}
exports.createPostTable = (req , res , next) => {
    var tableName = "Website";
    var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
            { AttributeName: "type", KeyType: "RANGE" } , //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "type", AttributeType: "S" },
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        },
        GlobalSecondaryIndexes: [ 
            { 
                IndexName: 'index_type_id', 
                KeySchema: [
                    { // Optional RANGE key type for HASH + RANGE secondary indexes
                        AttributeName: 'type', 
                        KeyType: 'HASH', 
                    },
                    { // Required HASH type attribute
                        AttributeName: 'id',
                        KeyType: 'RANGE',
                    }
            
                ],
                Projection: { // attributes to project into the index
                    ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
                },
                ProvisionedThroughput: { // throughput to provision to the index
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10,
                },
            },
            // ... more global secondary indexes ...
        ]
    };
    

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}
exports.deletePostTable  = (req , res , next) => {
    var params = {
        TableName : "Posts"
    };
    
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}