import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

const Card = ({
  children,
  id,
  index,
  column,
  searchQuery,
}: {
  children?: React.ReactNode;
  id: string;
  index: number;
  column: string;
  searchQuery: string;
}) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  const [task, setTask] = useState<AmplenoteTask | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const result = await window.callAmplenotePlugin("fetchTask", id);
      setTask(result);
    };

    loadContent();
  }, [id]);

  const finishTask = () => {
    return;
  };

  return task?.content.toLowerCase().includes(searchQuery.toLowerCase()) ? (
    <div className="card" ref={ref} data-dragging={isDragging}>
      <div className="task-content">
        <input type="checkbox" onClick={finishTask} />
        {task.content}
      </div>
      {children}
    </div>
  ) : null;
};

export default Card;
