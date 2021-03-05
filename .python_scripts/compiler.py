import py_compile
import sys

if not sys.argv[1].endswith('.py'):
    print('Not a python file.')
    sys.exit()
try:
    py_compile.compile(sys.argv[1])
except FileNotFoundError:
    print('File not found.')
