import React from "react";

type Props = {
  children: string;
  className?: string;
};

const Heading = ({ children, className }: Props) => {
  return (
    <h2
      className={`text-3xl font-bold tracking-tight text-gray-900 ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
