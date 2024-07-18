const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "CG-LYgWxPWd4ME953GEqXsZuAGL"

const getCoinList = (page, vs_currency) => `${BASE_URL}/coins/markets?vs_currency=${vs_currency}&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`

const searchCoin = query => `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`

const  marketChart = (id, vs_currency) => `${BASE_URL}/coins/${id}/market_chart?vs_currency=${vs_currency}&days=7&x_cg_demo_api_key=${API_KEY}`

export {getCoinList, searchCoin, marketChart}