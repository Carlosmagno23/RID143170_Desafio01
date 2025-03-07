document.getElementById("DadosdeInput").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let cep = document.getElementById("cepInput").value;
    let latitude = document.getElementById("latitudeInput").value;
    let longitude = document.getElementById("longitudeInput").value;

    if (cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("cepResultado").innerHTML = `
                    <tr>
                        <td>${data.logradouro || 'N/A'}</td>
                        <td>${data.bairro || 'N/A'}</td>
                        <td>${data.localidade}/${data.uf}</td>
                    </tr>
                `;
            })
            .catch(() => alert("Erro ao buscar o CEP!"));
    }

    if (latitude && longitude) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("TempoResultado").innerText = 
                    `Previsão do tempo de acordo com a região: ${data.current_weather.temperature}°C`;
            })
            .catch(() => alert("Erro ao buscar a previsão do tempo!"));
    }
});
