


async function getMarkets() {
  try {
    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1");
    
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderMarkets() {
  let markets = await getMarkets();
  let tableRows = '';
  let tableRowsSegment = '';
  markets.forEach((market, i) => {
    if (market.symbol === 'usdt') {
      tableRowsSegment = `
      <tr>
        <td class='table_markets_cell-green'>${market.id}</td>
        <td class='table_markets_cell-green'>${market.symbol}</td>
        <td class='table_markets_cell-green'>${market.name}</td>
      </tr>`;
    } else if (i < 5 && market.symbol !== 'usdt') {
      tableRowsSegment = `
      <tr>
        <td class='table_markets_cell-blue'>${market.id}</td>
        <td class='table_markets_cell-blue'>${market.symbol}</td>
        <td class='table_markets_cell-blue'>${market.name}</td>
      </tr>`;
    } else {
      tableRowsSegment = `
      <tr>
        <td>${market.id}</td>
        <td>${market.symbol}</td>
        <td>${market.name}</td>
      </tr>`;
    }
    tableRows += tableRowsSegment;
  });

  let tableMarkets = document.querySelector('.table_markets');
  tableMarkets.innerHTML += tableRows;
}

renderMarkets();

