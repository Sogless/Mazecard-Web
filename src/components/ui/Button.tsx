"use client";

import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-maze-yellow text-bg-primary hover:bg-maze-yellow-hover",
    secondary: "border border-maze-yellow text-maze-yellow hover:bg-maze-yellow/10",
    outline: "border border-border-color text-text-secondary hover:border-maze-yellow hover:text-maze-yellow",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
