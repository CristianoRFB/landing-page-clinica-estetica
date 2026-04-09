import { leadConfig } from "./config.js";
import {
  business,
  benefits,
  services,
  journeySteps,
  testimonials,
  authorityPoints,
  faqs
} from "./site-data.js";
import {
  renderAuthorityPoint,
  renderBenefitCard,
  renderFaqItem,
  renderJourneyStep,
  renderServiceCard,
  renderTestimonialCard
} from "./components.js";

const benefitsGrid = document.querySelector("#benefits-grid");
const servicesGrid = document.querySelector("#services-grid");
const journeyGrid = document.querySelector("#journey-grid");
const testimonialsGrid = document.querySelector("#testimonials-grid");
const authorityGrid = document.querySelector("#authority-grid");
const faqList = document.querySelector("#faq-list");
const leadForm = document.querySelector("#lead-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");
const stickyCta = document.querySelector(".sticky-cta");

const defaultWhatsAppMessage =
  "Olá! Quero agendar minha avaliação gratuita no Centro de Estética Katia Tiso.";

function renderSections() {
  if (benefitsGrid) {
    benefitsGrid.innerHTML = benefits.map(renderBenefitCard).join("");
  }

  if (servicesGrid) {
    servicesGrid.innerHTML = services.map(renderServiceCard).join("");
  }

  if (journeyGrid) {
    journeyGrid.innerHTML = journeySteps.map(renderJourneyStep).join("");
  }

  if (testimonialsGrid) {
    testimonialsGrid.innerHTML = testimonials.map(renderTestimonialCard).join("");
  }

  if (authorityGrid) {
    authorityGrid.innerHTML = authorityPoints.map(renderAuthorityPoint).join("");
  }

  if (faqList) {
    faqList.innerHTML = faqs.map(renderFaqItem).join("");
  }
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${leadConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLinks(root = document) {
  const links = root.querySelectorAll(".js-whatsapp-link");

  links.forEach((link) => {
    const message = link.dataset.message || defaultWhatsAppMessage;

    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function fillTrackingFields() {
  if (!leadForm) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  fields.forEach((fieldName) => {
    const input = leadForm.elements.namedItem(fieldName);

    if (input instanceof HTMLInputElement) {
      input.value = params.get(fieldName) || "";
    }
  });
}

function serializeForm(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

async function sendLead(payload) {
  if (!leadConfig.leadEndpoint) {
    return;
  }

  await fetch(leadConfig.leadEndpoint, {
    method: leadConfig.requestMethod,
    headers: leadConfig.requestHeaders,
    body: JSON.stringify(payload)
  });
}

function openWhatsApp(payload) {
  const message = [
    `Olá! Quero agendar minha avaliação gratuita na ${business.name}.`,
    `Nome: ${payload.name}`,
    `WhatsApp: ${payload.phone}`,
    `Interesse: ${payload.interest}`,
    `Melhor período: ${payload.schedule}`
  ].join("\n");

  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function initPhoneMask() {
  if (!leadForm) {
    return;
  }

  const phoneInput = leadForm.elements.namedItem("phone");

  if (!(phoneInput instanceof HTMLInputElement)) {
    return;
  }

  phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });
}

async function handleLeadSubmit(event) {
  event.preventDefault();

  if (!leadForm || !formStatus) {
    return;
  }

  if (!leadForm.reportValidity()) {
    return;
  }

  const submitButton = leadForm.querySelector('button[type="submit"]');
  const payload = {
    ...serializeForm(leadForm),
    source: "landing-page",
    businessName: business.name,
    sentAt: new Date().toISOString()
  };

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
  }

  formStatus.textContent = "Estamos preparando seu atendimento...";

  try {
    await sendLead(payload);
    formStatus.textContent = "Tudo certo! O WhatsApp vai abrir para concluir seu agendamento.";
    openWhatsApp(payload);
    leadForm.reset();
    fillTrackingFields();
  } catch (error) {
    formStatus.textContent =
      "Não conseguimos enviar para o backend agora, mas você ainda pode concluir pelo WhatsApp.";
    openWhatsApp(payload);
  } finally {
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = "Quero minha avaliação gratuita";
    }
  }
}

function initFaqBehavior() {
  if (!faqList) {
    return;
  }

  const items = faqList.querySelectorAll(".faq-item");

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((element, index) => {
    element.style.setProperty("--delay", `${Math.min(index * 40, 220)}ms`);
    observer.observe(element);
  });
}

function initStickyCta() {
  if (!stickyCta) {
    return;
  }

  const updateState = () => {
    document.body.classList.toggle("has-scrolled", window.scrollY > 220);
  };

  updateState();
  window.addEventListener("scroll", updateState, { passive: true });
}

function setFooterYear() {
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
}

renderSections();
updateWhatsAppLinks();
fillTrackingFields();
initPhoneMask();
initFaqBehavior();
setFooterYear();
initReveal();
initStickyCta();

if (leadForm) {
  leadForm.addEventListener("submit", handleLeadSubmit);
}
