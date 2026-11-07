const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("login");
const campoSenha = document.getElementById("password");
const toggle = document.getElementById("toggleSenha");
const card = document.querySelector(".login-form");

// Usuário de teste (só protótipo)
const USUARIO = "admin";
const SENHA = "1234";

// mostrar / ocultar senha
toggle.addEventListener("click", () => {
    const visivel = campoSenha.type === "text";
    campoSenha.type = visivel ? "password" : "text";
    toggle.textContent = visivel ? "Mostrar" : "Ocultar";
    toggle.setAttribute("aria-label", visivel ? "Mostrar senha" : "Ocultar senha");
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede a página de recarregar

    const username = document.getElementById("username").value.trim();
    const password = campoSenha.value;

    if (!username || !password) {
        mostrarErro("Preencha usuário e senha.");
        return;
    }

    if (username === USUARIO && password === SENHA) {
        mensagem.textContent = "";
        botao.disabled = true;
        botao.textContent = "Entrando...";
        window.location.href = "templates/home.html"; // página depois do login
    } else {
        mostrarErro("Usuário ou senha inválidos.");
    }
});

function mostrarErro(texto) {
    mensagem.textContent = texto;
    card.classList.remove("erro");
    void card.offsetWidth; // reinicia a animação
    card.classList.add("erro");
}