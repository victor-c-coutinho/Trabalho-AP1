// Função para buscar dados econômicos da API do Banco Central
async function fetchEconomicData() {
  try {
    // URLs das APIs
    const selicUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json';
    const ipcaUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json';
    const cdiUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json';

    // Fetching dos dados
    const [selicData, ipcaData, cdiData] = await Promise.all([
      fetch(selicUrl).then(response => response.json()),
      fetch(ipcaUrl).then(response => response.json()),
      fetch(cdiUrl).then(response => response.json())
    ]);

    // Extraindo os dados mais recentes
    const selicRate = selicData[selicData.length - 1].valor;
    const ipcaRate = ipcaData[ipcaData.length - 1].valor;
    const cdiRate = cdiData[cdiData.length - 1].valor;

    // Exibindo os dados na página
    document.getElementById('selic-rate').textContent = `Taxa Selic: ${selicRate}%`;
    document.getElementById('ipca-rate').textContent = `IPCA: ${ipcaRate}%`;
    document.getElementById('cdi-rate').textContent = `CDI: ${cdiRate}%`;
  } catch (error) {
    console.error('Erro ao buscar dados econômicos:', error);
  }
}

// Função para buscar cotações de moedas da API AwesomeAPI
async function fetchCurrencyRates() {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL';
    const response = await fetch(url);
    const data = await response.json();

    const usdRate = parseFloat(data.USDBRL.bid).toFixed(2);
    const eurRate = parseFloat(data.EURBRL.bid).toFixed(2);
    const btcRate = parseFloat(data.BTCBRL.bid).toFixed(2);

    document.getElementById('usd-rate').textContent = `Dólar: R$ ${usdRate}`;
    document.getElementById('eur-rate').textContent = `Euro: R$ ${eurRate}`;
    document.getElementById('btc-rate').textContent = `Bitcoin: R$ ${btcRate}`;
  } catch (error) {
    console.error('Erro ao buscar cotações de moedas:', error);
  }
}

// Função para simular investimentos
function simulateInvestment(event) {
  event.preventDefault();

  const initialValue = parseFloat(document.getElementById('initial-value').value);
  const investmentType = document.getElementById('investment-type').value;

  let rateOfReturn;
  let investmentName;

  switch (investmentType) {
    case 'renda-fixa':
      rateOfReturn = 0.06; // 6% ao ano
      investmentName = 'Renda Fixa';
      break;
    case 'renda-variavel':
      rateOfReturn = 0.10; // 10% ao ano
      investmentName = 'Renda Variável';
      break;
    case 'criptomoedas':
      rateOfReturn = 0.15; // 15% ao ano
      investmentName = 'Criptomoedas';
      break;
    default:
      rateOfReturn = 0;
      investmentName = 'Desconhecido';
  }

  const years = 5;
  const finalValue = initialValue * Math.pow(1 + rateOfReturn, years);

  document.getElementById('simulation-result').style.display = 'block';
  document.getElementById('investment-summary').textContent =
    `Tipo de Investimento: ${investmentName}\n` +
    `Valor Inicial: R$ ${initialValue.toFixed(2)}\n` +
    `Valor Final após ${years} anos: R$ ${finalValue.toFixed(2)}`;

  const ctx = document.getElementById('investment-chart').getContext('2d');

  // Destroi gráfico antigo, se já existir (evita erro na recriação do gráfico)
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Criação de gráfico com Chart.js
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Inicial', 'Final'],
      datasets: [{
        label: 'Valor (R$)',
        data: [initialValue, finalValue],
        backgroundColor: ['#4CAF50', '#FFC107'],
        borderColor: ['#388E3C', '#FF9800'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
