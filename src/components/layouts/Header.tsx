import { ReactNode } from "react";
import "./header.scss";

interface IHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  children?: ReactNode;
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title, children, ...props }) => {
  if (children) {
    return (
      <header className="header" {...props}>
        {children}
      </header>
    );
  }

  return (
    <header className="header" {...props}>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
