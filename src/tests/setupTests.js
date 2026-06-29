import '@testing-library/jest-dom';

// Limpiar localStorage entre tests
beforeEach(() => {
  window.localStorage.clear();
});
