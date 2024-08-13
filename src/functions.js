// QUERY SOLO PARA EL TITULO 🔺 CODE_CHAMP = 1
function queryMotsGlobalIndex(arr){
    let response = [];
    for(const item of arr){
        try {
            let sql = `INSERT INTO notices_mots_global_index (id_notice,code_champ, code_ss_champ, num_word, pond, position, field_position) VALUES ('${item.id_word}','1', '0', '', 130, '1', '1');`

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = {
    queryMotsGlobalIndex
}

// CODE_CHAMP [1,2,3,4] ? POND = 130 : ''