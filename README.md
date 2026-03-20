# 🛍️ Shopee Cart Simulator (Interactive CLI)

> Simulador interativo de carrinho de compras inspirado na Shopee, rodando 100% no terminal com experiência dinâmica, sistema de menu e fluxo completo de checkout.

---

## 📌 Sobre o Projeto

O **Shopee Cart Simulator** é uma aplicação CLI (Command Line Interface) desenvolvida em Node.js que simula uma experiência real de e-commerce.

O projeto foi projetado para demonstrar habilidades práticas em:

- Arquitetura modular (ES Modules)
- Programação assíncrona (async/await)
- Manipulação de dados em tempo real
- Experiência do usuário em terminal (CLI UX)
- Lógica de negócios (carrinho, pagamento, descontos)

---

## 🚀 Funcionalidades

### 🛒 Carrinho
✔️ Adicionar produtos com quantidade  
✔️ Remover 1 unidade ou item completo  
✔️ Visualizar carrinho em tempo real  
✔️ Cálculo automático de subtotal e total  

### 💳 Checkout Inteligente
✔️ Simulação de pagamento  
✔️ Sistema de descontos por método:
- Pix → 10%
- Cartão → 5%
- Boleto → 8%

✔️ Geração automática de código de rastreio  
✔️ Limpeza do carrinho após compra  

### 🎮 Experiência Interativa
✔️ Menu dinâmico no terminal  
✔️ Input do usuário via CLI  
✔️ Animações de loading (spinner)  
✔️ Interface limpa e organizada  
✔️ Atualização em tempo real do carrinho  

---

## 🧠 Conceitos Técnicos Aplicados

### 🔹 Programação Assíncrona
\`\`\`javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000);
\`\`\`

### 🔹 CLI Interativo (readline)
\`\`\`javascript
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
\`\`\`

### 🔹 Lógica de Carrinho
\`\`\`javascript
const total = myCart.reduce((sum, item) => sum + item.subTotal(), 0);
\`\`\`

### 🔹 Sistema de Desconto
\`\`\`javascript
desconto = total * 0.10; // Pix
\`\`\`

### 🔹 Código de Rastreio
\`\`\`javascript
const trackingCode = \`BR\${Math.random().toString(36).substring(2, 10).toUpperCase()}\`;
\`\`\`

---

## 📁 Estrutura do Projeto

\`\`\`
shopee-cart-simulator/
│
├── main.js
├── package.json
├── README.md
│
└── services/
    ├── cart.js
    └── item.js
\`\`\`

---

## 🛠️ Tecnologias Utilizadas

- Node.js (v20+)
- JavaScript ES6+
- readline (nativo)
- Sem dependências externas

---

## ⚙️ Como Executar

### 1. Clone o repositório

\`\`\`bash
git clone https://github.com/taissocout/shopee-cart-simulator.git
\`\`\`

### 2. Acesse a pasta

\`\`\`bash
cd shopee-cart-simulator
\`\`\`

### 3. Execute

\`\`\`bash
node main.js
\`\`\`

---

## 🎮 Fluxo do Sistema

\`\`\`
1. Adicionar produto
2. Remover produto
3. Ver carrinho
4. Finalizar compra
5. Sair
\`\`\`

---

## 💰 Métodos de Pagamento

| Método   | Desconto |
|----------|--------|
| Pix      | 10%    |
| Cartão   | 5%     |
| Boleto   | 8%     |

---

## 🎯 Roadmap

- [ ] Persistência de dados
- [ ] Sistema de login
- [ ] API de frete
- [ ] Interface Web
- [ ] Testes automatizados
- [ ] Docker
- [ ] CI/CD

---

## 🤝 Contribuição

\`\`\`bash
git checkout -b feature/minha-feature
git commit -m "feat: minha feature"
git push origin feature/minha-feature
\`\`\`

---

## 📝 Licença

ISC

---

## 👨‍💻 Autor

Taisso Cout  
https://github.com/taissocout  

---

## ⭐ Destaque

Projeto focado em simulação real de e-commerce + experiência CLI + arquitetura modular.

⭐ Deixe uma estrela no repositório!
