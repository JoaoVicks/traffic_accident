import type { InputHTMLAttributes } from 'react';
import { SearchIcon } from '../icons';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;


export function TextField({
  type = 'text',
  className = '',
  placeholder = 'Busque por uma rodovia, cidade ou estado',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TextFieldProps) {
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : 'Buscar');

  return (
    <div
      className={`flex h-(--size-search-field-height) w-(--size-search-field-width) items-center gap-3 overflow-clip rounded-(--radius-6) bg-(--black-400) px-3 py-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--primary-200) ${className}`.trim()}
    >
      <input
        type={type}
        placeholder={placeholder}
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledBy}
        className="min-w-0 flex-1 bg-transparent font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-light) leading-(--line-height-auto) tracking-(--letter-spacing-0) text-(--observed-color-b7b7b7) outline-none placeholder:text-(--observed-color-b7b7b7) disabled:cursor-not-allowed"
        {...props}
      />
      <span
        className="relative size-[16.5px] shrink-0 text-(--observed-color-b7b7b7)"
        aria-hidden="true"
      >
        <span className="absolute inset-[-4.17%]">
          <SearchIcon strokeWidth={1} />
        </span>
      </span>
    </div>
  );
}

