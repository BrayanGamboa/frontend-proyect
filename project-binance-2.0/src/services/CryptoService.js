import { ApiService } from './ApiService';

/**
 * CryptoService — CoinGecko API integration.
 * Extends the global ApiService class.
 * Docs: https://www.coingecko.com/api/documentation
 */
class CryptoService extends ApiService {
  constructor() {
    super('https://api.coingecko.com/api/v3');
  }

  /**
   * Top coins by market cap.
   * @param {Object} opts
   * @param {string} opts.vsCurrency  — quote currency (default 'usd')
   * @param {number} opts.perPage     — results per page (default 20)
   * @param {number} opts.page        — page number (default 1)
   */
  getMarkets({ vsCurrency = 'usd', perPage = 20, page = 1 } = {}) {
    return this.get('/coins/markets', {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    });
  }

  getGlobalStats() {
    return this.get('/global');
  }

  getTrending() {
    return this.get('/search/trending');
  }

  getCoinDetail(id) {
    return this.get(`/coins/${id}`, {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
    });
  }
}

export const cryptoService = new CryptoService();
