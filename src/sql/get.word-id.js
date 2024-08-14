const db = require('../db.js')

async function createQueryWords(id_word,value, code){
    let sql = `INSERT INTO words (id_word,word, lang, double_metaphone, stem) VALUES ('${id_word}','${value}', 'es_ES', '${code}', '${value}');`
    return sql;
}
async function sql_ID_WORD(data){
    try {
        const { word, id_libro, full } = data
        let exist= true;
        let id_word= '';
        let sql = `SELECT id_word, word FROM words WHERE word LIKE ? AND lang LIKE 'es_ES';`
        const [result] = await db.execute(sql, [word]);
        if(result.length == 0) {
            sql = `SELECT max(id_word)+1 id_word FROM words;`;
            const [resultd] = await db.execute(sql);
            id_word= resultd[0].id_word;
            let insert = await createQueryWords(id_word,word, full)
            exist= false;
        }
        else{
            id_word=result[0].id_word;
        }
        const res = {
            id_word: id_word,
            word: word,
            id_book: id_libro,
            exist: exist,
        }
        return res
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    sql_ID_WORD
}