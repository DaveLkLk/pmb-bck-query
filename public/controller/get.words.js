import { getMetaData } from "../fetch/fetch.js"
import { FetchData } from "../fetch/fetch.js"
import { DATA_UL } from "../template/template.js"

export async function CreateInsertSQL(params){
    try {
        const {numWordsExist, numWordsNoExist, dataBD, dataUL, query, id} = params
        const req =  await getMetaData(query, id)
        const res = await FetchData(req)
        const newUL = DATA_UL(res.noExiste)
        numWordsExist.textContent = String(res.existe.length)
        numWordsNoExist.textContent = String(res.noExiste.length)
        dataUL.innerHTML = ''
        dataBD.innerHTML = ''
        dataUL.appendChild(newUL)
        console.log('-Respuesta del servidor-');
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}