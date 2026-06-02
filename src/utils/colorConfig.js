// Corporate Color Palette
// Centraliced color configuration - change here to update across the entire site

export const COLORS = {
  primary: "#091f4d",
  secondary: "#6d91ba",
  secondaryDark: "#a4a39f",
  dark: "#1A1A1A",
  white: "#FFFFFF",
  whatsapp: "#25d366",
  
  // Grays
  gray100: "#F3F4F6",
  gray300: "#D1D5DB",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
};

// CSS variables for use in global styles
export const getCSSVariables = () => {
  return `
    :root {
      --color-primary: ${COLORS.primary};
      --color-secondary: ${COLORS.secondary};
      --color-secondary-dark: ${COLORS.secondaryDark};
      --color-dark: ${COLORS.dark};
      --color-white: ${COLORS.white};
      --color-whatsapp: ${COLORS.whatsapp};
      --color-gray-100: ${COLORS.gray100};
      --color-gray-300: ${COLORS.gray300};
      --color-gray-500: ${COLORS.gray500};
      --color-gray-600: ${COLORS.gray600};
      --color-gray-700: ${COLORS.gray700};
    }
  `;
};
