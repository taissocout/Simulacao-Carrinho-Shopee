// Classe para criar itens - Shopee Style

class Item {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    subTotal() {
        return this.price * this.quantity;
    }
}

export default function createItem(name, price, quantity) {
    return new Item(name, price, quantity);
}1