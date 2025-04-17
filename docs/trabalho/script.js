// Aguarda o carregamento do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {

    // 📌 1. Validação Personalizada do Formulário de Contato
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let mensagem = document.getElementById("mensagem").value.trim();

        if (nome === "" || email === "" || mensagem === "") {
            alert("Por favor, preencha todos os campos antes de enviar.");
        } else {
            alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
            this.reset(); // Limpa os campos do formulário após o envio
        }
    });

    // 📌 2. Máscara para o campo de telefone no formulário de reserva
    document.getElementById("telefone").addEventListener("input", function (event) {
        let value = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (value.length >= 11) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        } else if (value.length >= 7) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length >= 2) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            event.target.value = value;
        }
    });

    // 📌 3. Rolagem Suave ao Clicar nos Links do Menu
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            let destino = document.querySelector(this.getAttribute("href"));
            destino.scrollIntoView({ behavior: "smooth" });
        });
    });

});
