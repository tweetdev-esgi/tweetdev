# Utiliser une image de base pour Node.js
FROM node:14-alpine
LABEL author="Kandioura soumare"
# Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de configuration et de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire le projet TypeScript
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/index.js"]
