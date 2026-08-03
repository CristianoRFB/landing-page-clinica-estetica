export function renderServiceCard(item) {
  const points = item.points.map((point) => `<span>${point}</span>`).join("");

  return `
    <article class="service-card reveal">
      <div class="service-topline">
        <span class="service-number">${item.number}</span>
        <span class="service-tag">${item.tag}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="service-points" aria-label="Destaques">${points}</div>
      <a
        class="service-link js-whatsapp-link"
        href="#"
        data-message="${item.message}"
      >
        ${item.ctaLabel} <span aria-hidden="true">↗</span>
      </a>
    </article>
  `;
}

export function renderJourneyStep(item) {
  return `
    <article class="journey-step reveal">
      <span class="journey-number">${item.step}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderTrustSignal(item) {
  return `
    <article class="trust-card reveal">
      <span aria-hidden="true">✓</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

export function renderAuthorityPoint(item) {
  return `
    <article class="authority-point">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderFaqItem(item, index) {
  return `
    <details class="faq-item reveal"${index === 0 ? " open" : ""}>
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `;
}
