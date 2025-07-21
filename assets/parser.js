function parseMarkdown(markdown) {
  const lines = markdown.split("\n");
  const board = {};

  const headerRegex = /^# (.+)$/;
  const taskRegex = /^- \[ \] (.+?)<!--\s*\{"uuid":"([a-f0-9\-]+)"\}\s*-->/;
  let currentLabel;

  for (const line of lines) {
    const headerMatch = line.match(headerRegex);
    if (headerMatch) {
      currentLabel = headerMatch[1].trim();

      if (!board[currentLabel]) {
        board[currentLabel] = [];
      }
    }

    const taskMatch = line.match(taskRegex);
    if (taskMatch) {
      const taskTitle = taskMatch[1].trim();
      const taskId = taskMatch[2];

      board[currentLabel].push({ title: taskTitle, uuid: taskId });
    }
  }

  return board;
}

console.log(
  parseMarkdown(`
# Todo

- [ ] Task 1<!-- {"uuid":"78e80b42-e250-49d2-8d87-13320014d0a8"} -->

# In Progress

- [ ] Task 2<!-- {"uuid":"78e80b42-e250-49d2-8d87-13320014d0a8"} -->

# Done

- [ ] Task 3<!-- {"uuid":"78e80b42-e250-49d2-8d87-13320014d0a8"} -->
`),
);
