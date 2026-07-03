# Teste de Front End — Quero Educação

Projeto de front-end estático para o teste da Quero Educação: listagem e filtro de bolsas de estudo, com layout responsivo (desktop, tablet e mobile).

## Estrutura

```
.
├── index.html          # Versão simples (sem build)
├── assets/             # CSS, JS e imagens da versão simples
└── site-otimizado/     # Versão com pipeline Gulp (minificação e Babel)
    ├── src/            # Fontes (HTML, CSS, JS, imagens)
    ├── public/         # Saída do build (abrir no navegador)
    ├── gulpfile.js
    └── package.json
```

## Versão simples

Abra o arquivo `index.html` no navegador (preferencialmente Google Chrome).

Não é necessário instalar dependências.

## Versão otimizada (Gulp)

### Pré-requisitos

- [Node.js](https://nodejs.org/) LTS

### Instalação e build

```bash
cd site-otimizado
npm install
npm run build
```

Em seguida, abra `site-otimizado/public/index.html` no navegador.

O build:

- copia o HTML de `src/templates/` para `public/`
- transpila o JavaScript com Babel e minifica
- processa o CSS (imports + Sass) e minifica
- copia as imagens para `public/assets/img/`

## Observações

- Ao redimensionar a janela, recarregue a página para atualizar o layout corretamente.
- O projeto foi validado principalmente no Google Chrome.
