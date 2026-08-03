import { leadConfig } from "./config.js";
import {
  authorityPoints,
  business,
  faqs,
  journeySteps,
  services,
  trustSignals
} from "./site-data.js";
import {
  renderAuthorityPoint,
  renderFaqItem,
  renderJourneyStep,
  renderServiceCard,
  renderTrustSignal
} from "./components.js";

const servicesGrid = document.querySelector("#services-grid");
const journeyGrid = document.querySelector("#journey-grid");
const trustGrid = document.querySelector("#trust-grid");
const authorityGrid = document.querySelector("#authority-grid");
const faqList = document.querySelector("#faq-list");
const leadForm = document.querySelector("#lead-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");
const stickyCta = document.querySelector(".sticky-cta");

const defaultWhatsAppMessage =
  "Olá! Quero agendar uma avaliação no Centro de Estética Katia Tiso.";

function renderSections() {
  if (servicesGrid) servicesGrid.innerHTML = services.map(renderServiceCard).join("");
  if (journeyGrid) journeyGrid.innerHTML = journeySteps.map(renderJourneyStep).join("");
  if (trustGrid) trustGrid.innerHTML = trustSignals.map(renderTrustSignal).join("");
  if (authorityGrid) {
    authorityGrid.innerHTML = authorityPoints.map(renderAuthorityPoint).join("");
  }
  if (faqList) faqList.innerHTML = faqs.map(renderFaqItem).join("");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${leadConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLinks(root = document) {
  root.querySelectorAll(".js-whatsapp-link").forEach((link) => {
    const message = link.dataset.message || defaultWhatsAppMessage;
    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function fillTrackingFields() {
  if (!leadForm) return;

  const params = new URLSearchParams(window.location.search);
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  fields.forEach((fieldName) => {
    const input = leadForm.elements.namedItem(fieldName);
    if (input instanceof HTMLInputElement) input.value = params.get(fieldName) || "";
  });
}

function serializeForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function sendLead(payload) {
  if (!leadConfig.leadEndpoint) return;

  await fetch(leadConfig.leadEndpoint, {
    method: leadConfig.requestMethod,
    headers: leadConfig.requestHeaders,
    body: JSON.stringify(payload)
  });
}

function openWhatsApp(payload) {
  const message = [
    `Olá! Quero agendar uma avaliação na ${business.name}.`,
    `Objetivo: ${payload.interest}`,
    `Melhor período: ${payload.schedule}`
  ].join("\n");

  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

async function handleLeadSubmit(event) {
  event.preventDefault();
  if (!leadForm || !formStatus || !leadForm.reportValidity()) return;

  const submitButton = leadForm.querySelector('button[type="submit"]');
  const payload = {
    ...serializeForm(leadForm),
    source: "landing-page",
    businessName: business.name,
    sentAt: new Date().toISOString()
  };

  openWhatsApp(payload);
  formStatus.textContent = "WhatsApp aberto. Revise a mensagem e envie quando quiser.";

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Preparando atendimento...";
  }

  try {
    await sendLead(payload);
    leadForm.reset();
    fillTrackingFields();
  } catch (error) {
    formStatus.textContent =
      "O WhatsApp foi aberto, mas o registro interno não pôde ser concluído agora.";
  } finally {
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Continuar no WhatsApp <span aria-hidden="true">↗</span>';
    }
  }
}

function initFaqBehavior() {
  if (!faqList) return;

  const items = faqList.querySelectorAll(".faq-item");
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
  );

  elements.forEach((element, index) => {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
    element.classList.add("will-reveal");
    element.style.setProperty("--delay", `${Math.min((index % 4) * 55, 165)}ms`);
    observer.observe(element);
  });
}

function initStickyCta() {
  if (!stickyCta) return;
  const updateState = () => document.body.classList.toggle("has-scrolled", window.scrollY > 420);
  updateState();
  window.addEventListener("scroll", updateState, { passive: true });
}

renderSections();
updateWhatsAppLinks();
fillTrackingFields();
initFaqBehavior();
initReveal();
initStickyCta();

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
if (leadForm) leadForm.addEventListener("submit", handleLeadSubmit);
