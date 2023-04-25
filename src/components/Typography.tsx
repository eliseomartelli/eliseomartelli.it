export const h1 = (
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => (
  <h1
    {...props}
    className={["text-4xl font-bold", props?.className].join(" ")}
  ></h1>
);

export const h2 = (
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => (
  <h2
    {...props}
    className={["text-2xl font-bold", props?.className].join(" ")}
  ></h2>
);
