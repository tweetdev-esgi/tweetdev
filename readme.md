### Solution mis en place ici : 

Le frontend (dev) et le backend run un serveur sur la machine.
Pour chaques langages, j'ai créé un Dockerfile qui importe une image pour le langage désiré.

Pour créer un nouveau container pour un langage : 

On crée un nouveau dossier dans /languages.
On crée un fichier "Dockerfile".
Le fichier possédera : 

```FROM {nom de l'image}:{tag}```  Le nom de l'image et le tag sont trouvable sur [Docker hub](https://hub.docker.com).
```WORKDIR {nom du repertoire}``` Le repertoire qui sera crée et où les fichiers seront copiés.

Si il y a besoin de dépendances (comme typescript) on peut rajouter une commande bash tel que :
```RUN {commande bash}```

On build chaques langages en faisant 
```bash
docker build -t {nom de l'image} {chemin du Dockerfile}
//si je veut compiler du js par exemple ce sera : docker build -t js-runtime .\languages\javascript\
```
(Peut-être optimisé par un script, pour tous les lancer).

Ensuite pour lancer l'exécution on fait la commande 
```bash
docker run --rm -v {chemin du fichier}:/app/{nom du fichier} {nom de l'image} {commande pour exécuter (node / python / ...)} /app/{nom du fichier}
// exemple : docker run -it --name js-runtime --rm js-runtime /bin/bash
```

Pour le docker compose : 

On met le nom du service.

Dans ```build``` le chemin du Dockerfile attribué au service.

Dans volumes, les fichiers synchronisés entre la machine hôte et le container.
({fichier hôte}:{fichiers container})

Dans ports, les ports ouvert sur la machine hôte et le container.
({port machine hôte}:{port container})

depends_on ne sert qu'à donner un ordre de lancement pour les containers.
Si service1 possède "depends_on: service2", alors le service2 démarrera avant le service1.

Les volumes définit en dessous des services sont ici des volumes "virtuels" pour stocker les node_modules et éviter ainsi les conflits entre les différentes version d'OS.