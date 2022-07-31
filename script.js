const select = (element) => {
    return document.querySelector(element);
}

const selectAll = (element) => {
    return document.querySelectorAll(element);
}

pizzaJson.map(function(item, index) {
    //pega as informações que estão dentro da div .pizza-item
    let pizzaItem = select('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //clona os itens de .pizza-item e insere dentro de .pizza-area
    select('.pizza-area').append(pizzaItem);
})