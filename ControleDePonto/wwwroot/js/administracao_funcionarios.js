const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

const modalOverlay =
    document.getElementById("modalOverlay");

const modalConteudo =
    document.getElementById("modalConteudo");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalDescricao =
    document.getElementById("modalDescricao");

const modalMensagem =
    document.getElementById("modalMensagem");

const btnFecharModal =
    document.getElementById("btnFecharModal");

const btnSair =
    document.getElementById("btnSair");

const botoesAdministracao =
    document.querySelectorAll("[data-modal]");

/*
    Altere de acordo com a porta e as rotas da sua API.
*/
const API_URL =
    "/api/Funcionario";

botoesAdministracao.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const opcao = botao.dataset.modal;

        abrirModal(opcao);
    });
});

btnFecharModal.addEventListener("click", fecharModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        fecharModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        modalOverlay.classList.contains("aberto")
    ) {
        fecharModal();
    }
});

btnSair.addEventListener("click", function () {
    localStorage.removeItem("token");

    window.location.href = "/index.html";
});

function abrirModal(opcao) {
    ocultarMensagem();

    if (opcao === "cadastrar") {
        abrirCadastro();
    }

    if (opcao === "atualizar") {
        abrirAtualizacao();
    }

    if (opcao === "listar") {
        abrirListaFuncionarios();
    }

    modalOverlay.classList.add("aberto");

    document.body.style.overflow = "hidden";
}

function fecharModal() {
    modalOverlay.classList.remove("aberto");

    modalConteudo.innerHTML = "";

    ocultarMensagem();

    document.body.style.overflow = "";
}

/* =========================
   CADASTRO
========================= */

function abrirCadastro() {
    modalTitulo.textContent =
        "Cadastrar funcionário";

    modalDescricao.textContent =
        "Preencha os dados do novo funcionário.";

    modalConteudo.innerHTML =
        criarFormularioFuncionario("cadastrar");

    const formulario =
        document.getElementById("formFuncionario");

    aplicarMascaras();

    formulario.addEventListener(
        "submit",
        cadastrarFuncionario
    );
}

async function cadastrarFuncionario(event) {
    event.preventDefault();

    const funcionario = obterDadosFormulario();

    try {
        alterarBotaoFormulario(
            true,
            "Cadastrando..."
        );

        const response = await fetch(`${API_URL}/cadastrar`, {
            method: "POST",
            headers: criarHeaders(),
            body: JSON.stringify(funcionario)
        });

        const resposta =
            await lerResposta(response);

        if (!response.ok) {
            throw new Error(
                obterMensagemErro(resposta)
            );
        }

        mostrarToast(
            "success",
            "Cadastro realizado!",
            "Funcionário cadastrado com sucesso."
        );

        event.target.reset();
        fecharModal();

    } catch (erro) {
        console.error(erro);

        mostrarToast(
            "error",
            "Erro no cadastro!",
            erro.message ||
            "Não foi possível cadastrar o funcionário."
        );

    } finally {
        alterarBotaoFormulario(
            false,
            "Cadastrar"
        );
    }
}

/* =========================
   ATUALIZAÇÃO
========================= */

function abrirAtualizacao() {
    modalTitulo.textContent =
        "Atualizar funcionário";

    modalDescricao.textContent =
        "Pesquise um funcionário para atualizar seus dados.";

    modalConteudo.innerHTML = `
        <div class="search-area">

            <input
                type="text"
                id="pesquisaFuncionario"
                placeholder="Digite o CPF ou a matrícula"
            >

            <button
                type="button"
                id="btnPesquisarFuncionario"
                class="btn-primary"
            >
                Pesquisar
            </button>

        </div>

        <div id="resultadoPesquisa"></div>
    `;

    const btnPesquisar =
        document.getElementById(
            "btnPesquisarFuncionario"
        );

    btnPesquisar.addEventListener(
        "click",
        pesquisarFuncionario
    );
}

async function pesquisarFuncionario() {
    const pesquisa = document
        .getElementById("pesquisaFuncionario")
        .value
        .trim();

    const resultado =
        document.getElementById(
            "resultadoPesquisa"
        );

    if (!pesquisa) {
        exibirMensagem(
            "Informe o CPF ou a matrícula.",
            "erro"
        );

        return;
    }

    resultado.innerHTML =
        `<p class="lista-vazia">Pesquisando...</p>`;

    try {
        /*
            Exemplo de rota:

            GET /api/funcionarios/pesquisar?valor=1001
        */

        const response = await fetch(
            `${API_URL}/pesquisar?valor=${encodeURIComponent(pesquisa)}`,
            {
                headers: criarHeaders()
            }
        );

        const funcionario =
            await lerResposta(response);

        if (!response.ok) {
            throw new Error(
                obterMensagemErro(funcionario)
            );
        }

        resultado.innerHTML =
            criarFormularioFuncionario(
                "atualizar",
                funcionario
            );

        aplicarMascaras();

        const formulario =
            document.getElementById(
                "formFuncionario"
            );

        formulario.addEventListener(
            "submit",
            atualizarFuncionario
        );

    } catch (erro) {
        resultado.innerHTML = "";

        exibirMensagem(
            erro.message ||
            "Funcionário não encontrado.",
            "erro"
        );
    }
}

async function atualizarFuncionario(event) {
    event.preventDefault();

    const funcionario =
        obterDadosFormulario();

    const funcionarioId =
        document.getElementById(
            "funcionarioId"
        ).value;

    try {
        alterarBotaoFormulario(
            true,
            "Atualizando..."
        );

        const response = await fetch(
            `${API_URL}/${funcionarioId}`,
            {
                method: "PUT",
                headers: criarHeaders(),
                body: JSON.stringify(funcionario)
            }
        );

        const resposta =
            await lerResposta(response);

        if (!response.ok) {
            throw new Error(
                obterMensagemErro(resposta)
            );
        }

        exibirMensagem(
            "Funcionário atualizado com sucesso.",
            "sucesso"
        );

    } catch (erro) {
        exibirMensagem(
            erro.message ||
            "Não foi possível atualizar o funcionário.",
            "erro"
        );

    } finally {
        alterarBotaoFormulario(
            false,
            "Atualizar"
        );
    }
}

/* =========================
   LISTAGEM
========================= */

async function abrirListaFuncionarios() {
    modalTitulo.textContent =
        "Funcionários sob minha jurisdição";

    modalDescricao.textContent =
        "Funcionários que estão sob sua responsabilidade.";

    modalConteudo.innerHTML =
        `<p class="lista-vazia">Carregando funcionários...</p>`;

    try {
        /*
            Exemplo de rota:

            GET /api/funcionarios/jurisdicao
        */

        const response = await fetch(
            `${API_URL}/jurisdicao`,
            {
                headers: criarHeaders()
            }
        );

        const funcionarios =
            await lerResposta(response);

        if (!response.ok) {
            throw new Error(
                obterMensagemErro(funcionarios)
            );
        }

        renderizarTabela(funcionarios);

    } catch (erro) {
        modalConteudo.innerHTML =
            `<p class="lista-vazia">
                Não foi possível carregar os funcionários.
            </p>`;

        exibirMensagem(
            erro.message,
            "erro"
        );
    }
}

function renderizarTabela(funcionarios) {
    if (
        !Array.isArray(funcionarios) ||
        funcionarios.length === 0
    ) {
        modalConteudo.innerHTML = `
            <p class="lista-vazia">
                Nenhum funcionário encontrado.
            </p>
        `;

        return;
    }

    const linhas = funcionarios
        .map(function (funcionario) {
            return `
                <tr>
                    <td>${funcionario.matricula}</td>
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.email}</td>
                    <td>${funcionario.hierarquia}</td>

                    <td>
                        <button
                            type="button"
                            class="btn-editar"
                            data-id="${funcionario.id}"
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        })
        .join("");

    modalConteudo.innerHTML = `
        <div class="table-container">

            <table>

                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Hierarquia</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    ${linhas}
                </tbody>

            </table>

        </div>
    `;

    document
        .querySelectorAll(".btn-editar")
        .forEach(function (botao) {
            botao.addEventListener(
                "click",
                function () {
                    abrirEdicaoPeloId(
                        botao.dataset.id
                    );
                }
            );
        });
}

async function abrirEdicaoPeloId(id) {
    try {
        const response = await fetch(
            `${API_URL}/${id}`,
            {
                headers: criarHeaders()
            }
        );

        const funcionario =
            await lerResposta(response);

        if (!response.ok) {
            throw new Error(
                obterMensagemErro(funcionario)
            );
        }

        modalTitulo.textContent =
            "Atualizar funcionário";

        modalDescricao.textContent =
            "Altere os dados necessários.";

        modalConteudo.innerHTML =
            criarFormularioFuncionario(
                "atualizar",
                funcionario
            );

        aplicarMascaras();

        document
            .getElementById("formFuncionario")
            .addEventListener(
                "submit",
                atualizarFuncionario
            );

    } catch (erro) {
        exibirMensagem(
            erro.message,
            "erro"
        );
    }
}

/* =========================
   FORMULÁRIO DINÂMICO
========================= */

function criarFormularioFuncionario(
    modo,
    funcionario = {}
) {
    const textoBotao =
        modo === "cadastrar"
            ? "Cadastrar"
            : "Atualizar";

    return `
        <form id="formFuncionario">

            <input
                type="hidden"
                id="funcionarioId"
                value="${funcionario.id ?? ""}"
            >

            <div class="form-grid">

                <div class="form-group">
                    <label for="cpf">CPF</label>

                    <input
                        type="text"
                        id="cpf"
                        maxlength="14"
                        placeholder="000.000.000-00"
                        value="${formatarCpf(funcionario.cpf ?? "")}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="matricula">
                        Matrícula
                    </label>

                    <input
                        type="number"
                        id="matricula"
                        min="1"
                        value="${funcionario.matricula ?? ""}"
                        required
                    >
                </div>

                <div class="form-group full-width">
                    <label for="nome">
                        Nome completo
                    </label>

                    <input
                        type="text"
                        id="nome"
                        value="${funcionario.nome ?? ""}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="email">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        value="${funcionario.email ?? ""}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="telefone">
                        Telefone
                    </label>

                    <input
                        type="text"
                        id="telefone"
                        maxlength="15"
                        value="${formatarTelefone(
                            funcionario.telefone ?? ""
                        )}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="dataDeNascimento">
                        Data de nascimento
                    </label>

                    <input
                        type="date"
                        id="dataDeNascimento"
                        value="${
                            funcionario.dataDeNascimento ?? ""
                        }"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="hierarquia">
                        Hierarquia
                    </label>

                    <select
                        id="hierarquia"
                        required
                    >
                        ${criarOpcoesHierarquia(
                            funcionario.hierarquia
                        )}
                    </select>
                </div>

            </div>

            <div class="form-actions">

                <button
                    type="button"
                    class="btn-secondary"
                    id="btnCancelarFormulario"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    id="btnEnviarFormulario"
                    class="btn-primary"
                >
                    ${textoBotao}
                </button>

            </div>

        </form>
    `;
}

function criarOpcoesHierarquia(
    hierarquiaSelecionada = ""
) {
    const hierarquias = [
        "Funcionario",
        "Supervisor",
        "Gerente",
        "Administrador"
    ];

    let opcoes = `
        <option value="">
            Selecione
        </option>
    `;

    hierarquias.forEach(function (hierarquia) {
        const selecionado =
            hierarquia === hierarquiaSelecionada
                ? "selected"
                : "";

        opcoes += `
            <option
                value="${hierarquia}"
                ${selecionado}
            >
                ${hierarquia}
            </option>
        `;
    });

    return opcoes;
}

function obterDadosFormulario() {
    return {
        cpf: removerFormatacao(
            document.getElementById("cpf").value
        ),

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
            document.getElementById("telefone").value
        ),

        dataDeNascimento: document
            .getElementById("dataDeNascimento")
            .value,

        hierarquia: document
            .getElementById("hierarquia")
            .value
    };
}

/* =========================
   MÁSCARAS
========================= */

function aplicarMascaras() {
    const cpfInput =
        document.getElementById("cpf");

    const telefoneInput =
        document.getElementById("telefone");

    const btnCancelar =
        document.getElementById(
            "btnCancelarFormulario"
        );

    if (cpfInput) {
        cpfInput.addEventListener(
            "input",
            function () {
                this.value =
                    formatarCpf(this.value);
            }
        );
    }

    if (telefoneInput) {
        telefoneInput.addEventListener(
            "input",
            function () {
                this.value =
                    formatarTelefone(this.value);
            }
        );
    }

    if (btnCancelar) {
        btnCancelar.addEventListener(
            "click",
            fecharModal
        );
    }
}

function formatarCpf(valor) {
    const numeros =
        removerFormatacao(String(valor))
            .slice(0, 11);

    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatarTelefone(valor) {
    const numeros =
        removerFormatacao(String(valor))
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
    return String(valor).replace(/\D/g, "");
}

/* =========================
   FUNÇÕES AUXILIARES
========================= */

function criarHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };

    const token =
        localStorage.getItem("token");

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    return headers;
}

async function lerResposta(response) {
    const contentType =
        response.headers.get("content-type");

    if (
        contentType &&
        contentType.includes("application/json")
    ) {
        return await response.json();
    }

    return null;
}

function obterMensagemErro(resposta) {
    return (
        resposta?.mensagem ||
        resposta?.message ||
        resposta?.title ||
        "Não foi possível concluir a operação."
    );
}

function exibirMensagem(texto, tipo) {
    modalMensagem.textContent = texto;

    modalMensagem.className =
        `mensagem ${tipo}`;
}

function ocultarMensagem() {
    modalMensagem.textContent = "";

    modalMensagem.className =
        "mensagem";
}

function alterarBotaoFormulario(
    carregando,
    texto
) {
    const botao =
        document.getElementById(
            "btnEnviarFormulario"
        );

    if (!botao) {
        return;
    }

    botao.disabled = carregando;
    botao.textContent = texto;
}

let tempoToast;

function mostrarToast(tipo, titulo, mensagem) {
    const toast = document.getElementById("toast");
    const toastTitulo =
        document.getElementById("toastTitulo");
    const toastMensagem =
        document.getElementById("toastMensagem");

    if (!toast || !toastTitulo || !toastMensagem) {
        console.error(
            "Os elementos do toast não foram encontrados no HTML."
        );

        return;
    }

    /*
        Remove apenas as classes usadas anteriormente,
        evitando que o toast mantenha duas cores.
    */
    toast.classList.remove(
        "show",
        "success",
        "error",
        "warning",
        "info"
    );

    toast.classList.add(tipo);

    toastTitulo.textContent = titulo;
    toastMensagem.textContent = mensagem;

    /*
        Força o navegador a reconhecer que a classe
        show foi removida antes de adicioná-la novamente.
    */
    void toast.offsetWidth;

    toast.classList.add("show");

    clearTimeout(tempoToast);

    tempoToast = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}