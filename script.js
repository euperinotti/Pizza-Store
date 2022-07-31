const select = (element) => {
    return document.querySelector(element);
}

const selectAll = (element) => {
    return document.querySelectorAll(element);
}

pizzaJson.map(function(item, index) {
    //pega as informações que estão dentro da div .pizza-item
    let pizzaItem = select('.models .pizza-item').cloneNode(true);

    //clona os itens de .pizza-item e insere dentro de .pizza-area
    select('.pizza-area').append(pizzaItem);
})