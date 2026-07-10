const logado = localStorage.getItem("logado");

if (!logado) {
    window.location.href = "/";
}

const tabelaRegistros = document.getElementById("tabelaRegistros");
const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", function () {
    localStorage.removeItem("logado");
    window.location.href = "/";
});

async function carregarRegistros() {
    try {
        const resposta = await fetch("/api/Registros");

        if (!resposta.ok) {
            tabelaRegistros.innerHTML = `
                <tr>
                    <td colspan="4">Erro ao carregar registros.</td>
                </tr>
            `;
            return;
        }

        const registros = await resposta.json();

        if (registros.length === 0) {
            tabelaRegistros.innerHTML = `
                <tr>
                    <td colspan="4">Nenhum registro encontrado.</td>
                </tr>
            `;
            return;
        }

        tabelaRegistros.innerHTML = "";

        registros.forEach(registro => {
            tabelaRegistros.innerHTML += `
                <tr>
                    <td>${registro.data}</td>
                    <td>${registro.horaEntrada}</td>
                    <td>${registro.horaSaida ?? "-"}</td>
                    <td>${registro.status}</td>
                </tr>
            `;
        });

    } catch (erro) {
        tabelaRegistros.innerHTML = `
            <tr>
                <td colspan="4">Erro ao conectar com a API.</td>
            </tr>
        `;

        console.error("Erro:", erro);
    }
}

carregarRegistros();