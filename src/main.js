import * as cartService from './services/cart.js';
import createItem from "./services/item.js";
import readline from 'readline';

// Configurar interface de leitura do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para perguntar ao usuário
const question = (text) => new Promise((resolve) => {
    rl.question(text, resolve);
});

// Função para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para limpar terminal
const clearScreen = () => {
    console.clear();
};

// Função para animação de carregamento
async function loadingAnimation(text, duration = 1500) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const startTime = Date.now();
    let i = 0;
    
    process.stdout.write(`\n${text} `);
    while (Date.now() - startTime < duration) {
        process.stdout.write(`\r${text} ${frames[i % frames.length]}`);
        await delay(80);
        i++;
    }
    process.stdout.write(`\r${text} ✅\n`);
}

// Catálogo de produtos disponíveis
const catalogo = [
    { name: "🎮 Placa de Video RTX 3060", price: 1999.90, emoji: "🎮" },
    { name: "💻 Processador AMD Ryzen 7", price: 1499.90, emoji: "💻" },
    { name: "🔧 Memória RAM 16GB", price: 299.90, emoji: "🔧" },
    { name: "💾 SSD NVMe 1TB", price: 499.90, emoji: "💾" },
    { name: "🖥️ Monitor 144Hz", price: 1299.90, emoji: "🖥️" },
    { name: "⌨️ Teclado Mecânico RGB", price: 299.90, emoji: "⌨️" },
    { name: "🖱️ Mouse Gamer", price: 199.90, emoji: "🖱️" },
    { name: "🎧 Headset Gamer", price: 249.90, emoji: "🎧" },
    { name: "🔌 Fonte 650W", price: 399.90, emoji: "🔌" },
    { name: "❄️ Water Cooler", price: 349.90, emoji: "❄️" }
];

// Carrinho do usuário
let myCart = [];

// Função para mostrar catálogo
async function showCatalog() {
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║              📦 CATÁLOGO DE PRODUTOS               ║");
    console.log("╚════════════════════════════════════════════════════╝\n");
    
    catalogo.forEach((produto, index) => {
        console.log(`   ${index + 1}. ${produto.emoji} ${produto.name}`);
        console.log(`      └─ R$ ${produto.price.toFixed(2)}`);
        console.log();
    });
    console.log("══════════════════════════════════════════════════════\n");
}

// Função para adicionar produto
async function addProduct() {
    await showCatalog();
    
    const escolha = await question("📦 Escolha o número do produto (ou 0 para voltar): ");
    const index = parseInt(escolha) - 1;
    
    if (escolha === "0") return;
    
    if (index >= 0 && index < catalogo.length) {
        const produto = catalogo[index];
        const quantidade = await question(`🔢 Quantidade de ${produto.emoji} ${produto.name}: `);
        const qtd = parseInt(quantidade);
        
        if (qtd > 0) {
            const item = createItem(produto.name, produto.price, qtd);
            await cartService.addItem(myCart, item);
            await loadingAnimation(`Adicionando ${qtd}x ${produto.name}`, 1000);
        } else {
            console.log("❌ Quantidade inválida!\n");
        }
    } else {
        console.log("❌ Produto não encontrado!\n");
    }
    
    await delay(1000);
}

// Função para remover item
async function removeProduct() {
    if (myCart.length === 0) {
        console.log("\n🛒 Carrinho vazio! Adicione produtos primeiro.\n");
        await delay(1500);
        return;
    }
    
    await cartService.showCart(myCart);
    
    const escolha = await question("🗑️ Escolha o número do item para remover (ou 0 para voltar): ");
    const index = parseInt(escolha) - 1;
    
    if (escolha === "0") return;
    
    if (index >= 0 && index < myCart.length) {
        const item = myCart[index];
        const opcao = await question(`Remover 1 unidade ou item completo? (1 = 1 unidade / 2 = item completo): `);
        
        if (opcao === "1") {
            await cartService.removeItem(myCart, index);
            await loadingAnimation(`Removendo 1 unidade de ${item.name}`, 1000);
        } else if (opcao === "2") {
            await cartService.deleteItem(myCart, item.name);
            await loadingAnimation(`Removendo ${item.name} do carrinho`, 1000);
        } else {
            console.log("❌ Opção inválida!");
        }
    } else {
        console.log("❌ Item não encontrado!");
    }
    
    await delay(1000);
}

// Função para ver carrinho
async function viewCart() {
    await cartService.showCart(myCart);
    await question("\n📌 Pressione ENTER para continuar...");
}

// Função para finalizar compra
async function checkout() {
    if (myCart.length === 0) {
        console.log("\n🛒 Carrinho vazio! Adicione produtos antes de finalizar.\n");
        await delay(1500);
        return;
    }
    
    clearScreen();
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║              💰 FINALIZAR COMPRA                  ║");
    console.log("╚════════════════════════════════════════════════════╝\n");
    
    await cartService.showCart(myCart);
    
    const confirmar = await question("✅ Confirmar compra? (s/n): ");
    
    if (confirmar.toLowerCase() === 's') {
        await loadingAnimation("Processando pagamento", 2000);
        
        console.log("\n💳 Escolha a forma de pagamento:");
        console.log("   1. Pix (10% desconto)");
        console.log("   2. Cartão de Crédito (5% desconto)");
        console.log("   3. Boleto (8% desconto)");
        
        const pagamento = await question("\n📌 Opção: ");
        
        let total = myCart.reduce((sum, item) => sum + item.subTotal(), 0);
        let desconto = 0;
        
        switch(pagamento) {
            case "1":
                desconto = total * 0.10;
                console.log("\n💰 Pix selecionado - 10% de desconto!");
                break;
            case "2":
                desconto = total * 0.05;
                console.log("\n💳 Cartão selecionado - 5% de desconto!");
                break;
            case "3":
                desconto = total * 0.08;
                console.log("\n📄 Boleto selecionado - 8% de desconto!");
                break;
            default:
                console.log("\n❌ Opção inválida! Usando valor sem desconto.");
        }
        
        const totalComDesconto = total - desconto;
        
        await loadingAnimation("Autorizando pagamento", 1800);
        await loadingAnimation("Confirmando compra", 1500);
        
        console.log("\n╔════════════════════════════════════════════════════╗");
        console.log("║              🎉 COMPRA FINALIZADA! 🎉              ║");
        console.log("╚════════════════════════════════════════════════════╝\n");
        
        console.log(`💰 Subtotal: R$ ${total.toFixed(2)}`);
        if (desconto > 0) {
            console.log(`🎁 Desconto: -R$ ${desconto.toFixed(2)}`);
        }
        console.log(`💵 Total pago: R$ ${totalComDesconto.toFixed(2)}`);
        
        const trackingCode = `BR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        console.log(`\n📮 Código de rastreio: ${trackingCode}`);
        console.log("📦 Seu pedido será entregue em até 7 dias úteis");
        
        // Limpar carrinho após compra
        myCart = [];
        
        console.log("\n⭐ Obrigado por comprar na Shopee!\n");
        await question("📌 Pressione ENTER para continuar...");
    } else {
        console.log("\n❌ Compra cancelada!");
        await delay(1500);
    }
}

// Função para mostrar menu principal
async function showMenu() {
    clearScreen();
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║                                                    ║");
    console.log("║   🛍️  SHOPEE CART SIMULATOR - INTERATIVO  🛍️      ║");
    console.log("║                                                    ║");
    console.log("╚════════════════════════════════════════════════════╝");
    
    const totalItens = myCart.reduce((qtd, item) => qtd + item.quantity, 0);
    const totalValor = myCart.reduce((sum, item) => sum + item.subTotal(), 0);
    
    console.log(`\n📊 STATUS DO CARRINHO:`);
    console.log(`   🛒 Itens: ${totalItens} unidade(s)`);
    console.log(`   💰 Total: R$ ${totalValor.toFixed(2)}`);
    
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║                   MENU PRINCIPAL                   ║");
    console.log("╠════════════════════════════════════════════════════╣");
    console.log("║                                                    ║");
    console.log("║   1. 📦 Adicionar produto                          ║");
    console.log("║   2. 🗑️  Remover produto                           ║");
    console.log("║   3. 👀 Ver carrinho                               ║");
    console.log("║   4. 💰 Finalizar compra                           ║");
    console.log("║   5. 🚪 Sair                                       ║");
    console.log("║                                                    ║");
    console.log("╚════════════════════════════════════════════════════╝\n");
}

// Função principal
async function main() {
    let running = true;
    
    while (running) {
        await showMenu();
        const opcao = await question("📌 Escolha uma opção (1-5): ");
        
        switch(opcao) {
            case "1":
                await addProduct();
                break;
            case "2":
                await removeProduct();
                break;
            case "3":
                await viewCart();
                break;
            case "4":
                await checkout();
                break;
            case "5":
                console.log("\n👋 Obrigado por usar o Shopee Cart Simulator!");
                console.log("⭐ Volte sempre!\n");
                running = false;
                break;
            default:
                console.log("\n❌ Opção inválida! Escolha 1-5.");
                await delay(1500);
        }
    }
    
    rl.close();
}

// Iniciar aplicação
main().catch(console.error);