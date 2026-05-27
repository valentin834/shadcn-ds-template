# Phase 3 — Design System UI (intégration brand)

**Durée estimée** : 2-3 jours  
**Outil** : Claude Code (CLI ou IDE)  
**Input** : Direction artistique validée en phase 2

## Actions

- [ ] Mettre à jour `src/app/globals.css` avec les tokens de la direction validée
- [ ] Si police custom : remplacer Geist par la police brand (Google Fonts via `next/font`)
- [ ] Tester sur `/gallery` que tous les composants rendent bien avec le nouveau thème
- [ ] Documenter les tokens dans `BRAND.md`

## Tokens à configurer dans globals.css

```css
:root {
  --primary: oklch(...);
  --primary-foreground: oklch(...);
  --secondary: oklch(...);
  --accent: oklch(...);
  --destructive: oklch(...);
  --radius: 0.5rem;
}
```

## Output attendu

- `globals.css` brand-ready
- Gallery testée, aucun composant cassé visuellement
- `BRAND.md` avec les tokens documentés

---

> Branche suivante : `phase/4-declinaison-ui`
