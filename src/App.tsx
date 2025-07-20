import { useState } from "react";
import Column from "./components/Column";
import Card from "./components/Card";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

function App() {
  const [board, setBoard] = useState({
    Todo: ["A0", "A1", "A2"],
    "In Progress": ["B0", "B1"],
    Done: [],
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
                  .map((item, idx) => (
                    <Card key={item} id={item} index={idx} column={column}>
                      {item}
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
