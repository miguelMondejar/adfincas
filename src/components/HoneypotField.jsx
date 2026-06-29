export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={onChange}
      // Hidden from view completely
      style={{
        position: 'absolute',
        left: '-9999px',
        opacity: 0,
        pointerEvents: 'none',
      }}
      // Prevent browser autocomplete
      autoComplete="off"
      tabIndex={-1}
      aria-hidden="true"
      // Disable accessibility - this field should not be accessible
      disabled
    />
  );
}
