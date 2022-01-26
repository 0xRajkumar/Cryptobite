
const CoinList = (currency) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

const HistoricalChart = (id, days = 365, currency) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const TrendingCoins = (currency) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
const Exchanges = () => `https://api.coingecko.com/api/v3/exchanges`

const Currencies = () => `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;
export { CoinList, SingleCoin, HistoricalChart, TrendingCoins, Currencies, Exchanges }
