
const URL_API = "http://localhost:3000";

const urlInput = document.getElementById("url-input");
const urlButton = document.getElementById("url-button");
const urlResult = document.getElementById("url-result");

const copyButton = document.getElementById("copy-button"); 
copyButton.style.display = "none";




// quando o botão for clicado
urlButton.addEventListener("click", async () => {
    // pega o valor do input
    const url = urlInput.value;
    // verifica se o valor é uma url
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(url)) {
        alert("URL inválida");
        return;
    }


    // faz uma requisição para a API
    const response = await fetch(`${URL_API}/short_url`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'link': url })
    });


    // // converte a resposta para json
    const data = await response.json();

    // // mostra o resultado na tela
    if (data.short_link) {
        urlResult.innerHTML = `<a href="${data.short_link}" target="_blank">${data.short_link}</a>`;
        // mostra o botão de copiar
        copyButton.style.display = "block";
        urlInput.value = "";
    } else {
        alert("Erro ao encurtar a URL");
    }
})

// quando o enter for pressionado
urlInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        urlButton.click();
    }
})

// quando o botão de copiar for clicado
copyButton.addEventListener("click", () => {
    // pega o valor do resultado
    const url = urlResult.querySelector("a").href;
    // verifica se o valor é uma url
    if (url === "") {
        alert("URL inválida");
        return;
    }
    // copia a url para a área de transferência
    navigator.clipboard.writeText(url).then(() => {
        copyButton.innerHTML = "Copiado!";
        copyButton.style.backgroundColor = "#4CAF50";
    }, () => {
        alert("Erro ao copiar a URL");
    });
})