import sys
try:
    # Écrire le contenu dans un nouveau fichier
    output_file_path = '/app/output.txt'
    with open(output_file_path, 'w') as file:
        file.write("ok")
except Exception as e:
    print(f"An error occurred: {e}", file=sys.stderr)
