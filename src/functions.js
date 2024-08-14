// QUERY SOLO PARA EL TITULO 🔺 CODE_CHAMP = 1
function queryMotsGlobalIndex(arr){
    let response = [];
    console.log(arr);
    for(let i =0; i< arr.length; i++){
        let sql = `INSERT INTO notices_mots_global_index (id_notice,code_champ, code_ss_champ, num_word, pond, position, field_position) VALUES ('${arr[i].id_book}','1', '0', '${arr[i].id_word}', 130, '1', '${i+1}');`
        response.push({sql})
    }
    return response;

}

module.exports = {
    queryMotsGlobalIndex
}

// CODE_CHAMP [1,2,3,4] ? POND = 130 : ''