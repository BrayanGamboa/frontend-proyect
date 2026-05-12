import './CryptoTable.css';

/* ── Helpers ──────────────────────────────────────────────────── */
function fmt(n, opts = {}) {
  if (n == null) return '—';
  return new Intl.NumberFormat('es-CR', opts).format(n);
}

function fmtPrice(n) {
  return fmt(n, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n >= 1 ? 2 : 6,
    maximumFractionDigits: n >= 1 ? 2 : 6,
  });
}

function fmtLarge(n) {
  if (n == null) return '—';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return fmtPrice(n);
}

function PctBadge({ value }) {
  if (value == null) return <span className="pct pct--neutral">—</span>;
  const isUp = value >= 0;
  return (
    <span className={`pct ${isUp ? 'pct--up' : 'pct--down'}`}>
      {isUp ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  );
}

/* ── Component ────────────────────────────────────────────────── */
/**
 * @param {Array}   coins    — array from CoinGecko /coins/markets
 * @param {boolean} compact  — show fewer columns (for Dashboard)
 */
export function CryptoTable({ coins = [], compact = false }) {
  if (!coins.length) {
    return <p className="table-empty">No hay datos disponibles.</p>;
  }

  return (
    <div className="crypto-table-wrap">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="col-rank">#</th>
            <th className="col-name">Nombre</th>
            <th className="col-price">Precio</th>
            <th className="col-pct">24 h %</th>
            {!compact && <th className="col-cap">Cap. Mercado</th>}
            {!compact && <th className="col-vol">Volumen 24 h</th>}
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.id} className="crypto-row">
              <td className="col-rank text-muted">{coin.market_cap_rank}</td>
              <td className="col-name">
                <div className="coin-name">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    loading="lazy"
                    className="coin-icon"
                  />
                  <span className="coin-fullname">{coin.name}</span>
                  <span className="coin-symbol">{coin.symbol?.toUpperCase()}</span>
                </div>
              </td>
              <td className="col-price font-mono">{fmtPrice(coin.current_price)}</td>
              <td className="col-pct">
                <PctBadge value={coin.price_change_percentage_24h} />
              </td>
              {!compact && (
                <td className="col-cap text-secondary font-mono">
                  {fmtLarge(coin.market_cap)}
                </td>
              )}
              {!compact && (
                <td className="col-vol text-secondary font-mono">
                  {fmtLarge(coin.total_volume)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
