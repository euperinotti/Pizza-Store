const select = (element) => {
    return document.querySelector(element);
}

const selectAll = (element) => {
    return document.querySelectorAll(element);
}

pizzaJson.map(function(item, index) {
    //pega as informações que estão dentro da div .pizza-item
    let pizzaItem = select('.models .pizza-item').cloneNode(true);

    //adiciona a imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    //adiciona o preco
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //adiciona o nome
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    //adiciona a descricao
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //configura o evento de click
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        select('.pizzaWindowArea').style.opacity = 0;
        select('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            select('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })

    //clona os itens de .pizza-item e insere dentro de .pizza-area
    select('.pizza-area').append(pizzaItem);
})