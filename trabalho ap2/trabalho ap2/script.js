// Função para buscar dados econômicos da API do Banco Central
async function fetchEconomicData() {
  try {
    const selicUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json';
    const ipcaUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json';
    const cdiUrl = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json';

    const [selicData, ipcaData, cdiData] = await Promise.all([
      fetch(selicUrl).then(response => response.json()),
      fetch(ipcaUrl).then(response => response.json()),
      fetch(cdiUrl).then(response => response.json())
    ]);

    const selicRate = selicData[selicData.length - 1].valor;
    const ipcaRate = ipcaData[ipcaData.length - 1].valor;
    const cdiRate = cdiData[cdiData.length - 1].valor;

    document.getElementById('selic-rate').textContent = `Taxa Selic: ${selicRate}%`;
    document.getElementById('ipca-rate').textContent = `IPCA: ${ipcaRate}%`;
    document.getElementById('cdi-rate').textContent = `CDI: ${cdiRate}%`;
  } catch (error) {
    console.error('Erro ao buscar dados econômicos:', error);
  }
}

// Função para buscar cotações de moedas da AwesomeAPI
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

// Função que realiza a simulação de investimentos ao submeter o formulário
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

  // Exibe o resultado da simulação
  document.getElementById('simulation-result').style.display = 'block';
  document.getElementById('investment-summary').innerHTML =
    `<strong>Tipo de Investimento:</strong> ${investmentName}<br>` +
    `<strong>Valor Inicial:</strong> R$ ${initialValue.toFixed(2)}<br>` +
    `<strong>Valor Final após ${years} anos:</strong> R$ ${finalValue.toFixed(2)}`;

  const ctx = document.getElementById('investment-chart').getContext('2d');

  // Destrói gráfico antigo se já existir
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Cria novo gráfico usando Chart.js
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Valor Inicial', 'Valor Final'],
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

// Executa as funções de API ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  fetchEconomicData();
  fetchCurrencyRates();

  // Listener para o formulário
  document.getElementById('investment-form').addEventListener('submit', simulateInvestment);
});
