#!/bin/bash
# Script pour exécuter le code basé sur le langage et le chemin du fichier

LANGUAGE=$1
FILE=$2

case $LANGUAGE in
  javascript)
    node $FILE
    ;;
  typescript)
    ts-node $FILE
    ;;
  python)
    /app/venv/bin/python $FILE
    ;;
  java)
    javac $FILE
    java ${FILE%.*}
    ;;
  *)
    echo "Unsupported language: $LANGUAGE"
    exit 1
    ;;
esac
