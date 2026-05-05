import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'small';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn btn-p',
  outline: 'btn btn-o',
  small:   'btn-sm btn-p',
};

export function Button({ variant = 'primary', className, children, ...rest }: Props) {
  const merged = `${VARIANT_CLASS[variant]}${className ? ` ${className}` : ''}`;
  return (
    <button type="button" className={merged} {...rest}>
      {children}
    </button>
  );
}
