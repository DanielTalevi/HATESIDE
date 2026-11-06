const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

// Usuário de teste (só protótipo)
const USUARIO = "admin";
const SENHA = "1234";

form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede a página de recarregar

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === USUARIO && password === SENHA) {
        window.location.href = "templates/home.html"; // página depois do login
    } else {
        mensagem.textContent = "Usuário ou senha inválidos.";
    }
});