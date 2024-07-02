#!/bin/bash

# Script pour exécuter le code basé sur le langage et le chemin du fichier

LANGUAGE=$1
FILE_PATH=$2

case $LANGUAGE in
  "javascript")
    node $FILE_PATH
    ;;
  "typescript")
    ts-node $FILE_PATH
    ;;
  "python")
    /app/.venv/bin/python $FILE_PATH
    ;;
  "java")
    javac $FILE_PATH
    java ${FILE_PATH%.java}
    ;;
  *)
    echo "Unsupported language"
    exit 1
    ;;
esac
