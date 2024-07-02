# Utiliser une image de base qui inclut Java, Node.js (pour JavaScript et TypeScript), et Python
FROM ubuntu:20.04
LABEL authors="kandi"
LABEL description="Dockerfile pour l'application backend"
# Installer les dépendances nécessaires
RUN apt-get update && \
    apt-get install -y openjdk-15-jdk python3 python3-pip nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python block
COPY requirements.txt ./python/requirements.txt
RUN python3 -m venv /app/.venv && \
    /app/.venv/bin/pip install --upgrade pip && \
    /app/.venv/bin/pip install -r ./python/requirements.txt

# JavaScript block
COPY package.json package-lock.json ./
RUN npm install -g typescript ts-node && \
    npm install

# Définir le répertoire de travail
WORKDIR /app

# Copier le script d'exécution dans le conteneur
COPY runner.sh /app/runner.sh

# Donner les permissions d'exécution au script
RUN chmod +x /app/runner.sh

# Définir la commande de démarrage
CMD ["/app/runner.sh"]
