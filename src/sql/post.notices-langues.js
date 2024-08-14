const db = require('../db.js')

async function sql_INSERT_NOTICES_LANGUES(data){
    try {
        const { id_notice } = data
        const sql = `INSERT INTO notices_langues (num_notice, type_langue, code_langue, ordre_langue) values (? , 0, 'spa',0)`
        const [result] = await db.execute(sql, [id_notice])
        if (result.affectedRows > 0) {
            const obj = {
                msg: 'Consulta realizada con exito',
                success: true,
                sql: `ID insertado: ${result.insertId}`,
            }
            return obj
        }else{
            return { msg: 'No se realizo la consulta', success: false, id: id_notice}
        }
    } catch (error) {
        console.log(error);
    }
}