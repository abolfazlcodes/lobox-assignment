import { ReactNode } from "react";
import "./card-box.scss";

interface ICardBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CardBox: React.FC<ICardBoxProps> = ({ children, ...props }) => {
  return (
    <div className="card-box" {...props}>
      {children}
    </div>
  );
};

export default CardBox;
