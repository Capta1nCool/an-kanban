import { useEffect, useState } from "react";
import Column from "./components/Column";
import Card from "./components/Card";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { Plus, RefreshCcw, Trash } from "lucide-react";

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
    callAmplenotePlugin: {
      (method: "fetchTask", uuid: string): AmplenoteTask;
      (method: "fetchNote"): { [key: string]: string[] };
      (
        method: "generateMD",
        board: { [key: string]: string[] },
        columnOrder: string[],
      ): { [key: string]: string[] };
    };
  }
}

function App() {
  const [board, setBoard] = useState<{ [key: string]: string[] }>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  useEffect(() => {
    const loadBoard = async () => {
      const newBoard = await window.callAmplenotePlugin("fetchNote");
      setBoard(newBoard);
      setColumnOrder(Object.keys(newBoard));
    };

    loadBoard();
  }, []);

  const addColumn = () => {
    const name = prompt("Enter column name");
    if (!name) return;

    setBoard((prevBoard) => ({
      ...prevBoard,
      [name.trim()]: [],
    }));
  };

  const delCard = (uuid: string, column: string) => {
    setBoard((prevBoard) => {
      const typedColumn = column as keyof typeof prevBoard;
      return {
        ...prevBoard,
        [typedColumn]: prevBoard[typedColumn].filter(
          (item: string) => item !== uuid,
        ),
      };
    });
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
          window.callAmplenotePlugin("generateMD", board, columnOrder);
        }}
        onDragEnd={(event) => {
          const { source } = event.operation;

          if (event.canceled || source?.type !== "column") return;

          setColumnOrder((columns) => move(columns, event));
          window.callAmplenotePlugin("generateMD", board, columnOrder);
        }}
      >
        <div className="board">
          {Object.entries(board).map(([column, items], idx) => (
            <Column key={column} id={column} index={idx} items={items}>
              <div className="card-cont">
                {items.map((uuid: string, idx: number) => (
                  <Card
                    key={uuid}
                    id={uuid}
                    index={idx}
                    column={column}
                    searchQuery={searchQuery}
                  >
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
