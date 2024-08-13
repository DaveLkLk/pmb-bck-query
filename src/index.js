const express = require('express');
const router = express.Router();
const db = require('./db.js');

async function createQueryWords(value, code){
    let sql = `INSERT INTO words (word, lang, double_metaphone, stem) VALUES ('${value}', 'es_ES', '${code}', '${value}');`
    return sql;
}

async function SearchWord(words) {
    const existen = [];
    const no_existen = [];

    for (const word of words) {
        try {
            const [result] = await db.query('SELECT word FROM words WHERE word = ?', [word.word]);
            console.log(result);
            if (result.length > 0) {
                existen.push({ word:word.word, exists: true });
            } else {
                let insert = await createQueryWords(word.word, word.full)
                no_existen.push({ word: insert, exists: false });
            }
        } catch (error) {
            console.error('Error en la consulta para la palabra:', word, error);
            throw error; // Re-lanza el error para que sea capturado en el bloque catch de la ruta
        }
    }
    return { existe: existen, noExiste: no_existen };
}
async function GetIDWords(arr){
    let response = []
    let empty = []
    for(const mot of arr){
        try {
            let sql = `SELECT id_word, word FROM words WHERE word LIKE ? AND lang LIKE 'es_ES'`
            const [result] = await db.execute(sql, [`${mot.word}`]);
            if(result.length > 0) response.push(...result)
            else{
                let insert = await createQueryWords(mot.word, mot.full)
                empty.push({word: mot.word, sql: insert})
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {data: response, vacios: empty};
}

router.get('/db', (_, res) => {
  res.json({hi: 'hola mundo'});

});
router.post('/db', async (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Se esperaba un array de palabras.' });
    }
    const query = req.body
    const data = await SearchWord(query)
    res.json(data)
});
router.post('/bookID', async(req, res)=>{
    const {word} = req.body
    console.log(req.body);
    const sql = 'SELECT notice_id FROM notices WHERE LOWER(tit1) LIKE ?'
    const [result] = await db.query(sql, word)
    console.log(result);
    if(result.length > 0){
        let dato = result[0].notice_id
        res.json({id: dato, isdata: true})
    }else{
        res.json({failed: '00000', isdata: false})
    }
})
router.post('/words', async (req, res)=>{
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Se esperaba un array de palabras.' });
    }
    const response = await GetIDWords(req.body)
    res.json(response)
})


module.exports = router;