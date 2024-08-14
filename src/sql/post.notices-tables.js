const { SplitText } = require('./constructor/notices-constructor.js')
const db = require('../db.js')
const { sql_CONCAT_INDEX_INFOS, sql_CONCAT_INDEX_INFOS_GLOBAL, sql_GET_DATA_NOTICES } = require('./constructor/notices-constructor.js')
const { sql_FOR_GET_IDWORD } = require('./constructor/words-table.js')

async function sql_INSERT_NOTICES_LANGUES(data){
    try {
        const { id_notice } = data
        const query = `SELECT num_notice FROM notices_langues where num_notice = ?`
        const [existID] = await db.execute(query, [id_notice])
        if(existID.length > 0){
            return {msg: 'Ya existe el registro con este id', success: false, table: 'notices_langues', sql: `ID: ${id_notice}`}
        }
        else{
            console.log('se ejecuta el insert');
            // const sql = `INSERT INTO notices_langues (num_notice, type_langue, code_langue, ordre_langue) values (? , 0, 'spa',0)`
            // const [result] = await db.execute(sql, [id_notice])
            // if (result.affectedRows > 0) {
            //     const obj = {
            //         msg: 'Consulta realizada con exito',
            //         success: true,
            //         sql: `ID insertado: ${result.insertId}`,
            //         table: 'notices_langues'
            //     }
            //     return obj
            // }else{
            //     return { msg: 'No se realizo la consulta', success: false, id: id_notice, table: 'notices_langues'}
            // }
        }

    } catch (error) {
        console.log(error);
    }
}
async function sql_INSERT_NOTICES_GLOBAL_INDEX(data){
    try {
        // @param num_notice: int
        // @param inf_global: string
        // @param index_inf_global: string
        const { id_notice } = data
        const inf_global = await sql_CONCAT_INDEX_INFOS(id_notice)
        const index_inf_global = await sql_CONCAT_INDEX_INFOS_GLOBAL(id_notice)

        const sql = `INSER INTO notices_global_index (num_notice, no_index,infos_global, index_infos_global) VALUES ( ?, 1, ?, ?)`
        const [result] = await db.execute(sql, [id_notice, inf_global, index_inf_global]);
        if(result.affectedRows > 0){
            const obj = {
                msg: 'Consulta realizada con exito',
                success: true,
                sql: `ID insertado: ${result.insertId}`,
                table: 'notices_global_index'
            }
            return obj
        }else{
            return {msg: 'No se realizo la consulta', success: false, id: id_notice, table: 'notices_global_index'}
        }
    } catch (err) {
        console.error(err);
    }
}
// 🔥🔥🔥🔥🔥🔥
// GENERAL TABLA: PALABRA POR PALABRA || NO REPETIDOS
async function sql_INSERT_WORDS(data){
    const {id_notice} = data
    const result = await sql_GET_DATA_NOTICES(id_notice)
    if(result.success){
        const dataStr = result.data
        const arrStr = SplitText(dataStr) //array de palabras sin duplicados
        console.log(arrStr);
        const response = await sql_FOR_GET_IDWORD(arrStr)
        let existe = response.data
        let noexiste = response.empty
        // primero se debe esperar a que se inserten los id de cada word que no existe en la tabla words para luego extraer los id de cada word y prepararlos para la tabla notices_mots_global_index
        console.log(response);
    }else{
        return { success: false, data: 'sql_INSERT_WORDS() -> QUERY FAILED'}
    }
}
async function sql_INSERT_NOTICES_FIELDS_GLOBAL_INDEX(data){

}

async function CONTROLLER_INSERT_TABLES(data){
    console.log(data);
    let query_notices_langues = await sql_INSERT_NOTICES_LANGUES(data)
    // let query_notices_global_index = await sql_INSERT_NOTICES_GLOBAL_INDEX(data)

    console.log(query_notices_langues);
}

module.exports = {
    sql_INSERT_WORDS,
    CONTROLLER_INSERT_TABLES
}