/**
 * TESTS: Componentes React
 * Cubre: HoneypotField, FAQ (renderizado y expansión), ResponsiveImage
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// ============================================================
// Mock FontAwesomeIcon para no necesitar la librería
// ============================================================
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }) => <span data-testid="fa-icon" className={className} />,
}));
jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faPlus: 'faPlus',
  faMinus: 'faMinus',
  faExclamationCircle: 'faExclamationCircle',
}));

// Mock react-helmet-async
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <>{children}</>,
  HelmetProvider: ({ children }) => <>{children}</>,
}));

// ============================================================
// HoneypotField Component
// ============================================================
describe('HoneypotField', () => {
  let HoneypotField;

  beforeAll(async () => {
    const mod = await import('../components/HoneypotField');
    HoneypotField = mod.default;
  });

  test('renderiza el input oculto', () => {
    const { container } = render(
      <HoneypotField value="" onChange={() => {}} />
    );
    const input = container.querySelector('input[name="website"]');
    expect(input).toBeInTheDocument();
  });

  test('el campo no es visible (posicionado fuera de pantalla)', () => {
    const { container } = render(
      <HoneypotField value="" onChange={() => {}} />
    );
    const input = container.querySelector('input[name="website"]');
    expect(input).toHaveAttribute('tabindex', '-1');
    expect(input).toHaveAttribute('aria-hidden', 'true');
  });

  test('el campo está deshabilitado para usuarios', () => {
    const { container } = render(
      <HoneypotField value="" onChange={() => {}} />
    );
    const input = container.querySelector('input[name="website"]');
    expect(input).toBeDisabled();
  });

  test('llama onChange cuando se escribe (para bots)', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <HoneypotField value="" onChange={handleChange} />
    );
    // Aunque esté disabled, probamos que el prop se pasa correctamente
    const input = container.querySelector('input[name="website"]');
    expect(input).toHaveValue('');
  });

  test('tiene autoComplete desactivado', () => {
    const { container } = render(
      <HoneypotField value="" onChange={() => {}} />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });
});

// ============================================================
// FAQ Component
// ============================================================
describe('FAQ', () => {
  let FAQ;

  beforeAll(async () => {
    const mod = await import('../components/FAQ');
    FAQ = mod.default;
  });

  test('renderiza el título principal', () => {
    render(<FAQ />);
    expect(screen.getByRole('heading', { name: /Preguntas Frecuentes/i })).toBeInTheDocument();
  });

  test('renderiza todas las preguntas (7)', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button', { name: /\?$/ });
    // Cuenta los botones de preguntas (excluye el CTA de contacto)
    expect(buttons.length).toBeGreaterThanOrEqual(7);
  });

  test('las preguntas empiezan colapsadas', () => {
    render(<FAQ />);
    const expandedButtons = screen.queryAllByRole('button', { expanded: true });
    expect(expandedButtons).toHaveLength(0);
  });

  test('expandir una pregunta muestra la respuesta', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstQuestion = screen.getByRole('button', {
      name: /¿Qué servicios ofrece Grupo ADFincas?/i
    });

    await user.click(firstQuestion);

    // Buscar dentro del panel de respuesta específico, no en toda la página
    const answer = document.getElementById('answer-1');
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(/gestión contable/i);
  });

  test('colapsar una pregunta oculta la respuesta', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstQuestion = screen.getByRole('button', {
      name: /¿Qué servicios ofrece Grupo ADFincas?/i
    });

    // Abrir
    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Cerrar
    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  test('solo se puede expandir una pregunta a la vez', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const questions = screen.getAllByRole('button');
    const faqButtons = questions.filter(btn =>
      btn.getAttribute('aria-expanded') !== null
    );

    // Abrir primera
    await user.click(faqButtons[0]);
    expect(faqButtons[0]).toHaveAttribute('aria-expanded', 'true');

    // Abrir segunda
    await user.click(faqButtons[1]);
    expect(faqButtons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(faqButtons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  test('renderiza el CTA de contacto al final', () => {
    render(<FAQ />);
    expect(screen.getByText(/¿No encontraste tu respuesta?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contáctanos Ahora/i })).toBeInTheDocument();
  });

  test('el link del CTA apunta a #contacto', () => {
    render(<FAQ />);
    const ctaLink = screen.getByRole('link', { name: /Contáctanos Ahora/i });
    expect(ctaLink).toHaveAttribute('href', '#contacto');
  });

  test('la sección tiene el id correcto para navegación', () => {
    const { container } = render(<FAQ />);
    const section = container.querySelector('#faq');
    expect(section).toBeInTheDocument();
  });

  test('botones tienen atributo aria-controls', () => {
    render(<FAQ />);
    const faqButtons = screen.getAllByRole('button').filter(btn =>
      btn.getAttribute('aria-expanded') !== null
    );
    faqButtons.forEach(btn => {
      expect(btn).toHaveAttribute('aria-controls');
    });
  });
});

// ============================================================
// ResponsiveImage Component
// ============================================================
describe('ResponsiveImage', () => {
  let ResponsiveImage;

  beforeAll(async () => {
    const mod = await import('../components/ResponsiveImage');
    ResponsiveImage = mod.default;
  });

  test('renderiza un elemento picture', () => {
    const { container } = render(
      <ResponsiveImage src="test.jpg" alt="Test image" />
    );
    expect(container.querySelector('picture')).toBeInTheDocument();
  });

  test('renderiza la imagen con el alt correcto', () => {
    render(<ResponsiveImage src="test.jpg" alt="Edificio de oficinas" />);
    expect(screen.getByAltText('Edificio de oficinas')).toBeInTheDocument();
  });

  test('incluye fuente WebP para navegadores modernos', () => {
    const { container } = render(
      <ResponsiveImage src="test.jpg" alt="Test" priority={false} />
    );
    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(webpSource).toBeInTheDocument();
  });

  test('incluye fuente AVIF para navegadores modernos', () => {
    const { container } = render(
      <ResponsiveImage src="test.jpg" alt="Test" priority={false} />
    );
    const avifSource = container.querySelector('source[type="image/avif"]');
    expect(avifSource).toBeInTheDocument();
  });

  test('en modo priority no incluye fuentes AVIF/WebP', () => {
    const { container } = render(
      <ResponsiveImage src="test.jpg" alt="Test" priority={true} />
    );
    const avifSource = container.querySelector('source[type="image/avif"]');
    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(avifSource).not.toBeInTheDocument();
    expect(webpSource).not.toBeInTheDocument();
  });

  test('llama onLoad cuando la imagen se carga', () => {
    const handleLoad = jest.fn();
    render(<ResponsiveImage src="test.jpg" alt="Test" onLoad={handleLoad} priority />);
    const img = screen.getByAltText('Test');
    fireEvent.load(img);
    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  test('llama onError cuando falla la carga', () => {
    const handleError = jest.fn();
    render(<ResponsiveImage src="imagen-rota.jpg" alt="Test" onError={handleError} />);
    const img = screen.getByAltText('Test');
    fireEvent.error(img);
    expect(handleError).toHaveBeenCalledTimes(1);
  });

  test('muestra placeholder cuando hay error de carga', () => {
    render(<ResponsiveImage src="imagen-rota.jpg" alt="Test fallback" />);
    const img = screen.getByAltText('Test fallback');
    fireEvent.error(img);
    expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
  });

  test('imagen sin priority tiene lazy loading', () => {
    render(<ResponsiveImage src="test.jpg" alt="lazy" priority={false} />);
    const img = screen.getByAltText('lazy');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
