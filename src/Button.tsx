import React from "react";

interface Props {
  label: string | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  leadingIcon: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

const Button: React.FC<Props> = ({
  label = null,
  onClick = () => {},
  leadingIcon = null,
  ariaLabel = undefined,
  className = undefined
}) => {
  return (
    <button
      className={
        "flex gap-2 items-center justify-center bg-transparent cursor-pointer border-2 border-solid border-main rounded-md py-1 px-3 font-medium hover:bg-surface-3 active:bg-surface-1 select-none" +
        (className ? " " + className : "")
      }
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {leadingIcon}
      {label && <span>{label}</span>}
    </button>
  )
}

export default Button;