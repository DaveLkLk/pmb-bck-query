import { FetchTablesBook, getMetaData } from "../fetch/fetch.js"

export async function ManagerNoticesQuery(){
    try {
        console.log(params);
        const {numWordsExist, numWordsNoExist, dataBD, dataUL, query, id} = params
        const req = await getMetaData(query, id)
        const res = await FetchTablesBook(req)
    } catch (error) {
        console.log(error);
    }

}