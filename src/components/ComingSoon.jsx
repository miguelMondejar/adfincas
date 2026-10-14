import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "../assets/logos/adfincas-logo-1.png";
import "./ComingSoon.css";

export default function ComingSoon() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Próximamente | Grupo ADFincas</title>
        <meta
          name="description"
          content="Estamos preparando la nueva web de Grupo ADFincas. Muy pronto estaremos aquí."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="coming-soon">
        <section className="coming-soon__content" aria-labelledby="coming-soon-title">
          <img className="coming-soon__logo" src={logo} alt="Grupo ADFincas" />
          <div className="coming-soon__rule" aria-hidden="true" />
          <p className="coming-soon__eyebrow">GRUPO ADFINCAS</p>
          <h1 id="coming-soon-title">Estamos preparando algo nuevo.</h1>
          <p className="coming-soon__message">
            🚧 Nuestra nueva web está en construcción. Muy pronto estaremos aquí
            para ayudarte.
          </p>
          <p className="coming-soon__signature">Administración de fincas y servicios inmobiliarios</p>
        </section>
      </main>
    </HelmetProvider>
  );
}