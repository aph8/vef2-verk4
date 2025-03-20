/**
 * Input component wraps a standard input element with an optional label.
 * @param {Object} props
 * @param {string} [props.label] - Label text displayed above the input.
 * @param {...import('react').InputHTMLAttributes<HTMLInputElement>} props - Additional input attributes.
 * @returns {JSX.Element} The input with optional label.
 */
const Input = ({ label, ...props }) => (
  <div>
    {label && <label>{label}</label>}
    <input {...props} />
  </div>
);
export default Input;