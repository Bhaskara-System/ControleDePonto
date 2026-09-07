// ==========================================
// REGISTROS DE PONTO (registros.js)
// ==========================================

const API_URL = "/api/Registros";
const tabelaRegistros = document.getElementById("tabelaRegistros");

// 1. Mapeamento de Classes CSS de Status
function obterClasseStatus(status) {
    if (!status) return "status";

    const st = status.toLowerCase();
    if (st.includes("normal") || st.includes("presente") || st.includes("ok")) {
        return "status presente";
    }
    if (st.includes("atraso") || st.includes("atrasado")) {
        return "status atrasado";
    }
    if (st.includes("falta") || st.includes("ausente")) {
        return "status falta";
    }
    return "status";
}

// 2. Requisição e Renderização da Tabela
async function carregarRegistros() {
    if (!tabelaRegistros) return;

    try {
        const token = localStorage.getItem("token");

        const resposta = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!resposta.ok) {
            if (resposta.status === 401) {
                // Se não autorizado, o global.js já tratará, mas limpamos os caches por segurança
                localStorage.removeItem("token");
                localStorage.removeItem("usuario_sessao");
                window.location.href = "/";
                return;
            }

            tabelaRegistros.innerHTML = `
                <tr>
                    <td colspan="4">Erro ao carregar registros.</td>
                </tr>
            `;
            return;
        }

        const registros = await resposta.json();

        if (!Array.isArray(registros) || registros.length === 0) {
            tabelaRegistros.innerHTML = `
                <tr>
                    <td colspan="4">Nenhum registro encontrado.</td>
                </tr>
            `;
            return;
        }

        // Monta as linhas da tabela
        tabelaRegistros.innerHTML = registros.map(registro => {
            const classeStatus = obterClasseStatus(registro.status);
            return `
                <tr>
                    <td>${registro.data}</td>
                    <td>${registro.horaEntrada}</td>
                    <td>${registro.horaSaida ?? "-"}</td>
                    <td><span class="${classeStatus}">${registro.status}</span></td>
                </tr>
            `;
        }).join("");

    } catch (erro) {
        console.error("Erro ao carregar registros:", erro);
        tabelaRegistros.innerHTML = `
            <tr>
                <td colspan="4">Erro ao conectar com a API.</td>
            </tr>
        `;
    }
}

// 3. Inicialização
document.addEventListener("DOMContentLoaded", () => {
    carregarRegistros();
});