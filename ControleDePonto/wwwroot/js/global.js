// ==========================================
// CENTRAL DE AUTENTICAÇÃO E SESSÃO (auth.js)
// ==========================================

const token = localStorage.getItem("token");

// 1. Bloqueio de Segurança: Se não tem token, redireciona para a tela inicial/login
if (!token) {
    window.location.href = "/";
}

// 2. Configuração de Eventos e Carga Inicial
document.addEventListener("DOMContentLoaded", () => {
    configurarLogout();
    carregarSessaoUsuario();
});

// 3. Logout Centralizado
function configurarLogout() {
    const btnSair = document.getElementById("btnSair");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario_sessao");
            window.location.href = "/";
        });
    }
}

// 4. Carregamento da Sessão (Cache primeiro, API como fallback)
async function carregarSessaoUsuario() {
    const sessaoCache = localStorage.getItem("usuario_sessao");

    if (sessaoCache) {
        try {
            const usuario = JSON.parse(sessaoCache);
            atualizarInterfaceSessao(usuario);
            return;
        } catch (erro) {
            console.error("Erro ao ler cache, buscando da API...", erro);
        }
    }

    // Se não houver cache ou se estiver corrompido, busca na API
    await buscarPerfilApi();
}

async function buscarPerfilApi() {
    try {
        const response = await fetch("/api/Perfil/meu-perfil", {
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
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const usuario = await response.json();
        localStorage.setItem("usuario_sessao", JSON.stringify(usuario));
        atualizarInterfaceSessao(usuario);

    } catch (erro) {
        console.error("Erro ao carregar dados da sessão:", erro);
    }
}

// 5. Preenchimento Automático da Interface
function atualizarInterfaceSessao(usuario) {
    const nome = usuario.nome || usuario.Nome || "Usuário";
    const hierarquia = usuario.hierarquia || usuario.Hierarquia || usuario.cargo || "Funcionário";
    const foto = usuario.fotoUrl || usuario.FotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=0f172a&color=fff`;

    // Atualiza a Sidebar se os elementos existirem na página atual
    setText("nomeSidebar", nome);
    setText("cargoSidebar", hierarquia);

    const elAvatar = document.getElementById("avatarSidebar");
    if (elAvatar) {
        elAvatar.src = foto;
    }

    // Atualiza a saudação da Home se o elemento existir
    const elUsuarioLogado = document.getElementById("usuarioLogado");
    if (elUsuarioLogado) {
        elUsuarioLogado.textContent = `Bem-vindo(a), ${nome}!`;
    }
}

function setText(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = valor;
    }
}