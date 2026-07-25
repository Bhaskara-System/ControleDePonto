const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "/";
});