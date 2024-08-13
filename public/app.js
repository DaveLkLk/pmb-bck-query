import {doubleMetaphone} from 'https://esm.sh/double-metaphone@2?bundle'
function LongText(value) {
    const arr = value
        .trim() // Quita los espacios de sobra al inicio y final
        .replace(/[\n;,.!?\-(){}[\]'"`]/g, '') // Quita los saltos de línea y símbolos específicos
        .replace(/\s{1,}/g, '')
        
    return arr.length;
}
function SplitText(value) {
    const arr = value
        .toLowerCase()
        .trim()
        .replace(/[\n;,:=._!?\-(){}[\]'"`]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .filter(word => word.length > 0);
    const uniqueWords = [...new Set(arr)];
    return uniqueWords;
}

async function FetchData(query){
    try {
        const response = await fetch('http://localhost:5001/db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(query)
        })
        if(!response.ok){
            throw new Error('ERROR Server - Bad Request')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
async function FetchIDData(query){
    try {
        const response = await fetch('http://localhost:5001/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        if(!response.ok) throw new Error('ERROR Server - Bad Request')
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
async function FetchCode(text, id){
    const [primary, secondary] = doubleMetaphone(text)
    const res = {
        word: text,
        id_libro: id,
        primary: primary.slice(0,4),
        secondary: secondary.slice(0,4),
        full: `${primary.slice(0,4)} ${secondary.slice(0,4)}`
    }
    return res
}
async function getMetaData(arr, id){
    const response = []
    arr.forEach( async (element) => {
        const code = await FetchCode(element, id)
        element = code
        response.push(element)
    });
    return response
}

// CREATE DATA UL
function DATA_UL(data){
    const ul = document.createElement('ul')
    data.forEach(item => {
        let li = document.createElement('li')
        li.textContent = item.sql
        ul.appendChild(li)
    })
    return ul
}

const form = document.getElementById('form_submit')
const input = document.getElementById('txt_query')
const idItem = document.getElementById('id-item')
const typeQuery = document.getElementById('sql-tables')
const dataUL = document.getElementById('data-ul')
const numWordsExist = document.getElementById('existe-num')
const numWordsNoExist = document.getElementById('noexiste-num')

async function CreateInsertSQL(query, id){
    const req =  await getMetaData(query, id)
    const res = await FetchData(req)
    const newUL = DATA_UL(res.noExiste)
    numWordsExist.textContent = String(res.existe.length)
    numWordsNoExist.textContent = String(res.noExiste.length)
    dataUL.innerHTML = ''
    dataUL.appendChild(newUL)
    console.log('-Respuesta del dervidor-');
    console.log(res)
}
async function QueryIDWords(query, id){
    const req = await getMetaData(query, id)
    const res = await FetchIDData(req)
    const newUL = DATA_UL(res.vacios)
    console.log('-Respuesta del dervidor-');
    console.log(res);
    numWordsExist.textContent = String(res.data.length)
    numWordsNoExist.textContent = String(res.vacios.length)
    dataUL.innerHTML = ''
    dataUL.appendChild(newUL)
}

form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const value = input.value
    const itemID = idItem.value
    if(!value || !itemID) return;
    if(typeQuery.value === '0') return;
    const query = SplitText(value)
    console.log('-Request que envia el cliente-');
    console.log(query);
    value && typeQuery.value==='1' ? await CreateInsertSQL(query, itemID) : null
    value && typeQuery.value==='2' ? await QueryIDWords(query, itemID) : null
})
form.addEventListener('reset', ()=>{
    numWordsExist.textContent = ''
    numWordsNoExist.textContent = ''
    dataUL.innerHTML = ''
})

