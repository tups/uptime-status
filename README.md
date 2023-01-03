# uptime-status

Baser sur le projet : [uptime-status](https://github.com/yb/uptime-status)
Traduit en français

Un panneau d'état en ligne basé sur l'API UptimeRobot

<img width="1152" alt="image" src="https://user-images.githubusercontent.com/25887822/178935137-6d23521d-5894-4fb8-922d-3575be4f7abc.png">

## Préparez-vous à l'avance

- Vous devez d'abord vous rendre sur [UptimeRobot](https://uptimerobot.com/ "UptimeRobot") pour ajouter la surveillance du site et obtenir la clé API sur la page Mes paramètres
- Vous devez disposer d'un espace de site Web, d'un espace commun tel que Nginx / PHP, ou même d'un espace statique pur tel qu'Alibaba Cloud OSS
- 
## Comment déployer :

- Téléchargez et décompressez : [uptime-status.zip](https://github.com/yb/uptime-status/releases/latest/download/uptime-status.zip "uptime-status.zip")
- Modifiez le fichier `config.js` :
  - `SiteName` : le nom du site Web à afficher
  - `ApiKeys` : clé API obtenue auprès d'UptimeRobot, prend en charge les clés API spécifiques au moniteur et la clé API en lecture seule
  - `CountDays` : Le nombre de jours de journal à afficher, 60 ou 90 est recommandé, l'effet d'affichage est meilleur
  - `ShowLink` : s'il faut afficher le lien du site
  - `Navi` : la liste des menus de la barre de navigation
- Télécharger tous les fichiers sur l'espace Web



