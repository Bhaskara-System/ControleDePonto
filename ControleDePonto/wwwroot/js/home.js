const token = localStorage.getItem("logado");

if (!token) {
    window.location.href = "/";
}

const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", function () {
    localStorage.removeItem("logado");
    window.location.href = "/";
});