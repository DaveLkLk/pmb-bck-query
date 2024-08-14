import { DATA_UL } from "../template/template.js"
import { getMetaData } from "../fetch/fetch.js"
import { FetchIDData } from "../fetch/fetch.js"

export async function QueryIDWords(params){
    const {numWordsExist, numWordsNoExist, dataBD, dataUL, query, id} = params
    const req = await getMetaData(query, id)
    const res = await FetchIDData(req)
    const newUL = DATA_UL(res.vacios)
    const queryBD = DATA_UL(res.sql)
    console.log('-Respuesta del servidor-');
    console.log(res);
    numWordsExist.textContent = String(res.data.length)
    numWordsNoExist.textContent = String(res.vacios.length)
    dataUL.innerHTML = ''
    dataBD.innerHTML = ''
    dataUL.appendChild(newUL)
    dataBD.appendChild(queryBD)
    return
}