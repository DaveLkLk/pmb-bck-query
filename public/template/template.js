// CREATE DATA UL
export function DATA_UL(data){
    const ul = document.createElement('ul')
    data.forEach(item => {
        let li = document.createElement('li')
        li.textContent = item.sql
        ul.appendChild(li)
    })
    return ul
}