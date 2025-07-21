import type React from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";

const Column = ({
  children,
  id,
  index,
}: {
  children: React.ReactNode;
  id: string;
  index: number;
}) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div className="column" ref={ref} data-dragging={isDragging}>
      {children}
    </div>
  );
};

export default Column;
