"use client";

import { useState } from "react";

const defaultValues = {
  price: 3000,
  contract: 24,
  payoff: 12,
  support: 100,
};

type Results = {
  websiteRate: string;
  supportMonths: string;
  supportTotal: string;
  total: string;
  average: string;
  phaseText: React.ReactNode;
};

const emptyResults: Results = {
  websiteRate: "–",
  supportMonths: "–",
  supportTotal: "–",
  total: "–",
  average: "–",
  phaseText: "Nach der Berechnung erscheint hier der Zahlungsplan.",
};

function eur(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function Home() {
  const [values, setValues] = useState(defaultValues);
  const [results, setResults] = useState<Results>(emptyResults);
  const [error, setError] = useState("");

  function updateValue(field: keyof typeof defaultValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: Number(value),
    }));
  }

  function calculate() {
    const { price, contract, payoff, support } = values;

    setError("");

    if (
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(contract) ||
      contract <= 0 ||
      !Number.isFinite(payoff) ||
      payoff < 0 ||
      !Number.isFinite(support) ||
      support < 0
    ) {
      setError("Bitte gültige Werte eingeben.");
      return;
    }

    if (payoff > contract) {
      setError("Die Abzahlungsdauer kann nicht länger als die Vertragslaufzeit sein.");
      return;
    }

    if (payoff === 0) {
      const supportMonths = contract;
      const supportTotal = supportMonths * support;
      const total = price + supportTotal;
      const average = total / contract;

      setResults({
        websiteRate: `Einmalig ${eur(price)}`,
        supportMonths: `${supportMonths} Monate`,
        supportTotal: eur(supportTotal),
        total: eur(total),
        average: eur(average),
        phaseText: (
          <>
            Webseite: <b>{eur(price)}</b> einmalig.
            <br />
            Monat 1–{contract}: <b>{eur(support)}</b> pro Monat für Support & Betreuung.
          </>
        ),
      });
      return;
    }

    const websiteRate = price / payoff;
    const supportMonths = contract - payoff;
    const supportTotal = supportMonths * support;
    const total = price + supportTotal;
    const average = total / contract;

    setResults({
      websiteRate: eur(websiteRate),
      supportMonths: `${supportMonths} Monate`,
      supportTotal: eur(supportTotal),
      total: eur(total),
      average: eur(average),
      phaseText: (
        <>
          Monat 1–{payoff}: <b>{eur(websiteRate)}</b> pro Monat für die Webseite.
          <br />
          {supportMonths > 0 ? (
            <>
              Monat {payoff + 1}–{contract}: <b>{eur(support)}</b> pro Monat für Support &
              Betreuung.
            </>
          ) : (
            "Der Support beginnt erst nach Ende der Vertragslaufzeit."
          )}
        </>
      ),
    });
  }

  function reset() {
    setValues(defaultValues);
    setResults(emptyResults);
    setError("");
  }

  return (
    <>
      <div className="ambient-particles" aria-hidden="true">
        <span className="ambient-particle" />
        <span className="ambient-particle" />
        <span className="ambient-particle" />
        <span className="ambient-particle" />
      </div>
      <main className="page">
        <header className="site-header">
          <div className="brand" aria-label="Digital Vision">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 112 112" role="presentation" focusable="false">
                <defs>
                  <linearGradient
                    id="stroke-gradient"
                    x1="18"
                    y1="18"
                    x2="96"
                    y2="96"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#3fe5ff" />
                    <stop offset="56%" stopColor="#42a9ff" />
                    <stop offset="100%" stopColor="#b86bff" />
                  </linearGradient>
                  <linearGradient
                    id="pixel-gradient"
                    x1="20"
                    y1="20"
                    x2="56"
                    y2="72"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#46e6ff" />
                    <stop offset="100%" stopColor="#8d5cff" />
                  </linearGradient>
                </defs>
                <path
                  d="M56 16h16c19.9 0 36 16.1 36 36s-16.1 36-36 36H56"
                  fill="none"
                  stroke="url(#stroke-gradient)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="11"
                />
                <path
                  d="M46 40 62 73 86 40"
                  fill="none"
                  stroke="url(#stroke-gradient)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="11"
                />
                <rect x="26" y="28" width="10" height="10" fill="url(#pixel-gradient)" rx="1.6" />
                <rect x="18" y="44" width="14" height="14" fill="url(#pixel-gradient)" rx="2" />
                <rect x="36" y="40" width="12" height="12" fill="url(#pixel-gradient)" rx="1.8" />
                <rect x="30" y="60" width="11" height="11" fill="url(#pixel-gradient)" rx="1.8" />
                <rect x="46" y="54" width="13" height="13" fill="url(#pixel-gradient)" rx="2" />
                <rect x="34" y="82" width="8" height="8" fill="url(#pixel-gradient)" rx="1.4" />
              </svg>
            </span>
            <span className="brand-name">Digital Vision</span>
          </div>
          <span className="header-pill">Webseiten-Kalkulator</span>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Webdesign · Support · Vertrag</p>
            <h1>
              Website kalkulieren <span className="title-muted">klar und schnell.</span>
            </h1>
            <p className="hero-text">
              Berechne Monatsrate, Support-Zeitraum und Gesamteinnahmen passend zu den
              Website-Paketen von Digital Vision.
            </p>
            <div className="trust-line" aria-label="Leistungsbereiche">
              <span>SEO-Struktur</span>
              <span>Responsives Design</span>
              <span>Pflege & Support</span>
            </div>
          </div>

          <div className="calculator-shell">
            <div className="card">
              <div className="card-top">
                <span className="dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span>Projektwerte</span>
              </div>
              <div className="card-body">
                <div className="grid">
                  <label htmlFor="price">
                    Webseiten-Endpreis (€)
                    <input
                      id="price"
                      type="number"
                      min="0"
                      step="50"
                      value={values.price}
                      onChange={(event) => updateValue("price", event.target.value)}
                    />
                  </label>
                  <label htmlFor="contract">
                    Vertragslaufzeit (Monate)
                    <input
                      id="contract"
                      type="number"
                      min="1"
                      step="1"
                      value={values.contract}
                      onChange={(event) => updateValue("contract", event.target.value)}
                    />
                  </label>
                  <label htmlFor="payoff">
                    Abzahlungsdauer Webseite (Monate)
                    <input
                      id="payoff"
                      type="number"
                      min="0"
                      step="1"
                      value={values.payoff}
                      onChange={(event) => updateValue("payoff", event.target.value)}
                    />
                  </label>
                  <label htmlFor="support">
                    Support pro Monat (€)
                    <input
                      id="support"
                      type="number"
                      min="0"
                      step="10"
                      value={values.support}
                      onChange={(event) => updateValue("support", event.target.value)}
                    />
                  </label>
                </div>

                <div className="button-row">
                  <button id="calcBtn" type="button" onClick={calculate}>
                    Jetzt berechnen
                  </button>
                  <button id="resetBtn" type="button" onClick={reset}>
                    Zurücksetzen
                  </button>
                </div>

                <div className="error" id="errorBox" style={{ display: error ? "block" : "none" }}>
                  {error}
                </div>

                <div className="results">
                  <div className="row">
                    <span>Monatsrate Webseite</span>
                    <span className="value">{results.websiteRate}</span>
                  </div>
                  <div className="row">
                    <span>Support-Monate im Vertrag</span>
                    <span className="value">{results.supportMonths}</span>
                  </div>
                  <div className="row">
                    <span>Support gesamt</span>
                    <span className="value">{results.supportTotal}</span>
                  </div>
                  <div className="row">
                    <span>Gesamteinnahmen</span>
                    <span className="value">{results.total}</span>
                  </div>
                  <div className="row">
                    <span>Durchschnitt pro Monat</span>
                    <span className="value">{results.average}</span>
                  </div>
                </div>

                <div className="highlight">
                  <strong>Zahlungsplan</strong>
                  <div className="phase">{results.phaseText}</div>
                </div>

                <div className="note">
                  Bei 0 Monaten Abzahlungsdauer wird die Webseite als einmalige Zahlung
                  berechnet. Danach bzw. parallel läuft der Support über die Vertragslaufzeit.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
