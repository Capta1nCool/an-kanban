export default function generateMD(board, columns) {
  let markdown = "";

  for (const column of columns) {
    markdown += `# ${column}\n`;
    for (const uuid of board[column]) {
      markdown += `- [ ]  ${uuid}\n`;
    }
  }
}

const board = {
  Todo: ["78e80b42-e250-49d2-8d87-13320014d0a8"],
  "In Progress": ["a978e80b-42e2-5049-d28d-8713320014d0"],
  Done: ["a348ccc9-afda-43da-b37a-6b2a4681d407"],
  Upcoming: ["d3bfce2d-d66b-46b0-8b94-23cc7ed51e9c"],
};

const columns = ["In Progress", "Todo", "Done", "Upcoming"];

generateMD(board, columns);
