const db = require('../db.js')

async function createQueryWords(value, code){
    let sql = `INSERT INTO words (word, lang, double_metaphone, stem) VALUES ('${value}', 'es_ES', '${code}', '${value}');`
    return sql;
}
async function sql_ID_WORD(data){
    try {
        const { word, id_libro, full } = data
        let sql = `SELECT id_word, word FROM words WHERE word LIKE ? AND lang LIKE 'es_ES';`
        const [result] = await db.execute(sql, [word]);
        if(result.length > 0) {
            const data = {
                id_word: result[0].id_word,
                word: result[0].word,
                id_book: id_libro,
                exist: true,
            }
            return data
        }else{
            let insert = await createQueryWords(word, full)
            return {word, sql: insert, exist: false}
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    sql_ID_WORD
}