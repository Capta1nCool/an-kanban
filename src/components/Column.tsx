import type React from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

const Column = ({
  children,
  id,
  index,
  items,
}: {
  children: React.ReactNode;
  id: string;
  index: number;
  items: string[];
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div className="column" ref={ref} data-dragging={isDragging}>
      <div className="head">
        <GripVertical className="icon grip" ref={handleRef} />
        <h3>{id}</h3>
        <span>{items.length}</span>
      </div>
      {children}
    </div>
  );
};

export default Column;
