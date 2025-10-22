const input = document.getElementById('userInput');
const button = document.getElementById('sendBtn');
const messageBox = document.getElementById('messageBox');

button.addEventListener('click', () => { const text = input.value.trim();
  
  if (text === "") { messageBox.textContent = "Por favor, digite seu nome para começar 💬"; messageBox.style.color = "#ffea00"; } else { messageBox.textContent = `Olá, ${text}! 🚀 Sinta-se bem ao testar o meu widget interativo!`; messageBox.style.color = "#00ffb3"; }

  input.value = ""; });
