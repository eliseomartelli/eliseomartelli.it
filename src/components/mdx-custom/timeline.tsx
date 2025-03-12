import React from "react";

interface TimelineProps {
  children: React.ReactElement<typeof TimelineItem>[];
}

export const Timeline = ({ children }: TimelineProps) => {
  return (
    <section className="not-prose relative">
      <div className="absolute left-1.5 top-0 h-full w-1 bg-gray-300 rounded-full" />
      <ol className="space-y-4">
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? child : null,
        )}
      </ol>
    </section>
  );
};

interface TimelineItemProps {
  title: string;
  description: string;
  range: string;
}

export const TimelineItem = ({
  title,
  description,
  range,
}: TimelineItemProps) => {
  return (
    <li className="relative">
      <div className="bg-black rounded-full block absolute top-1/2 -translate-y-1/2 w-4 h-4 border- border-white border-2" />
      <div className="prose ml-12 text-black">
        <p className="text-sm mb-1">{range}</p>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};
