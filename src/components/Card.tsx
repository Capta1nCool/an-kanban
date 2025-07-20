import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";

const Card = ({
  children,
  id,
  index,
  column,
}: {
  children: React.ReactNode;
  id: string;
  index: number;
  column: string;
}) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <div className="card" ref={ref} data-dragging={isDragging}>
      {children}
    </div>
  );
};

export default Card;
