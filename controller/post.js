var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const table = "Website";
exports.post = (req,res,next) => {
    let search_key =  req.body.title.toLowerCase()+ ' '+req.body.feature.toLowerCase()+ ' '+ req.body.title_kh+ ' '+req.body.feature_kh;
    var params = {
        TableName:table,
        Item:{
            "id" : "p-"+uuidv4(),
            "title" : req.body.title,
            "feature": req.body.feature,
            "content": req.body.content,
            "title_kh" : req.body.title_kh,
            "feature_kh": req.body.feature_kh,
            "content_kh": req.body.content_kh,
            "search_key":search_key,
            "type" :  req.body.type,
            "user_id": req.userId,
            "product": req.body.product,
            "topic": req.body.topic,
            "image": req.body.image,
            "status": req.body.status,
            "category_type": req.body.category_type,
            "createdBy": req.body.created_by,
            "updateddBy": req.body.updated_by,
            "createdAt" : new Date().getTime(),
            "updatedAt" : new Date().getTime()
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
                data: data
            })
        }
    });
  
}
exports.getPost = async (req,res,next) => {
    console.log("data",Object.keys(req.query).length )
    try{
        let filter
        let filter_value ={
            ":id": "p-",
            ":type" : "Guide",
        } 
        let params
        if(Object.keys(req.query).length != 0){
            if(req.query.topic !='' || req.query.category_type !='' || req.query.product !=''){
                if(req.query.topic !='' && req.query.category_type !='' && req.query.product !=''  ){
                    filter = 'topic = :topic AND category_type = :category_type AND product = :product'
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":topic": req.query.topic,
                        ":category_type": req.query.category_type,
                        ":product": req.query.product
                    } 

                }else if(req.query.topic !='' && req.query.category_type !=''){
                    filter = 'topic = :topic AND category_type = :category_type';
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":topic": req.query.topic,
                        ":category_type": req.query.category_type,
                    } 
                }else if(req.query.topic !='' && req.query.product !=''){
                    filter = 'topic = :topic  AND product = :product';
                    filter_value = { 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":topic": req.query.topic,
                        ":product": req.query.product,
                    } 

                }else if(req.query.category_type !='' &&  req.query.product !=''){
                    filter = 'category_type = :category_type AND product = :product'
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":category_type": req.query.category_type,
                        ":product": req.query.product,
                    } 
                }else if(req.query.topic !=''){
                    filter = 'topic = :topic';
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":topic": req.query.topic,
                    } 
                }else if(req.query.category_type !=''){
                    filter = 'category_type = :category_type';
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":category_type": req.query.category_type,
                    } 
                }else if(req.query.product !=''){
                    filter = 'product = :product';
                    filter_value ={ 
                        ":id": "p-",
                        ":type" : "Guide",
                        ":product": req.query.product,
                    } 
                }
                console.log("Filter Option", filter, filter_value)
                params = {
                    TableName: 'Website',
                    IndexName: 'index_type_id',
                    KeyConditionExpression: "#type=:type and begins_with(id,:id)",
                    ScanIndexForward: true,
                    FilterExpression: filter,
                    ExpressionAttributeNames: {
                        '#type' : 'type'
                    },
                    ExpressionAttributeValues: filter_value
                }
            }else{
                params = {
                    TableName: 'Website',
                    IndexName: 'index_type_id',
                    KeyConditionExpression: "#type=:type and begins_with(id,:id)",
                    ScanIndexForward: true,
                    ExpressionAttributeNames: {
                        '#type' : 'type'
                    },
                    ExpressionAttributeValues: {
                        ":id": "p-",
                        ":type" : "Guide"
                    }
                } 
            }
        }else{
            params = {
                TableName: 'Website',
                IndexName: 'index_type_id',
                KeyConditionExpression: "#type=:type and begins_with(id,:id)",
                ScanIndexForward: true,
                ExpressionAttributeNames: {
                    '#type' : 'type'
                },
                ExpressionAttributeValues: {
                    ":id": "p-",
                    ":type" : "Guide"
                }
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

exports.search = async (req,res,next) => {
    console.log("data", req.query)
    try{
        let search_key = req.query.key.toLowerCase();
   
        let  params = {
                TableName: 'Website',
                IndexName: 'index_type_id',
                KeyConditionExpression: "#type=:type and begins_with(id,:id)",
                FilterExpression: " contains(search_key,:search_key) AND status =:status ",
                ExpressionAttributeNames: {
                    '#type' : 'type'
                },
                ExpressionAttributeValues: {
                    ":id": "p-",
                    ":type" : "Guide",
                    ":search_key": search_key,
                    ":status": 'Public'
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


exports.deletePost = async (req,res,next) =>{
    try{
        var params = {
            TableName: 'Website',
            Key: { // The primary key of the item (a map of attribute name to AttributeValue)
                "id": req.body.id,
                "type": req.body.type //(string | number | boolean | null | Binary)
            },
            // KeyConditionExpression: "#type=:type and id =:id",
            // ScanIndexForward: true,
            // ExpressionAttributeNames: {
            //     '#type' : 'type'
            // },
            // ExpressionAttributeValues: {
            //     ":id": req.body.id,
            //     ":type" : req.body.type
            // }
        };
        const result = await docClient.delete(params).promise()
        if(result != ''){
            res.status(200).json({
                status: "SUCCESS",
            })
        }else{
            res.status(400).json({
                status: "FAILDED",
            }) 
        }
    } catch (err) {
        console.error(err)
    }
}

exports.updatePost = (req,res,next) => {
    let search_key =  req.body.title.toLowerCase()+ ' '+req.body.feature.toLowerCase()+ ' '+ req.body.title_kh+ ' '+req.body.feature_kh;
    var params = {
        
        TableName: table,
        Key: { // The primary key of the item (a map of attribute name to AttributeValue)
            "id": req.body.id,
            "type": req.body.type //(string | number | boolean | null | Binary)
        },
        UpdateExpression: 'SET title = :title, content = :content, feature = :feature, topic = :topic, product= :product, category_type = :category_type, image = :image, title_kh=:title_kh,feature_kh=:feature_kh, content_kh=:content_kh, search_key=:search_key,status=:status,updatedBy=:updatedBy ',
        ExpressionAttributeValues: {
            ':title'  : req.body.title,
            ':content': req.body.content,
            ':feature': req.body.feature,
            ':topic'  : req.body.topic,
            ':image'  : req.body.image,
            ':product': req.body.product,
            ':search_key' : search_key,
            ':category_type': req.body.category_type,
            ":title_kh" : req.body.title_kh,
            ":feature_kh": req.body.feature_kh,
            ":content_kh": req.body.content_kh,
            ":status": req.body.status,
            ":updatedBy": req.body.updated_by,
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
}

exports.addType = (req,res,next) => {
    var params = {
        TableName:table,
        Item:{
            "id" : "t-"+uuidv4(),
            "category" : req.body.category,
            "category_type": req.body.category_type,
            "description": req.body.description,
            "type" : "Category",
            "user_id": req.userId,
            "createdAt" : new Date().getTime(),
            "updatedAt" : new Date().getTime()
            },
        ReturnValue: 'ALL_OLD',
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
                data: data
            })
        }
    });
  
}
exports.getType = async (req,res,next) => {
    try{
        var params = {
            TableName: 'Website',
            IndexName: 'index_type_id',
            KeyConditionExpression: "#type=:type and begins_with(id,:id)",
            ScanIndexForward: true,
            ExpressionAttributeNames: {
                '#type' : 'type'
            },
            ExpressionAttributeValues: {
                ":id": "t-",
                ":type" : "Category"
            }
        };
        const result = await docClient.query(params).promise()
        if(result != ''){
            res.status(200).json({
                status: "SUCCESS",
                data: result
            })
        }else{
            res.status(400).json({
                status: "FAILDED",
                data: result
            }) 
        }
    } catch (err) {
        console.error(err)
  }

}
exports.updateType = (req,res,next) => {
    var params = {
        TableName: table,
        Key: { // The primary key of the item (a map of attribute name to AttributeValue)
            "id": req.body.id,
            "type": req.body.type //(string | number | boolean | null | Binary)
        },
        UpdateExpression: 'SET category = :category, category_type = :category_type, description = :description ',
        ExpressionAttributeValues: {
            ':category'  : req.body.category,
            ':category_type': req.body.category_type,
            ':description': req.body.description
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
}
exports.getOneType = async (req,res,next) => {
    try{
        var params = {
            TableName: 'Website',
            Key: { // The primary key of the item (a map of attribute name to AttributeValue)
                "id": req.body.id,
                "type": req.body.type //(string | number | boolean | null | Binary)
            },
        };
        const result = await docClient.get(params).promise()
        if(result != ''){
            res.status(200).json({
                status: "SUCCESS",
                data: result
            })
        }else{
            res.status(400).json({
                status: "FAILDED",
                data: result
            }) 
        }
    } catch (err) {
        console.error(err)
  }

}