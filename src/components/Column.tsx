import type React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

const Column = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Normal, // TODO: This should be low but then experience is shit so find a walkaround
  });
  const style = isDropTarget ? { background: "#00000030" } : undefined;

  return (
    <div className="column" ref={ref} style={style}>
      {children}
    </div>
  );
};

export default Column;
