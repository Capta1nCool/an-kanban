import { useState } from "react";
import Column from "./components/Column";
import Card from "./components/Card";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { GripVertical, Plus, RefreshCcw, Trash } from "lucide-react";

interface AmplenoteTask {
  uuid: string;
  content: string;
  deadline?: number;
  startAt?: number | null;
  endAt?: number;
  completedAt?: number;
  dismissedAt?: number;
  hideUntil?: number | null;
  important: boolean;
  urgent: boolean;
  noteUUID: string;
  score: number;
}

declare global {
  interface Window {
    callAmplenotePlugin: (method: string, uuid: string) => AmplenoteTask;
  }
}

function App() {
  const [board, setBoard] = useState({
    Todo: ["78e80b42-e250-49d2-8d87-13320014d0a8"],
    "In Progress": ["a978e80b-42e2-5049-d28d-8713320014d0"],
    Done: ["a348ccc9-afda-43da-b37a-6b2a4681d407"],
    Upcoming: ["d3bfce2d-d66b-46b0-8b94-23cc7ed51e9c"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [columnOrder, setColumnOrder] = useState(() => Object.keys(board));

  const addColumn = () => {
    const name = prompt("Enter column name");
    if (!name) return;

    setBoard((prevBoard) => ({
      ...prevBoard,
      [name.trim()]: [],
    }));
  };

  const delCard = (uuid: string, column: string) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [column]: prevBoard[column].filter((item: string) => item !== uuid),
    }));
  };

  return (
    <>
      <div className="actions">
        <input
          type="text"
          className="task-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search task"
        />
        <button onClick={addColumn}>
          <Plus className="icon" /> Add Column
        </button>
        <button>
          <RefreshCcw className="icon" /> Refresh
        </button>
      </div>
      <DragDropProvider
        onDragOver={(event) => {
          const { source } = event.operation;

          if (source?.type === "column") return;

          setBoard((board) => move(board, event));
        }}
        onDragEnd={(event) => {
          const { source } = event.operation;

          if (event.canceled || source?.type !== "column") return;

          setColumnOrder((columns) => move(columns, event));
        }}
      >
        <div className="board">
          {Object.entries(board).map(([column, items], idx) => (
            <Column key={column} id={column} index={idx} items={items}>
              <div className="card-cont">
                {items
                  .filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((uuid, idx) => (
                    <Card key={uuid} id={uuid} index={idx} column={column}>
                      <div className="card-actions">
                        <Trash
                          onClick={() => {
                            delCard(uuid, column);
                          }}
                          className="icon trash"
                        />
                      </div>
                    </Card>
                  ))}
              </div>
            </Column>
          ))}
        </div>
      </DragDropProvider>
    </>
  );
}

export default App;
