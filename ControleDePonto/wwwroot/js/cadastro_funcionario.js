const formFuncionario = document.getElementById("formFuncionario");

const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");
const dataDeNascimentoInput =
    document.getElementById("dataDeNascimento");

const mensagem = document.getElementById("mensagem");

const btnCadastrar =
    document.getElementById("btnCadastrar");

const btnLimpar =
    document.getElementById("btnLimpar");

const btnSair =
    document.getElementById("btnSair");

// Altere para a URL correta da sua API
const API_URL =
    "/api/Funcionario/cadastrar";

definirDataMaxima();

cpfInput.addEventListener("input", function () {
    this.value = aplicarMascaraCpf(this.value);
});

telefoneInput.addEventListener("input", function () {
    this.value = aplicarMascaraTelefone(this.value);
});

btnLimpar.addEventListener("click", function () {
    formFuncionario.reset();
    limparErros();
    ocultarMensagem();
});

btnSair.addEventListener("click", function () {
    localStorage.removeItem("logado");

    window.location.href = "/index.html";
});

formFuncionario.addEventListener("submit", async function (event) {
    event.preventDefault();

    limparErros();
    ocultarMensagem();

    const funcionario = {
        cpf: removerFormatacao(cpfInput.value),

        matricula: Number(
            document.getElementById("matricula").value
        ),

        nome: document
            .getElementById("nome")
            .value
            .trim(),

        email: document
            .getElementById("email")
            .value
            .trim(),

        telefone: removerFormatacao(
            telefoneInput.value
        ),

        dataDeNascimento:
            dataDeNascimentoInput.value,

        hierarquia:
            document.getElementById("hierarquia").value
    };

    if (!validarFormulario(funcionario)) {
        return;
    }

    await cadastrarFuncionario(funcionario);
});

function validarFormulario(funcionario) {
    let valido = true;

    if (funcionario.cpf.length !== 11) {
        marcarErro(cpfInput);
        valido = false;
    }

    if (
        !funcionario.matricula ||
        funcionario.matricula <= 0
    ) {
        marcarErro(
            document.getElementById("matricula")
        );

        valido = false;
    }

    if (funcionario.nome.length < 3) {
        marcarErro(
            document.getElementById("nome")
        );

        valido = false;
    }

    if (!funcionario.email) {
        marcarErro(
            document.getElementById("email")
        );

        valido = false;
    }

    if (
        funcionario.telefone.length < 10 ||
        funcionario.telefone.length > 11
    ) {
        marcarErro(telefoneInput);
        valido = false;
    }

    if (!funcionario.dataDeNascimento) {
        marcarErro(dataDeNascimentoInput);
        valido = false;
    }

    if (!funcionario.hierarquia) {
        marcarErro(
            document.getElementById("hierarquia")
        );

        valido = false;
    }

    if (!valido) {
        exibirMensagem(
            "Preencha corretamente os campos destacados.",
            "erro"
        );
    }

    return valido;
}

async function cadastrarFuncionario(funcionario) {
    alterarEstadoBotao(true);

    try {
        const token = localStorage.getItem("logado");

        const headers = {
            "Content-Type": "application/json"
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(funcionario)
        });

        let resposta = null;

        const contentType =
            response.headers.get("content-type");

        if (
            contentType &&
            contentType.includes("application/json")
        ) {
            resposta = await response.json();
        }

        if (!response.ok) {
            const erro =
                resposta?.mensagem ||
                resposta?.title ||
                "Não foi possível cadastrar o funcionário.";

            throw new Error(erro);
        }

        exibirMensagem(
            "Funcionário cadastrado com sucesso.",
            "sucesso"
        );

        formFuncionario.reset();

    } catch (erro) {
        console.error(erro);

        if (erro instanceof TypeError) {
            exibirMensagem(
                "Não foi possível conectar com a API. Verifique a URL, o CORS e se a API está iniciada.",
                "erro"
            );

            return;
        }

        exibirMensagem(erro.message, "erro");

    } finally {
        alterarEstadoBotao(false);
    }
}

function aplicarMascaraCpf(valor) {
    const numeros = removerFormatacao(valor)
        .slice(0, 11);

    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
    const numeros = removerFormatacao(valor)
        .slice(0, 11);

    if (numeros.length <= 10) {
        return numeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function removerFormatacao(valor) {
    return valor.replace(/\D/g, "");
}

function definirDataMaxima() {
    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoje.getDate()
    ).padStart(2, "0");

    dataDeNascimentoInput.max =
        `${ano}-${mes}-${dia}`;
}

function marcarErro(campo) {
    campo.classList.add("input-error");
}

function limparErros() {
    document
        .querySelectorAll(".input-error")
        .forEach(function (campo) {
            campo.classList.remove("input-error");
        });
}

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function ocultarMensagem() {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

function alterarEstadoBotao(carregando) {
    btnCadastrar.disabled = carregando;

    btnCadastrar.textContent = carregando
        ? "Cadastrando..."
        : "Cadastrar";
}