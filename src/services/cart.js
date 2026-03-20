// Carrinho de compras - Shopee Style com delays

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// -> Adicionar item no carrinho
async function addItem(userCart, item) {
    userCart.push(item);
    console.log(`🛍️  ${item.name} adicionado ao carrinho!`);
    await delay(300);
    console.log(`   └─ R$ ${item.price.toFixed(2)} x ${item.quantity} unidade(s)`);
    await delay(300);
    console.log(`   └─ Subtotal: R$ ${item.subTotal().toFixed(2)}\n`);
    await delay(500);
}

// -> Calcular o total do carrinho
async function calculateTotal(userCart) {
    const result = userCart.reduce((total, item) => total + item.subTotal(), 0);
    const totalItens = userCart.reduce((qtd, item) => qtd + item.quantity, 0);
    
    await delay(500);
    console.log(`💰 TOTAL DO PEDIDO: R$ ${result.toFixed(2)}`);
    await delay(300);
    console.log(`📦 Total de itens: ${totalItens} unidades\n`);
    await delay(500);
    return result;
}

// -> Deletar item do carrinho
async function deleteItem(userCart, name) {
    const index = userCart.findIndex(item => item.name === name);
    if (index !== -1) {
        const removed = userCart[index];
        userCart.splice(index, 1);
        console.log(`🗑️  ${removed.name} removido do carrinho!`);
        await delay(400);
        console.log(`   └─ Você economizou R$ ${removed.subTotal().toFixed(2)}\n`);
    } else {
        console.log(`❌ ${name} não encontrado no carrinho!\n`);
    }
    await delay(500);
}

// -> Remover 1 unidade do carrinho
async function removeItem(userCart, index) {
    if (index >= 0 && index < userCart.length) {
        if (userCart[index].quantity > 1) {
            userCart[index].quantity -= 1;
            console.log(`📦 1 unidade de ${userCart[index].name} removida!`);
            await delay(400);
            console.log(`   └─ Restam: ${userCart[index].quantity} unidade(s)\n`);
        } else {
            const removed = userCart[index];
            userCart.splice(index, 1);
            console.log(`🗑️  ${removed.name} removido do carrinho (última unidade)!\n`);
        }
    } else {
        console.log(`❌ Item não encontrado!\n`);
    }
    await delay(500);
}

// -> Mostrar carrinho completo
async function showCart(userCart) {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║         🛒 SEU CARRINHO SHOPEE         ║");
    console.log("╚════════════════════════════════════════╝\n");
    
    await delay(500);
    
    if (userCart.length === 0) {
        console.log("   🛍️  Seu carrinho está vazio!");
        console.log("   ➜ Continue comprando!\n");
    } else {
        for (let i = 0; i < userCart.length; i++) {
            const item = userCart[i];
            console.log(`   ${i+1}. ${item.name}`);
            await delay(200);
            console.log(`      └─ R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${item.subTotal().toFixed(2)}`);
            await delay(300);
        }
        
        console.log("\n   ────────────────────────────────");
        await calculateTotal(userCart);
    }
    console.log("════════════════════════════════════════\n");
    await delay(500);
}

export {
    addItem,
    calculateTotal,
    deleteItem,
    removeItem,
    showCart
}