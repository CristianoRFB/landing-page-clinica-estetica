# Centro de Estética Katia Tiso

Landing page mobile-first focada em geração de leads para o Centro de Estética Katia Tiso, com ênfase em conversão via WhatsApp e formulário.

## Objetivo

Este projeto foi criado para:

- gerar agendamentos com o menor atrito possível;
- destacar prova social, autoridade e benefícios percebidos;
- funcionar bem em mobile, onde a maior parte dos acessos tende a acontecer;
- manter uma base simples, rápida e fácil de evoluir.

## Stack

Projeto estático, sem dependências de build:

- `HTML` para estrutura;
- `CSS` para layout, responsividade e identidade visual;
- `JavaScript modular` para renderização de seções, CTAs e fluxo de lead.

Isso permite publicar a landing page com facilidade em hospedagens simples, CDN, servidor próprio ou integração futura com framework/backend.

## Estrutura do projeto

```text
landing-page-clinica-estetica/
|-- index.html
|-- AGENTS.md
|-- README.md
|-- serve.ps1
|-- styles/
|   `-- main.css
`-- scripts/
    |-- config.js
    |-- components.js
    |-- main.js
    `-- site-data.js
```

## Arquivos principais

### `index.html`

Contém a estrutura base da landing page e as seções principais:

- hero;
- benefícios;
- serviços;
- prova social;
- autoridade;
- oferta;
- CTA;
- localização;
- FAQ;
- rodapé.

### `styles/main.css`

Responsável por:

- identidade visual;
- tipografia;
- layout responsivo;
- estados de botão e formulário;
- CTA fixo no mobile;
- animações leves de entrada.

### `scripts/site-data.js`

Centraliza os dados e textos reutilizáveis da página:

- benefícios;
- serviços;
- jornada da primeira visita;
- depoimentos;
- blocos de autoridade;
- FAQ;
- informações do negócio.

Esse é o principal arquivo para ajustes de copy sem mexer na estrutura.

### `scripts/components.js`

Renderiza os blocos dinâmicos da página a partir dos dados centralizados.

### `scripts/main.js`

Controla:

- renderização das seções;
- links dinâmicos de WhatsApp;
- captura de parâmetros UTM;
- envio do formulário;
- fallback para WhatsApp;
- animações de reveal;
- atualização do ano no rodapé.

### `scripts/config.js`

Arquivo de configuração para integrações:

- número de WhatsApp;
- endpoint de leads;
- método de envio;
- headers da requisição.

## Como rodar localmente

Como o projeto é estático e usa módulos ES no navegador, ele deve ser aberto com um servidor local.

Importante:

- não abra o `index.html` direto pelo explorador de arquivos;
- rode o servidor na pasta raiz deste projeto;
- se o servidor for iniciado na pasta pai errada, o navegador vai mostrar apenas uma listagem de diretório.

### Opção 1: Python

```powershell
cd "C:\Users\Aluno\Downloads\Centro de Estetica\landing-page-clinica-estetica"
py -m http.server 5500
```

Se `py` não estiver disponível:

```powershell
cd "C:\Users\Aluno\Downloads\Centro de Estetica\landing-page-clinica-estetica"
python -m http.server 5500
```

Abra no navegador:

- [http://localhost:5500](http://localhost:5500)

### Opção 2: script pronto do projeto

Foi adicionado um script para evitar erro de pasta:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Para mudar a porta:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080
```

### Opção 3: VS Code Live Server

Se usar VS Code, também é possível abrir a pasta e rodar com Live Server.

## Como personalizar

### 1. Alterar textos e conteúdos

Edite:

- `scripts/site-data.js`

Lá você pode ajustar:

- benefícios;
- descrições dos serviços;
- depoimentos;
- FAQ;
- dados do negócio.

### 2. Alterar número do WhatsApp

Edite:

- `scripts/config.js`

Exemplo:

```js
export const leadConfig = {
  whatsappNumber: "5517997737297",
  leadEndpoint: "",
  requestMethod: "POST",
  requestHeaders: {
    "Content-Type": "application/json"
  }
};
```

O número deve seguir o formato internacional, sem espaços ou símbolos.

### 3. Integrar com backend

Para enviar o lead para API, CRM ou automação:

1. configure `leadEndpoint` em `scripts/config.js`;
2. mantenha `requestMethod` e `requestHeaders` conforme o backend exigir;
3. ajuste a função de envio em `scripts/main.js`, se o payload precisar de outro formato.

Payload enviado atualmente:

```json
{
  "name": "Nome da cliente",
  "phone": "(17) 99999-9999",
  "interest": "Limpeza de pele",
  "schedule": "Tarde",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_content": "",
  "utm_term": "",
  "source": "landing-page",
  "businessName": "Centro de Estética Katia Tiso",
  "sentAt": "2026-04-08T00:00:00.000Z"
}
```

Se não houver backend configurado, o projeto continua funcionando com fallback para WhatsApp.

## Estratégia de conversão usada

A landing page foi pensada para maximizar ação rápida:

- headline focada em transformação;
- prova social visível logo no início;
- CTA repetido ao longo da página;
- botão fixo no mobile;
- formulário curto;
- serviços com promessa de benefício e resultado esperado;
- FAQ para reduzir objeções;
- localização e confiança no fim da jornada.

## Responsividade

O projeto foi desenhado com prioridade para mobile:

- layout em coluna nas larguras menores;
- CTAs destacados;
- barra fixa inferior para ação imediata;
- grids que escalam para tablet e desktop;
- espaçamentos e tipografia ajustados por breakpoint.

## Checklist antes de publicar

- revisar textos finais e tom de voz;
- substituir imagens, se desejar usar fotos reais da clínica;
- validar número de WhatsApp;
- testar links de CTA;
- testar formulário em celular real;
- configurar backend, se necessário;
- validar carregamento em 4G;
- revisar SEO básico e metadados.

## Próximas melhorias recomendadas

- otimização avançada de mobile UX;
- compressão e local hosting das imagens;
- integração com CRM ou webhook;
- eventos de analytics para cliques e envio de lead;
- testes A/B de hero e formulário;
- página de agradecimento ou evento de conversão.

## Observações

- O projeto não usa `npm`, `build` ou framework por padrão.
- A estrutura foi organizada para facilitar futura migração para React, Next.js ou outro stack, se necessário.
- Os depoimentos atuais são ilustrativos e devem ser substituídos por avaliações reais aprovadas pelo negócio, se forem para produção.

## Licença

Uso interno e comercial conforme necessidade do projeto.
