#!/bin/bash
# Build the app
npm run build

# Ensure _redirects file exists in the dist folder
echo "/* /index.html 200" > dist/_redirects

# Log success
echo "Build completed with _redirects file"
