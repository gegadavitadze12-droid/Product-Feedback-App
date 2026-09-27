"use client";

type As = "H1" | "H2" | "H3" | "H4" | "Body 1" | "Body 2" | "Body 3";

interface TextProps {
  as: As;
  // children?: React.ReactNode
  content: string;
  classes?: string;
}

export default function Text(props: TextProps) {
  const { content, as, classes } = props;
  return (
    <>
      {as === "H1" && (
        <h1
          className={`${classes} font-bold text-[1.5rem] tracking-[-0.0125em] leading-[2.1875rem]`}
        >
          {content}
        </h1>
      )}
      {as === "H2" && (
        <h2
          className={`${classes} font-bold text-[1.25rem] tracking-[-0.01375em] leading-[1.8125rem]`}
        >
          {content}
        </h2>
      )}
      {as === "H3" && (
        <h3
          className={`${classes} font-bold text-[1.125rem] tracking-[-0.01375em] leading-[1.625rem]`}
        >
          {content}
        </h3>
      )}
      {as === "H4" && (
        <h4
          className={`${classes} font-bold text-[0.875rem] tracking-[-0.01428em] leading-[1.25rem]`}
        >
          {content}
        </h4>
      )}
      {as === "Body 1" && (
        <p className={`${classes} font-normal text-[1rem] leading-[1.4375rem]`}>
          {content}
        </p>
      )}
      {as === "Body 2" && (
        <p
          className={`${classes} font-normal text-[0.9375rem] leading-[1.375rem]`}
        >
          {content}
        </p>
      )}
      {as === "Body 3" && (
        <p
          className={`${classes} font-semibold text-[0.8125rem] leading-[1.1875rem]`}
        >
          {content}
        </p>
      )}
    </>
  );
}
