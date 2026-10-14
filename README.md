# Orla Segura

Site em React (Vite) baseado no protótipo do Figma **Orla Segura Jaboatão**: 5 telas, mesmas interações e transição *dissolve* de 0,2 s.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ para publicar
```

Requer Node.js 18+.

## Arquivos

- `src/main.jsx` — ponto de entrada: renderiza o `App` e carrega o CSS
- `src/App.jsx` — o site: dados, peças reutilizáveis, as 5 telas e a navegação
- `src/styles.css` — todo o visual
- `src/orla.jpg` — foto da tela inicial
- `index.html`, `package.json`, `vite.config.js` — configuração do projeto

## Telas e rotas

`#/inicio` · `#/mapa` · `#/praias` (Detalhes da Praia) · `#/emergencia` · `#/dicas`

Os dados (praias, alertas, dicas, contatos) ficam no começo do `App.jsx`.

## Diferenças em relação ao protótipo

- "Pedir ajuda" abre uma janela com os telefones 199, 192 e 193 (no Figma o botão não tem ação).
- Mapa, ondas do hero e escudo foram redesenhados em SVG a partir das capturas.
