import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  testid?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { label, id, type, ...rest } = props;

    return (
      <>
        <label htmlFor={id} className="block">
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="w-full border border-neutral-300 rounded-sm p-2"
          ref={ref}
          {...rest}
          data-testid={props.testid}
        />
      </>
    );
  }
);
