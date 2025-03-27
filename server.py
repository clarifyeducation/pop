#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer

class MyServer(BaseHTTPRequestHandler):
    def serveFile(self, path):
        try:
            with open('./www' + path, 'rb') as f:
                self.wfile.write(f.read())
            return True
        except IOError:
            return False

    def do_GET(self):
        contentTypes = {
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.ico': 'image/vnd.microsoft.icon',
            '.txt': 'text/plain',
            '.manifest': 'text/cache-manifest',
        }
        contentType = 'text/html'
        for key in contentTypes:
            if self.path.endswith(key):
                contentType = contentTypes[key]

        self.send_response(200, 'OK')
        self.send_header('Content-Type', contentType)
        # self.send_header('Cache-Control', 'max-age=%d' % (365*24*60*60))
        self.end_headers()

        if not self.serveFile(self.path):
            if not self.serveFile(self.path + 'index.html'):
                self.wfile.write(b'<h1>Error 404</h1>')

def main():
    print('Serving at http://localhost:8000/')
    HTTPServer(('', 8000), MyServer).serve_forever()

if __name__ == '__main__':
    main()
