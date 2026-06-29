// babel.config.js — configuración para Jest que transforma import.meta.env
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    // Transforma import.meta (Vite) a un objeto compatible con Jest/Node
    () => ({
      visitor: {
        MetaProperty(path) {
          if (
            path.node.meta.name === 'import' &&
            path.node.property.name === 'meta'
          ) {
            path.replaceWithSourceString(
              `({
                env: {
                  PROD: process.env.NODE_ENV === 'production',
                  DEV: process.env.NODE_ENV !== 'production',
                  VITE_RECAPTCHA_PUBLIC_KEY: process.env.VITE_RECAPTCHA_PUBLIC_KEY,
                  VITE_REACT_APP_USE_RECAPTCHA: process.env.VITE_REACT_APP_USE_RECAPTCHA
                }
              })`
            );
          }
        },
      },
    }),
  ],
};
