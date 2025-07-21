import { useState } from "react";
import Column from "./components/Column";
import Card from "./components/Card";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

declare global {
  interface Window {
    callAmplenotePlugin: (
      method: string,
      uuid: string,
    ) => { content: string; uuid: string }; // TODO: Change it to amplenote task type
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

  const addColumn = () => {
    const name = prompt("Enter column name");
    if (!name) return;

    setBoard((prevBoard) => ({
      ...prevBoard,
      [name.trim()]: [],
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
        <button onClick={addColumn}>Add Column</button>
        <button>Refresh</button>
      </div>
      <DragDropProvider
        onDragOver={(event) => {
          setBoard((board) => move(board, event));
        }}
      >
        <div className="board">
          {Object.entries(board).map(([column, items]) => (
            <Column key={column} id={column}>
              <div className="head">
                <h3>{column}</h3>
                <span>{items.length}</span>
              </div>

              <div className="card-cont">
                {items
                  .filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((uuid, idx) => (
                    <Card
                      key={uuid}
                      id={uuid}
                      index={idx}
                      column={column}
                    ></Card>
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
