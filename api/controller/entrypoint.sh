#!/bin/sh

if [ "$1" = "python" ]; then
    python3 /scripts/script.py
elif [ "$1" = "javascript" ]; then
    node /scripts/script.js
else
    echo "Unsupported language"
    exit 1
fi
