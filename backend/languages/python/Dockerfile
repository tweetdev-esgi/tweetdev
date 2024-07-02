# Utiliser l'image de base Python 3.10
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier runner.py dans le répertoire de travail
COPY ./runner.py /app/runner.py

# Vérifier que le fichier a été copié (optionnel)
RUN ls -l /app

# Décommenter la ligne CMD pour exécuter le script Python
CMD ["python", "runner.py"]
