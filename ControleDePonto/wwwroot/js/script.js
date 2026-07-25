const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");
const btnEntrar = document.getElementById("btnEntrar");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    limparMensagem();

    btnEntrar.disabled = true;
    btnEntrar.textContent = "Entrando...";

    const dadosLogin = {
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value
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
            exibirMensagem(
                "E-mail ou senha inválidos.",
                "erro"
            );

            return;
        }

        const dados = await resposta.json();

        localStorage.setItem("token", dados.token);

        exibirMensagem(
            "Login realizado com sucesso!",
            "sucesso"
        );

        setTimeout(function () {
            window.location.href = "/home.html";
        }, 800);

    } catch (erro) {

        console.error(erro);

        exibirMensagem(
            "Erro ao conectar com a API.",
            "erro"
        );

    } finally {

        btnEntrar.disabled = false;
        btnEntrar.textContent = "Entrar";
    }
});

function exibirMensagem(texto, tipo) {

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

function limparMensagem() {

    mensagem.textContent = "";
    mensagem.className = "";
}