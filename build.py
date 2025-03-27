#!/usr/bin/python3

input_path = 'src/'
output_path = 'www/soda.js'

import re, os, sys, time, tempfile, subprocess

def sources():
    return [os.path.join(base, f) for base, folders, files in \
        os.walk(input_path) for f in files if f.endswith('.js')]

def compile(sources):
    return '\n'.join(f'// {path}\n{open(path, "r", encoding="utf-8").read()}' for path in sources)

def build():
    data = compile(sources())
    if 'release' in sys.argv:
        f1, temp1_path = tempfile.mkstemp()
        f2, temp2_path = tempfile.mkstemp()
        os.write(f1, data.encode('utf-8'))
        os.close(f1)
        os.close(f2)
        subprocess.run(['java', '-jar', 'compiler.jar', '--js', temp1_path, '--js_output_file', temp2_path], check=True)
        os.remove(temp1_path)
        with open(temp2_path, 'r', encoding='utf-8') as temp_file:
            data = temp_file.read()
        os.remove(temp2_path)
    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(data)
    print(f'built {output_path} ({len(data.splitlines())} lines)')

def stat():
    return [os.stat(file).st_mtime for file in sources()]

def monitor():
    a = stat()
    while True:
        time.sleep(0.5)
        b = stat()
        if a != b:
            a = b
            build()

if __name__ == '__main__':
    build()
    if 'debug' in sys.argv:
        monitor()
