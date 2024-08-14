const db = require('../../db.js')

function CleanText(value) {
    const arr = value
        .toLowerCase()
        .trim()
        .replace(/[\n;,:=._!?\-(){}[\]'"`]/g, ' ')
        .replace(/\s{2,}/g, ' ')
    return arr;
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

// OBTENER NOMBRE DE EDITORIAL POR ID
async function sql_GET_EDITORIAL_by_ID(id){
    try {
        if(id === 0) return {data: `El id es cero o es inválido`, success: false, sql: `ID consultado: ${id}`}
        const sql = `SELECT ed_name FROM publishers where ed_id = ?`;
        const [result] = await db.execute(sql, [id])
        if(result.length > 0){
            const response = {data: result[0].ed_name, success: true, sql: `ID consultado: ${id}`}
            return response
        }else{
            const empty = {success: false, data: 'QUERY FAILED'}
            return empty
        }
        
    } catch (error) {
        console.log(error);
    }
}
async function sql_GET_DATA_NOTICES(num_notice){
    try {
        if(Number(num_notice) === 0) return {data: `El id es cero o es inválido`, success: false, sql: `ID consultado: ${id}`}
        // SE IGNORA AL AUTOR DEL LIBRO :/
        const sql = `SELECT tit1, tit2, tit3, tit4, n_resume, n_gen, n_contenu,index_l, ed1_id FROM notices WHERE notice_id = ?`;
        const [ result ] = await db.execute(sql, [num_notice])
        if(result.length > 0){
            const data = result[0]
            const res_editorial = await sql_GET_EDITORIAL_by_ID(data.ed1_id)
            const editorialName = res_editorial.success ? res_editorial.data : ''
            const concat = `${data.tit1} ${data.tit2} ${data.tit3} ${data.tit4} ${data.n_resume} ${data.n_gen} ${data.n_contenu} ${data.index_l} ${editorialName}`
            const response = {success: true, data: concat, obj: data}
            return response;
        }else{
            return {success: false}
        }
    } catch (error) {
        console.log(error);
    }
}

// ✅TABLA NOTICES_GLOBAL_INDEX✅ CONCATENACION DE STRING PARA EL CAMPO INDEX_INFOS
async function sql_CONCAT_INDEX_INFOS(data){
    const { num_notice } = data
    const result = await sql_GET_DATA_NOTICES(num_notice)
    if(result.success){
        return result;
    }else{
        const empty = { success: false, data: 'CONCAT_INDEX_INFOS() -> QUERY FAILED'}
        console.log(empty);
        return empty
    }
}
async function sql_CONCAT_INDEX_INFOS_GLOBAL(data){
    const { num_notice } = data
    const result = await sql_GET_DATA_NOTICES(num_notice)
    if(result.success){
        const { success, data, obj} = result
        return { success, obj, data: CleanText(data)}
    }else{
        const empty = { success: false, data: 'CONCAT_INDEX_INFOS_GLOBAL() -> QUERY FAILED'}
        return empty
    }
}



module.exports = {
    sql_GET_DATA_NOTICES,
    sql_CONCAT_INDEX_INFOS,
    sql_CONCAT_INDEX_INFOS_GLOBAL,
    SplitText
}


// EDNAME = select ed_name from publishers where ed_id = {ed1_id}
// {tit1, tit2,tit3,tit4,n_resume,n_gen,n_contenu,index_l, XautorX, EDNAME}