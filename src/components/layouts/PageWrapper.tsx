import { ReactNode } from "react";
import "./page-wrapper.scss";

interface IPageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = ({ children, ...props }) => {
  return (
    <main className="page-wrapper" {...props}>
      {children}
    </main>
  );
};

export default PageWrapper;
