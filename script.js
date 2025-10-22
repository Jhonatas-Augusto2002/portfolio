const botoes = { produtos: document.getElementById("btn-produtos"), carrinho: document.getElementById("btn-carrinho"), sobre: document.getElementById("btn-sobre") };

const secoes = { home: document.getElementById("home"), produtos: document.getElementById("produtos"), carrinho: document.getElementById("carrinho"), sobre: document.getElementById("sobre") };

function mostrar(secao) { Object.values(secoes).forEach(s => (s.style.display = "none")); secao.style.display = "block"; }

botoes.produtos.addEventListener("click", () => mostrar(secoes.produtos));
botoes.carrinho.addEventListener("click", () => mostrar(secoes.carrinho));
botoes.sobre.addEventListener("click", () => mostrar(secoes.sobre));

const botoesAdicionar = document.querySelectorAll(".add-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalElement = document.getElementById("total");
const mensagem = document.getElementById("mensagem");
const botaoComprar = document.getElementById("comprar");

let carrinho = [];

function atualizarCarrinho() { listaCarrinho.innerHTML = ""; let total = 0; carrinho.forEach((item, index) => { total += item.preco * item.quantidade;
  const li = document.createElement("li"); li.className = "item-carrinho"; li.innerHTML = `
  <div>${item.nome} - R$ ${item.preco.toFixed(2)}</div>
  <div class="quantidade-controle">
  <span>Quantidade:</span>
  <button class="menos">➖</button>
  <span class="qtd">${item.quantidade}</span>
  <button class="mais">➕</button>
  </div>
  <button class="remover">❌</button>
  `;

  // Botões de quantidade
  li.querySelector(".mais").addEventListener("click", () => { item.quantidade++; atualizarCarrinho(); });
  li.querySelector(".menos").addEventListener("click", () => { if (item.quantidade > 1) { item.quantidade--; } else { carrinho.splice(index, 1); } atualizarCarrinho(); });

  // Botão remover
  li.querySelector(".remover").addEventListener("click", () => { carrinho.splice(index, 1); atualizarCarrinho(); }); listaCarrinho.appendChild(li); });
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`; }

function mostrarMensagem(texto, cor = "#6f00ff") { mensagem.textContent = texto; mensagem.style.background = cor; mensagem.style.display = "block"; setTimeout(() => (mensagem.style.display = "none"), 2000); }

botoesAdicionar.forEach(botao => { botao.addEventListener("click", e => { const produto = e.target.parentElement; const nome = produto.querySelector("h3").textContent;
  const preco = parseFloat(produto.querySelector("p").textContent.replace("R$", "").replace(",", "."));

  const existente = carrinho.find(item => item.nome === nome);
  if (existente) { existente.quantidade++; } else { carrinho.push({ nome, preco, quantidade: 1 }); }
  
  atualizarCarrinho();
  mostrarMensagem(`${nome} foi adicionado ao carrinho!`); }); });

// Função do botão "Comprar"
botaoComprar.addEventListener("click", () => {
  if (carrinho.length === 0) { mostrarMensagem("Seu carrinho está vazio!", "#ff0055"); return; }
  
  mostrarMensagem("Compra realizada com sucesso! 🎉", "#00ff6a");
  carrinho = [];
  atualizarCarrinho(); });
