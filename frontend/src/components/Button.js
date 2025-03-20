/**
 * Almennur hnappur (button) component.
 * @param {Object} props - Props fyrir component.
 * @param {React.ReactNode} props.children - Innihald hnapps.
 * @param {string} [props.className] - CSS class fyrir hnapp.
 * @returns {JSX.Element} Button component.
 */
const Button = ({ children, className, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
