import { useState } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { CryptoTable }   from '../components/market/CryptoTable';
import { Spinner }        from '../components/common/Spinner';
import './MarketPage.css';

const CURRENCIES = [
  { value: 'usd', label: 'USD ($)' },
  { value: 'eur', label: 'EUR (€)' },
  { value: 'btc', label: 'BTC (₿)' },
];

export function MarketPage() {
  const [search, setSearch]     = useState('');
  const [currency, setCurrency] = useState('usd');
  const [perPage]               = useState(20);

  const { coins, loading, error, lastUpdated, refresh } = useMarketData({
    vsCurrency: currency,
    perPage,
  });

  const filtered = coins.filter(
    c =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="market-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Mercado</h2>
          <p className="page-subtitle">
            Top {perPage} monedas · Se actualiza cada 5 s
          </p>
        </div>
        <div className="refresh-info">
          <span className="refresh-dot" aria-hidden="true" />
          <span className="refresh-text">
            {lastUpdated
              ? `Actualizado ${lastUpdated.toLocaleTimeString('es-CR')}`
              : 'Actualizando...'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="market-controls">
        <input
          type="search"
          className="market-search"
          placeholder="Buscar moneda..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Buscar moneda"
        />

        <select
          className="market-select"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          aria-label="Moneda de cotización"
        >
          {CURRENCIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <button
          className="market-refresh-btn"
          onClick={refresh}
          disabled={loading}
          aria-label="Actualizar ahora"
        >
          ↻ Actualizar
        </button>
      </div>

      {/* Table */}
      {loading && (
        <div className="centered">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div className="error-box" role="alert">
          <strong>Error al cargar datos:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {search && (
            <p className="market-results">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para&nbsp;
              <strong>"{search}"</strong>
            </p>
          )}
          <CryptoTable coins={filtered} />
        </>
      )}
    </div>
  );
}
