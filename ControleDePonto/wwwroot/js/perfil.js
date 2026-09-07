// ==========================================
// PÁGINA DE PERFIL DO USUÁRIO (perfil.js)
// ==========================================

const API_URL = "/api/Perfil";

// IDs dos campos liberados no modo de edição
const CAMPOS_EDITAVEIS = [
    "perfilNomeCompleto",
    "perfilEmail",
    "perfilTelefone",
    "perfilDataNascimento"
];

let dadosOriginaisUsuario = null;

// ==========================================
// 1. INICIALIZAÇÃO E EVENTOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    carregarDadosPerfil();
    configurarEventosEdicao();
    configurarMascarasDinamicas();
});

function configurarEventosEdicao() {
    const btnEditar = document.getElementById("btnEditarPerfil");
    const btnCancelar = document.getElementById("btnCancelarEdicao");
    const formPerfil = document.getElementById("formPerfil");

    if (btnEditar) {
        btnEditar.addEventListener("click", () => alternarModoEdicao(true));
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if (dadosOriginaisUsuario) {
                preencherCamposPerfil(dadosOriginaisUsuario);
            }
            alternarModoEdicao(false);
        });
    }

    if (formPerfil) {
        formPerfil.addEventListener("submit", salvarAlteracoesPerfil);
    }
}

// Configura formatação dinâmica em tempo real durante a digitação
function configurarMascarasDinamicas() {
    const telefoneInput = document.getElementById("perfilTelefone");

    if (telefoneInput) {
        telefoneInput.addEventListener("input", function () {
            this.value = formatarTelefone(this.value);
        });
    }
}

// Alterna a propriedade readOnly dos inputs e a visibilidade dos botões
function alternarModoEdicao(emEdicao) {
    CAMPOS_EDITAVEIS.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.readOnly = !emEdicao;
        }
    });

    const btnVoltar = document.getElementById("btnVoltarInicio");
    const btnEditar = document.getElementById("btnEditarPerfil");
    const btnCancelar = document.getElementById("btnCancelarEdicao");
    const btnSalvar = document.getElementById("btnSalvarPerfil");

    if (emEdicao) {
        if (btnVoltar) btnVoltar.hidden = true;
        if (btnEditar) btnEditar.hidden = true;
        if (btnCancelar) btnCancelar.hidden = false;
        if (btnSalvar) btnSalvar.hidden = false;

        // Foca no primeiro campo editável
        const primeiroCampo = document.getElementById(CAMPOS_EDITAVEIS[0]);
        if (primeiroCampo) primeiroCampo.focus();
    } else {
        if (btnVoltar) btnVoltar.hidden = false;
        if (btnEditar) btnEditar.hidden = false;
        if (btnCancelar) btnCancelar.hidden = true;
        if (btnSalvar) btnSalvar.hidden = true;
    }
}

// ==========================================
// 2. REQUISIÇÕES (GET / PUT)
// ==========================================

async function carregarDadosPerfil() {
    const sessaoCache = localStorage.getItem("usuario_sessao");
    if (sessaoCache) {
        try {
            dadosOriginaisUsuario = JSON.parse(sessaoCache);
            preencherCamposPerfil(dadosOriginaisUsuario);
        } catch (erro) {
            console.error("Erro ao ler cache no perfil:", erro);
        }
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/meu-perfil`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario_sessao");
            window.location.href = "/";
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro ao carregar perfil: ${response.status}`);
        }

        const usuario = await response.json();

        dadosOriginaisUsuario = usuario;
        localStorage.setItem("usuario_sessao", JSON.stringify(usuario));
        preencherCamposPerfil(usuario);

    } catch (erro) {
        console.error("Erro ao atualizar dados do perfil via API:", erro);
    }
}

async function salvarAlteracoesPerfil(event) {
    event.preventDefault();

    const dadosAtualizados = {
        nome: document.getElementById("perfilNomeCompleto").value.trim(),
        email: document.getElementById("perfilEmail").value.trim(),
        telefone: document.getElementById("perfilTelefone").value.replace(/\D/g, ""),
        dataNascimento: document.getElementById("perfilDataNascimento").value
    };

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/atualizar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            throw new Error(`Erro ao salvar perfil: ${response.status}`);
        }

        const usuarioAtualizado = await response.json();

        dadosOriginaisUsuario = usuarioAtualizado;
        localStorage.setItem("usuario_sessao", JSON.stringify(usuarioAtualizado));
        
        preencherCamposPerfil(usuarioAtualizado);
        alternarModoEdicao(false);

        mostrarToast("success", "Perfil Atualizado!", "Suas informações foram salvas com sucesso.");

    } catch (erro) {
        console.error("Erro ao salvar perfil:", erro);
        mostrarToast("error", "Erro ao Salvar", "Não foi possível atualizar seus dados.");
    }
}

// ==========================================
// 3. PREENCHIMENTO DO FORMULÁRIO
// ==========================================

function preencherCamposPerfil(usuario) {
    if (!usuario) return;

    const nome = usuario.nome || usuario.Nome || "Usuário";
    const hierarquia = usuario.hierarquia || usuario.Hierarquia || usuario.cargo || "Funcionário";
    const foto = usuario.fotoUrl || usuario.FotoUrl || criarAvatar(nome);

    setText("perfilNome", nome);
    setText("perfilCargo", hierarquia);

    const perfilAvatar = document.getElementById("perfilAvatar");
    if (perfilAvatar) {
        perfilAvatar.src = foto;
    }

    setInputValue("perfilCpf", formatarCpf(usuario.cpf || usuario.Cpf || ""));
    setInputValue("perfilMatricula", usuario.matricula || usuario.Matricula || "");
    setInputValue("perfilNomeCompleto", nome);
    setInputValue("perfilEmail", usuario.email || usuario.Email || "");
    setInputValue("perfilTelefone", formatarTelefone(usuario.telefone || usuario.Telefone || ""));
    setInputValue("perfilHierarquia", hierarquia);
    
    const dataNascimento = usuario.dataNascimento || usuario.DataNascimento || "";
    setInputValue("perfilDataNascimento", dataNascimento.split("T")[0]);
}

function setText(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function setInputValue(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.value = valor;
    }
}

function criarAvatar(nome) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=0f172a&color=fff`;
}

// ==========================================
// 4. MÁSCARAS DE FORMATAÇÃO
// ==========================================

function formatarCpf(valor) {
    const numeros = String(valor).replace(/\D/g, "").slice(0, 11);
    if (numeros.length !== 11) return valor;

    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatarTelefone(valor) {
    const numeros = String(valor).replace(/\D/g, "").slice(0, 11);
    if (numeros.length === 0) return "";

    if (numeros.length <= 10) {
        return numeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

let tempoToast;
function mostrarToast(tipo, titulo, mensagem) {
    const toast = document.getElementById("toast");
    const toastTitulo = document.getElementById("toastTitulo");
    const toastMensagem = document.getElementById("toastMensagem");

    if (!toast || !toastTitulo || !toastMensagem) return;

    toast.classList.remove("show", "success", "error");
    toast.classList.add(tipo);

    toastTitulo.textContent = titulo;
    toastMensagem.textContent = mensagem;

    void toast.offsetWidth;
    toast.classList.add("show");

    clearTimeout(tempoToast);
    tempoToast = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}