export function renderBenefitCard(item) {
  return `
    <article class="benefit-card reveal">
      <span class="card-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderServiceCard(item) {
  return `
    <article class="service-card reveal">
      <span class="service-highlight">${item.highlight}</span>
      <h3>${item.title}</h3>
      <p>${item.benefit}</p>
      <p class="service-result">${item.result}</p>
      <a
        class="button button-secondary js-whatsapp-link"
        href="#"
        data-message="${item.message}"
      >
        ${item.ctaLabel}
      </a>
    </article>
  `;
}

export function renderTestimonialCard(item) {
  return `
    <article class="testimonial-card reveal">
      <span class="testimonial-rating">★★★★★</span>
      <blockquote>${item.quote}</blockquote>
      <div class="testimonial-meta">
        <strong>${item.name}</strong>
        <span>${item.focus}</span>
      </div>
    </article>
  `;
}

export function renderAuthorityPoint(item) {
  return `
    <article class="authority-point reveal">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderFaqItem(item, index) {
  const openAttribute = index === 0 ? " open" : "";

  return `
    <details class="faq-item reveal"${openAttribute}>
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `;
}
