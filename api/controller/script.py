import sys
try:
    
    output_file_path = '/app/output.js'
    with open(output_file_path, 'w') as file:
        file.write("content")
except Exception as e:
    print(f"An error occurred: {e}", file=sys.stderr)
