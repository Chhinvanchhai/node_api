var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const table = "settings-dev";
checkExistForm = async (req,res) => {

    try{
        let params = {
            TableName: table,
            IndexName: 'GSI1',
            KeyConditionExpression: "sk =:sk and pk= :pk",
            FilterExpression: "formType =:formType",
            ExpressionAttributeValues: {
                ":pk": req.body.sk,
                ":sk" : req.body.sk,
                ":formType": req.body.formType,
            }
        }
        const result = await docClient.query(params).promise()
        if(result != ''){
            return true
        }else{
            return false  
        }
    } catch (err) {
        console.error(err)
        return false
  }
};
exports.post_form = async (req,res,next) => {
    let is_have = await checkExistForm(req,res);
    if(is_have){
        console.log("update", is_have)
        var params = {
            TableName: table,
            Key: { // The primary key of the item (a map of attribute name to AttributeValue)
                "pk": req.body.pk,
                "sk": req.body.sk //(string | number | boolean | null | Binary)
            },
            UpdateExpression: 'SET settings = :settings, updatedAt= :updatedAt ',
            ExpressionAttributeValues: {
                ':settings'  : req.body.settings,
                ':updatedAt' : new Date().toJSON()
            }
        }
        docClient.update(params, function(err, data) {
            if (err) {
                res.json({
                    status: "FAILD",
                    error: err
                })
            } else {
                res.json({
                    status: "SUCCESS",
                    data: data
                })
            }
        });
    }else{
        let pk_gen = "form-"+uuidv4()
        var params = {
            TableName:table,
            Item:{
                    "pk" : pk_gen,
                    "sk" : req.body.institute,
                    "type": req.body.type,
                    "formType": req.body.formType,
                    "settings": req.body.settings,
                    "createdAt" : new Date().toJSON(),
                    "updatedAt" : new Date().toJSON()
                },
        }
        docClient.put(params, function(err, data) {
            if (err) {
                res.json({
                    status: "FAILD",
                    error: err
                })
            } else {
                res.status(200).json({
                    status: "SUCCESS",
                    data: {
                        pk: pk_gen,
                        sk: req.body.institute
                    }
                })
            }
        });
    }
}
exports.getForm = async (req,res,next) => {
    try{  
        let  params = {
                TableName: table,
                IndexName: 'GSI1',
                KeyConditionExpression: "sk=:sk and begins_with(pk,:pk)",
                FilterExpression: " formType = :formType ",
                // ExpressionAttributeNames: {
                //     '#type' : 'type'
                // },
                ExpressionAttributeValues: {
                    ":pk": "form-",
                    ":sk" : req.query.institute,
                    ":formType": req.query.formType,
                }
            }
        
        const result = await docClient.query(params).promise()
        if(result != ''){
            res.status(200).json({
                status: "SUCCESS",
                data: result
            })
        }else{
            res.status(200).json({
                status: "SUCCESS",
                data: result
            }) 
        }
    } catch (err) {
        console.error(err)
  }

}
