export const Logo = () => {
  const companyName = import.meta.env.VITE_COMPANY_NAME || "Tekville";

  return (
    <div className="logo-simple">
      <div className="logo-icon-simple">
        <div className="logo-square-simple"></div>
        <div className="logo-circle-simple"></div>
      </div>
      <div className="logo-text-simple">
        <span className="logo-company-simple">{companyName}</span>
        <span className="logo-product-simple">AgileBoard</span>
      </div>
    </div>
  );
};
