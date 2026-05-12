import { useState, useEffect, useCallback, useRef } from 'react';
import { cryptoService } from '../services/CryptoService';

const REFRESH_INTERVAL = 600000; // ms

/**
 * useMarketData — fetches coin list and auto-refreshes every 5 s.
 *
 * @param {Object} options  — forwarded to CryptoService.getMarkets()
 * @returns {{ coins, loading, error, lastUpdated, refresh }}
 */
export function useMarketData(options = {}) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  // Stable reference — options object changes every render so stringify it
  const optionsKey = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    try {
      const data = await cryptoService.getMarkets(JSON.parse(optionsKey));
      setCoins(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey]);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [fetchData]);

  return { coins, loading, error, lastUpdated, refresh: fetchData };
}
