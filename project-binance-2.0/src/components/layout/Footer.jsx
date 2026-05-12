import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">
        © {new Date().getFullYear()} CryptoTrack — Datos de{' '}
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          CoinGecko
        </a>
        . Solo para fines educativos.
      </p>
    </footer>
  );
}
