// 连接mongodb
let MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/parctice'

// 导入
module.exports = async function() {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    console.log('connect success...')
    db = client.db('parctice')
    return db
}