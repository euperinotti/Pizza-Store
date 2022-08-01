const select = (element) => {
    return document.querySelector(element);
}

const selectAll = (element) => {
    return document.querySelectorAll(element);
}

let modalQntd = 1;

pizzaJson.map(function(item, index) {
    //pega as informações que estão dentro da div .pizza-item
    let pizzaItem = select('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    //adiciona a imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    //adiciona o preco
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //adiciona o nome
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    //adiciona a descricao
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //configurando a janela de detalhes da pizza
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQntd = 1;

        //conferir as informacoes da pizza selecionada
        console.log(pizzaJson[key]);
        
        //preenchendo as informacoes da janela de detalhes
        select('.pizzaBig img').src = pizzaJson[key].img;
        select('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        select('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        select('.pizzaInfo--size.selected').classList.remove('selected');

        console.log(selectAll('.pizzaInfo--size'));
        
        // retorna um array com as divs que possuem essa class
        // executa um laço para cada item desse array
        selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if(sizeIndex == 2){
                size.classList.add('selected');
            }

            // 1- seleciona a tag span
            // 2- pega o index da pizza no objeto
            // 3- utiliza o index do query selector no array de sizes do objeto para obter o valor equivalente ao tamanho
            // 4- adiciona isso ao html

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]

        })

        select('.pizzaInfo--qt').innerHTML = modalQntd;

        //animacao de abrir a janela
        select('.pizzaWindowArea').style.opacity = 0;
        select('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            select('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })

    //clona os itens de .pizza-item e insere dentro de .pizza-area
    select('.pizza-area').append(pizzaItem);
})