try:
    with open('/app/code.py', 'r') as file:
        code = file.read()
    exec(code)
except Exception as e:
    print(f"Error: {e}")
