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
        // 1. Autenticação na API
        const resposta = await fetch("/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(
                dados.mensagem || "E-mail ou senha inválidos.",
                "erro"
            );
            return;
        }

        // 2. Salva o Token JWT
        localStorage.setItem("token", dados.token);

        // 3. Inicializa os dados da sessão (Chave unificada: "usuario_sessao")
        if (dados.usuario) {
            localStorage.setItem("usuario_sessao", JSON.stringify(dados.usuario));
        } else {
            // Se a API de Auth não mandou o usuário completo, busca no /api/Perfil/meu-perfil antes de redirecionar
            await inicializarPerfilSessao(dados.token);
        }

        exibirMensagem(
            "Login realizado com sucesso!",
            "sucesso"
        );

        setTimeout(function () {
            window.location.href = "/home.html";
        }, 500);

    } catch (erro) {
        console.error("Erro de conexão:", erro);

        exibirMensagem(
            "Erro ao conectar com a API.",
            "erro"
        );

    } finally {
        btnEntrar.disabled = false;
        btnEntrar.textContent = "Entrar";
    }
});

// Busca o perfil completo e grava no cache
async function inicializarPerfilSessao(token) {
    try {
        const respPerfil = await fetch("/api/Perfil", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (respPerfil.ok) {
            const perfil = await respPerfil.json();
            localStorage.setItem("usuario_sessao", JSON.stringify(perfil));
        }
    } catch (erro) {
        console.error("Erro ao pré-carregar perfil:", erro);
    }
}

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

function limparMensagem() {
    mensagem.textContent = "";
    mensagem.className = "";
}