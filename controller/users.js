
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {userExist} = require('../utils/Checker') 
exports.findUser = async (req, res , next) =>{

}
exports.postNewUser =  async (req , res , next) =>{

}
exports.updateUser =  async (req , res , next) =>{

}
exports.deleteUser =  async (req , res , next) =>{

}
