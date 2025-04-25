// Vite plugin to handle Netlify redirects
export default function netlifyPlugin() {
  return {
    name: 'netlify-redirects',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '_redirects',
        source: '/* /index.html 200'
      });
    }
  };
}
