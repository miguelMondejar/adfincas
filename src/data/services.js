import {
  faCalculator,
  faWrench,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";

export const SERVICES_DATA = [
  {
    icon: faCalculator,
    title: "Gestión Contable",
    desc: "Administración financiera completa de tu finca.",
    details: [
      "Contabilidad y control de ingresos y gastos.",
      "Elaboración de presupuestos anuales.",
      "Gestión de nóminas y pagos a proveedores.",
      "Asesoramiento fiscal y cumplimiento de obligaciones."
    ],
  },
  {
    icon: faWrench,
    title: "Mantenimiento Técnico",
    desc: "Conservación y reparación integral de instalaciones.",
    details: [
      "Gestión de averías y mantenimiento preventivo.",
      "Coordinación con técnicos especializados.",
      "Control de calidad en trabajos de reparación."
    ],
  },
  {
    icon: faBalanceScale,
    title: "Asesoramiento Legal",
    desc: "Protección de tus derechos e intereses.",
    details: [
      "Redacción de documentos y contratos.",
      "Resolución de conflictos entre copropietarios.",
      "Asesoramiento sobre normativas inmobiliarias.",
      "Gestión administrativa y legal completa."
    ],
  }
];

