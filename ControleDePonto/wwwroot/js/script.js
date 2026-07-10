const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const dadosLogin = {
        email: email,
        senha: senha
    };

    try {
        const resposta = await fetch("/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        if (!resposta.ok) {
            mensagem.textContent = "E-mail ou senha inválidos.";
            mensagem.style.color = "red";
            return;
        }


        localStorage.setItem("logado", true);

        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "green";
        window.location.href = "/home.html";

    } catch (erro) {
        mensagem.textContent = "Erro ao conectar com a API.";
        mensagem.style.color = "red";
        console.error(erro);
    }
});