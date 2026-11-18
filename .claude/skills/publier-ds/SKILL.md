---
name: publier-ds
description: Reconstruit et republie le design system Claude Design « 40-60 · shadcn DS » (Ds4060) depuis les composants de ce repo. À utiliser quand on demande de republier ou mettre à jour le design system des maquettes, ou après une modification de src/components, des blocs, des tokens de globals.css ou de DESIGN-SYSTEM.md.
---

# Republier le design system Claude Design

Design system : https://claude.ai/artifact/Bb9RN7fVcuHY63aQwaC3uD. Le build est dans `tools/claude-design/` (voir son
README). Suivre les étapes dans l'ordre, et s'arrêter en le disant dès qu'une étape échoue.

1. **Partir d'un état commité.** Les tokens publiés portent la référence `branche@commit` de `HEAD`. Si `git status`
   montre des modifications dans `src/` ou `DESIGN-SYSTEM.md`, demander s'il faut les commiter d'abord. Ne jamais
   commiter sur `main` : sur `main`, créer une branche.
2. **Dépendances.** Si `tools/claude-design/node_modules` n'existe pas, lancer `npm run ds:install`.
3. **Build.** Lancer `npm run ds:build`. Si la sortie dit « rien à republier », s'arrêter là et le dire.
4. **Tests.** Lancer `npm run ds:test` en arrière-plan (plusieurs minutes, Chrome headless). S'il sort en erreur, ne
   pas publier : montrer les problèmes listés.
5. **Lire la version en ligne.** Avec l'outil Artifact, sur l'URL du design system :
   - `action: "read"` : vérifier que le résultat indique « writer ». Sinon, s'arrêter : seule une personne qui a les
     droits d'édition peut publier ;
   - `action: "list"`, `scope: "files"` : la publication refuse de toucher un fichier ni lu ni listé ;
   - `action: "read"`, `path: "project/design-system.json"` : noter où le fichier est enregistré.
6. **Index.** Lancer `node tools/claude-design/index.mjs <fichier lu à l'étape 5> "<ce qui a changé, en une phrase>"`.
   La commande écrit `tools/claude-design/dist/project/design-system.json`.
7. **Publier.** Lire `tools/claude-design/out/publish-plan.json`. Pour chaque élément de `calls`, faire un appel Artifact
   `publish` avec `url` = `artifact`, `root` = `root` (soit `tools/claude-design/dist`) et `files` = l'élément tel quel.
   Les chemins à `null` sont des suppressions. Faire ensuite un dernier appel avec seulement
   `files: {"project/design-system.json": "project/design-system.json"}`. En cas de refus pour une version plus récente,
   relire l'index (étape 5), refaire l'étape 6, puis renvoyer le dernier appel.
8. **Manifeste.** Lancer `node tools/claude-design/mark-published.mjs <version>` avec la version donnée par le dernier
   résultat de publication, puis commiter `tools/claude-design/published-manifest.json` sur la branche courante. Ne
   pousser que si on le demande.
9. **Canevas existants.** Un canevas Design garde sa copie du design system. Si on cite des canevas à mettre à jour,
   recopier leurs fichiers `ds/ds4060/…` modifiés depuis le design system (`files` :
   `{"ds/ds4060/<chemin>": {"artifact": "<url du DS>", "path": "project/<chemin>"}}`), après avoir lu chaque canevas.

Pour finir, résumer : nombre de fichiers publiés, version, ce qui a changé et résultat des tests.
