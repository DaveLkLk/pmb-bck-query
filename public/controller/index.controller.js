import { CreateInsertSQL } from "./get.words.js"
import { QueryIDWords } from "./get-mots-words.js"

export async function CONTROLLER_SELECT(value, params){
    if(value === '1'){
        await CreateInsertSQL(params)
        return
    }
    if(value === '2'){
        await QueryIDWords(params)
    }
    else{
        console.log('OPCION NO VALIDA');
    }
}