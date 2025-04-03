document.getElementById("DadosdeInput").addEventListener("submit", async function (e) {
    e.preventDefault();

    let nome = document.getElementById("NomeInput").value.trim();
    let cep = document.getElementById("cepInput").value.trim();
    let latitude = document.getElementById("latitudeInput").value.trim();
    let longitude = document.getElementById("longitudeInput").value.trim();

    let erroNome = document.getElementById("erroNome");
    let erroLatLong = document.getElementById("erroLatLong");

    if (nome === "") {
        erroNome.classList.remove("d-none");
        return;
    } else {
        erroNome.classList.add("d-none");
    }

    if (cep) {
        try {
            let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            document.getElementById("cepResultado").innerHTML = `
                <tr>
                    <td>${data.logradouro || 'N/A'}</td>
                    <td>${data.bairro || 'N/A'}</td>
                    <td>${data.localidade}/${data.uf}</td>
                </tr>
            `;
        } catch (error) {
            alert("Erro ao buscar o CEP!");
        }
    }
    
    if (latitude && longitude) {
        if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            erroLatLong.classList.remove("d-none");
            return;
        } else {
            erroLatLong.classList.add("d-none");
        }

        try {
            let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            let data = await response.json();

            document.getElementById("TempoResultado").innerText =
                `Previsão do tempo de acordo com a região: ${data.current_weather.temperature}°C`;
        } catch (error) {
            alert("Erro ao buscar a previsão do tempo!");
        }
    }
});