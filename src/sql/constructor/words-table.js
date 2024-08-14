const db = require('../../db.js')

async function sql_GET_IDWORD_by_WORD(word){
    if(word === '') return {success: false, data: 'null',msg: 'Campo vacio'}
    const sql = `SELECT id_word, word FROM words WHERE word LIKE ? AND lang LIKE 'es_ES';`
    const [result] = await db.execute(sql, [word]);
    if(result.length > 0){
        return {success: true, data: result[0], msg: 'Query Successfull'}
    }else{
        return { success: false, data: word, msg: `no existe word en words: ${word}`}
    }
}
async function sql_FOR_GET_IDWORD(arr){
    let data = [];
    let empty = [];
    for(let i = 0; i < arr.length; i++){
        let word = arr[i] //cada palabra
        const result = await sql_GET_IDWORD_by_WORD(word)
        const resObj = result.data
        const obj = { success: result.success, msg: result.msg, id_word: resObj.id_word, word: resObj.word}
        result.success ? data.push(obj) : empty.push(result)
    }
    return {data, empty};
}
async function sql_INSERT_WORDS_by_WORD(data){
    const { word, code} = data
    // ✅ id_word es AUTO_INCREMENT
    const sql = 'INSERT INTO words (word, lang, double_metaphone, stem) VALUES (?, "es_ES", ?, ?)';
    const [ result ] = await db.execute(sql, [word, code, word])
    if(result.affectedRows > 0){
        const obj = {
            msg: 'Consulta realizada con exito',
            success: true,
            sql: `ID insertado: ${result.insertId}`
        }
        return obj
    }else{
        return {msg: 'No se realizo la consulta', success: false, word}
    }
}
async function sql_FOR_WORD_NO_EXIST(arr){
    let response = [];
    for(let i = 0; i < arr.length; i++){
        const result = await sql_INSERT_WORDS_by_WORD(arr[i])
    }
}

module.exports = {
    sql_FOR_GET_IDWORD,
    sql_GET_IDWORD_by_WORD,
    sql_INSERT_WORDS_by_WORD
}