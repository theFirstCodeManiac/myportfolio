export const Button = ({ className, size, children }) => {
    const baseClasses = "relative overflow-hidden rounded-full";
  return (
    <button>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
