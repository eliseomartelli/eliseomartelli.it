import moo from "@eliseomartelli/moo/dist";

export const h1 = (
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => (
  <h1 {...props} className={moo("text-4xl font-bold", props?.className!)}></h1>
);

export const h2 = (
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => (
  <h2 {...props} className={moo("text-2xl font-bold", props?.className!)}></h2>
);
