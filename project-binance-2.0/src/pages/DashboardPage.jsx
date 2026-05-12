import { useMarketData } from '../hooks/useMarketData';
import { CryptoTable }   from '../components/market/CryptoTable';
import { Spinner }        from '../components/common/Spinner';
import './DashboardPage.css';

/* ── Helpers ──────────────────────────────────────────────────── */
function fmtLarge(n) {
  if (n == null) return '—';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toFixed(2)}`;
}

function fmtPrice(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n >= 1 ? 2 : 6,
    maximumFractionDigits: n >= 1 ? 2 : 6,
  }).format(n);
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`stat-card ${accent ? 'stat-card--accent' : ''}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  );
}

/* ── Component ────────────────────────────────────────────────── */
export function DashboardPage() {
  const { coins, loading, error, lastUpdated } = useMarketData({ perPage: 10 });

  const btc  = coins.find(c => c.id === 'bitcoin');
  const eth  = coins.find(c => c.id === 'ethereum');
  const totalCap = coins.reduce((acc, c) => acc + (c.market_cap || 0), 0);
  const totalVol = coins.reduce((acc, c) => acc + (c.total_volume || 0), 0);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Resumen del mercado de criptomonedas</p>
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

      {/* Stats */}
      {!loading && !error && (
        <div className="stats-grid">
          <StatCard
            label="Bitcoin"
            value={fmtPrice(btc?.current_price)}
            sub={`${btc?.price_change_percentage_24h?.toFixed(2) ?? '—'}% (24h)`}
            accent
          />
          <StatCard
            label="Ethereum"
            value={fmtPrice(eth?.current_price)}
            sub={`${eth?.price_change_percentage_24h?.toFixed(2) ?? '—'}% (24h)`}
          />
          <StatCard
            label="Cap. de Mercado (Top 10)"
            value={fmtLarge(totalCap)}
            sub="Suma de los 10 principales"
          />
          <StatCard
            label="Volumen 24h (Top 10)"
            value={fmtLarge(totalVol)}
            sub="Suma de los 10 principales"
          />
        </div>
      )}

      {/* Table */}
      <section className="dashboard__section">
        <h3 className="section-title">Top 10 Criptomonedas</h3>

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
          <CryptoTable coins={coins} compact />
        )}
      </section>
    </div>
  );
}
