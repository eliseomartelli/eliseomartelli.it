import React from "react";

export const HorizontalCarousel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="w-screen min-h-screen overflow-scroll left-1/2 -translate-x-1/2 relative flex flex-row snap-x snap-start">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? child : null,
      )}
    </section>
  );
};

export const CarouselPage = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <section className="min-h-full min-w-screen w-full snap-start p-4 flex flex-row gap-4">
      {children}
    </section>
  );
};
