#!/bin/bash
# setup-branches.sh — 40-60 Studio
# Lance ce script une seule fois après avoir cloné le template.
# Crée les 5 branches de la phase design + les pousse sur origin.
#
# Usage : bash setup-branches.sh

set -e

BRANCHES=(
  "phase/1-wireframes"
  "phase/2-pistes-creatives"
  "phase/3-design-system-ui"
  "phase/4-declinaison-ui"
  "phase/5-responsive"
)

echo "→ Création des branches design 40-60..."

for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    echo "  ✓ $branch existe déjà"
  else
    git checkout -b "$branch" main
    echo "  + $branch créée"
    git checkout main
  fi
done

echo ""
echo "→ Push de toutes les branches sur origin..."
for branch in "${BRANCHES[@]}"; do
  git push -u origin "$branch"
  echo "  ✓ $branch poussée"
done

git checkout main
echo ""
echo "✅ Done. Branches disponibles :"
git branch -a | grep "phase/"
