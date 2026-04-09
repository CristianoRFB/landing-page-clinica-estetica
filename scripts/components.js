function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function renderBenefitCard(item, index) {
  return `
    <article class="benefit-card reveal">
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="card-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderServiceCard(item) {
  const points = item.points
    .map((point) => `<span>${point}</span>`)
    .join("");

  return `
    <article class="service-card reveal">
      <span class="service-highlight">${item.highlight}</span>
      <h3>${item.title}</h3>
      <p>${item.benefit}</p>
      <div class="service-points">${points}</div>
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

export function renderJourneyStep(item) {
  return `
    <article class="journey-step reveal">
      <span class="journey-step-number">${item.step}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `;
}

export function renderTestimonialCard(item) {
  return `
    <article class="testimonial-card reveal">
      <div class="testimonial-top">
        <span class="testimonial-avatar" aria-hidden="true">${getInitials(item.name)}</span>
        <span class="testimonial-result">${item.result}</span>
      </div>
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
