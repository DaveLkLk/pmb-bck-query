const express = require('express');
const router = express.Router();
const db = require('./db.js');
const { queryMotsGlobalIndex} = require('./functions.js');
const { sql_ID_NOTICE } = require('./sql/get.notices-id.js');
const { sql_ID_WORD } = require('./sql/get.word-id.js');



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
                no_existen.push({ word: word.word,sql: insert, exists: false });
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
            const result = await sql_ID_WORD(mot)
            !result.exist ? empty.push(result):'';
            response.push(result)
        } catch (error) {
            console.log(error);
        }
    }
    const valueMots = queryMotsGlobalIndex(response);
    return {data: response, newWords: empty, mots: valueMots};
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
    console.log(req.body);
    const result = await sql_ID_NOTICE(req.body)
    res.json(result)
})
router.post('/words', async (req, res)=>{
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Se esperaba un array de palabras.' });
    }
    const response = await GetIDWords(req.body)
    res.json(response)
})


module.exports = router;