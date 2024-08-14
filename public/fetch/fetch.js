import {doubleMetaphone} from 'https://esm.sh/double-metaphone@2?bundle'
// CONSTRUIR EL CODE_METHADATA
async function FetchCode(text, id){
    const [primary, secondary] = doubleMetaphone(text)
    const res = {
        word: text,
        id_libro: id,
        primary: primary.slice(0,4),
        secondary: secondary.slice(0,4),
        full: `${primary.slice(0,4)} ${secondary.slice(0,4)}`
    }
    return res
}
export async function getMetaData(arr, id){
    const response = []
    arr.forEach( async (element) => {
        const code = await FetchCode(element, id)
        element = code
        response.push(element)
    });
    return response
}
// FETCH A LA RUTA /db
export async function FetchData(query){
    try {
        const response = await fetch('http://localhost:5001/db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(query)
        })
        if(!response.ok){
            throw new Error('ERROR Server - Bad Request')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
// FETCH A LA RUTA /WORDS
export async function FetchIDData(query){
    try {
        const response = await fetch('http://localhost:5001/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        if(!response.ok) throw new Error('ERROR Server - Bad Request')
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
// FETCH A LA RUTA /BOOKID
export async function FetchIDBook(book){
    try {
        const response = await fetch('http://localhost:5001/bookID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        if(!response.ok) throw new Error("ERROR SERVER")
        return response.json()
    } catch (error) {
        console.log(error);
    }
}
// FETCH A LA RUTA /GENERATE-INSERT
export async function FetchTablesBook(book){
    try {
        const response = await fetch('http://localhost:5001/generate-insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        if(!response.ok) throw new Error("ERROR SERVER")
        return response.json()
    } catch (error) {
        console.log(error);
    }
}