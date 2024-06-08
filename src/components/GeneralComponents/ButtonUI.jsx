function ButtonUI({ children }) {
  return (
    <button type="submit" className="mt-4 cp-btn cp-btn--black">
      {children}
    </button>
  );
}

export default ButtonUI;
