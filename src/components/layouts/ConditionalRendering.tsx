import React from "react";

interface IConditionalRendering {
  render?: boolean;
  children?: React.ReactNode;
  elseChildren?: React.ReactNode;
}

const ConditionalRendering: React.FC<IConditionalRendering> = ({
  render,
  children,
  elseChildren,
}) => {
  if (render) return children;
  else if (elseChildren) return elseChildren;

  return null;
};

export default ConditionalRendering;
