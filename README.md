# Développeur low-poly — Three.js

Scène web autonome : un personnage low-poly en hoodie sombre assis à une table face à un ordinateur portable.

## Lancer

Servez ce dossier via un petit serveur local (les modules ES ne sont généralement pas chargés depuis `file://`) :

```powershell
npx serve .
```

Ouvrez ensuite l’URL affichée. Le premier chargement utilise Three.js depuis un CDN.

## Animation et rig

- **Idle de frappe** : les poignets et les mains s’animent en boucle selon deux sinusoïdes superposées.
- **Regard souris** : `pointermove` convertit la position XY de la souris en cible d’orientation.
- **Dampening** : la cible est filtrée par interpolation exponentielle indépendante de la fréquence d’images.
- **Joints** : `neckJoint` apporte une petite rotation, `headJoint` une rotation plus importante — l’équivalent direct de deux os de rig à remplacer par les os homonymes d’un GLB skinné si besoin.
