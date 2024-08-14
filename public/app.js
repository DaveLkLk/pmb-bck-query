import { FetchIDBook } from './fetch/fetch.js';
import { SplitText } from './cleanText/clean.js';
import { CONTROLLER_SELECT } from './controller/index.controller.js';

// GET ELEMENTS OF PRINCIPAL PAGE 🔻
const form = document.getElementById('form_submit')
const input = document.getElementById('txt_query')
const idItem = document.getElementById('id-item')
const typeQuery = document.getElementById('sql-tables')
const dataUL = document.getElementById('data-ul')
const dataBD = document.getElementById('bd-data')
const numWordsExist = document.getElementById('existe-num')
const numWordsNoExist = document.getElementById('noexiste-num')

// EVENTS
input.addEventListener('blur', async ()=>{
    if(!input.value) return
    let value = input.value.toLowerCase().trim()
    let res = await FetchIDBook({word: value})
    // console.log('Respuesta del servidor');
    // console.log(res);
    idItem.value = res.isdata ? String(res.id) : String(res.failed)
})
form.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const value = input.value
    const itemID = idItem.value
    if(!value || !itemID) return;
    if(typeQuery.value === '0') return;
    const query = SplitText(value)
    console.log('-Request que envia el cliente-');
    console.log(query);
    const objHTML = {
        numWordsExist,
        numWordsNoExist, 
        dataUL,
        dataBD,
        query,
        id: itemID
    }
    value ? await CONTROLLER_SELECT(typeQuery.value, objHTML) : null
})
form.addEventListener('reset', ()=>{
    numWordsExist.textContent = ''
    numWordsNoExist.textContent = ''
    dataUL.innerHTML = ''
})

