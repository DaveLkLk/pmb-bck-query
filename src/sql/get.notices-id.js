const db = require('../db.js')
async function sql_ID_NOTICE(data){
    const { word } = data
    const sql = 'SELECT notice_id FROM notices WHERE LOWER(tit1) LIKE ?'
    const [result] = await db.query(sql, word)
    if(result.length > 0){
        let dato = result[0].notice_id
        return {id: dato, isdata: true}
    }else{
        return {failed: '000', isdata: false}
    }
}

module.exports = {
    sql_ID_NOTICE
}