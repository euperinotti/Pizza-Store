const select = (element) => {
    return document.querySelector(element);
}

const selectAll = (element) => {
    return document.querySelectorAll(element);
}

let modalQntd = 1;
let modalKey = 0;
let cart = [];

// listagem das pizzas
pizzaJson.map(function(item, index) {
    //pega as informações que estão dentro da div .pizza-item
    let pizzaItem = select('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //configurando a janela de detalhes da pizza
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQntd = 1;

        // salva o id da pizza
        modalKey = key;

        //conferir as informacoes da pizza selecionada
        console.log(pizzaJson[key]);
        
        //preenchendo as informacoes da janela de detalhes
        select('.pizzaBig img').src = pizzaJson[key].img;
        select('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        select('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        select('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        select('.pizzaInfo--size.selected').classList.remove('selected');

        //console.log(selectAll('.pizzaInfo--size'));
        
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

// eventos do modal

function closeModal() {
    select('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        select('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

// laço para executar a mesma função em divs diferentes 
selectAll('.pizzaInfo--cancelButton', '.pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

// diminui a quantidade de pizzas
select('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQntd > 1){
        modalQntd--;
        select('.pizzaInfo--qt').innerHTML = modalQntd;

        // modifica o preço da pizza automaticamente no modal
        select('.pizzaInfo--actualPrice').innerHTML = `R$ ${(pizzaJson[modalKey].price * modalQntd).toFixed(2)}`;
    }
})

// aumenta a quantidade de pizzas
select('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQntd++;
    select('.pizzaInfo--qt').innerHTML = modalQntd;

    // modifica o preço da pizza automaticamente no modal
    select('.pizzaInfo--actualPrice').innerHTML = `R$ ${(pizzaJson[modalKey].price * modalQntd).toFixed(2)}`;
})

// efeito de selecao de tamanhos

selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

    size.addEventListener('click', () => {
        select('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })

})

select('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(select('.pizzaInfo--size.selected').getAttribute('data-key'));
    console.log(`Pizza: ${modalKey} | Tamanho: ${size} | Quantidade: ${modalQntd}`);

    //gerando o identificador
    let identifier = pizzaJson[modalKey].id + '@' + size;

    // esse identificador serve para identificar pizzas que tenham o mesmo id
    // e o mesmo tamanho, para que quando forem adicionadas ao carrinho
    // sejam adicionadas ao mesmo objeto, ao inves de adicionar um
    // objeto novo

    let keyIdentify = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if(keyIdentify > -1){
        cart[keyIdentify].quantidade += modalQntd;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            quantidade: modalQntd
        });
    }

    closeModal();
    updateCart();

})

select('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        select('aside').style.left = '0';
    }
});

select('.menu-closer').addEventListener('click', () => {
    select('aside').style.left = '100vw';
})

function updateCart() {

    select('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        select('aside').classList.add('show');

        // zera o html do carrinho pra que ele 
        // mostre apenas pizzas diferentes no carrinho

        select('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        // laço para pegar o id da pizza no objeto pizzaJson
        // a partir do id do cart
        for(let i in cart){

            let pizzaItem = pizzaJson.find((item) => {
                return item.id == cart[i].id
            })

            subTotal += pizzaItem.price * cart[i].quantidade;

            let cartItem = select('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantidade;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].quantidade > 1){
                    cart[i].quantidade--;
                } else {
                    // para remover um elemento do carrinho
                    cart.splice(i, 1);
                }
                updateCart();
            })

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].quantidade++;
                updateCart();
            })

            select('.cart').append(cartItem);
        }

        desconto = subTotal * 0.1;
        total = subTotal - desconto;


        // pega o último item dentro de uma seleção de elementos
        // sem classes com a mesma tag
        select('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        select('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        select('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        select('aside').classList.remove('show');
        select('aside').style.left = '100vw';
    }
}

