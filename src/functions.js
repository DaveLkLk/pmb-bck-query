function queryMotsGlobalIndex(arr){
    let sql = `INSERT INTO notices_mots_global_index (id_notice,code_champ, code_ss_champ, num_word, pond, position, field_position) VALUES (y,'1', '0', x, 130, '1', '1');`
}

module.exports = {
    queryMotsGlobalIndex
}

// CODE_CHAMP [1,2,3,4] ? POND = 130 : ''