# Amplenote Kanban Plugin


## Todo

- [x] Kanban Board
- [x] Search Task
- [x] Add card and column
- [x] Delete Card
- [x] Fetch tasks from note
- [ ] Parse data back to note
- [ ] Lexical Integration
- [ ] Task completion
- [ ] RichFootnote Integration
- [ ] Update task option

- [ ] Update the style be more similar to the old version of the plugin



## Backups

```
:root {
    --sk-back-1: hsl(0, 0%, 100%);
    --sk-back-2: hsl(0, 0%, 100%);
    --sk-back-3: hsl(206, 64%, 98%);
    --sk-back-4: hsl(206, 44%, 93%);
    --sk-back-5: hsl(206, 20%, 80%);
    --sk-text-1: hsl(0, 0%, 13%);
    --sk-text-2: hsl(0, 0%, 27%);
    --sk-text-3: hsl(240, 8%, 44%);
    --border-rad: 10px;
}

body {
    background-color: var(--sk-back-3);
    color: var(--sk-text-1);
    font-family: sans-serif;
    margin: 0.75em;
}

@media (prefers-color-scheme: dark) {
    :root {
        --sk-back-1: hsl(0, 0%, 10%);
        --sk-back-2: hsl(0, 0%, 18%);
        --sk-back-3: hsl(0, 0%, 14%);
        --sk-back-4: hsl(0, 0%, 22%);
        --sk-back-5: hsl(0, 0%, 40%);
        --sk-text-1: hsl(0, 0%, 90%);
        --sk-text-2: hsl(0, 0%, 80%);
        --sk-text-3: hsl(0, 0%, 65%);
    }
}

.actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 20px 0px;
}

.task-search {
    border: none;
    background-color: var(--sk-back-1);
    padding: 0.5rem;
    border-radius: var(--border-rad);
    color: var(--sk-text-1);
    outline: none;
}

.actions button {
    background-color: var(--sk-back-1);
    padding: 0.6rem;
    border-radius: var(--border-rad);
    color: var(--sk-text-1);
    border: none;
    cursor: pointer;
}

.board {
    display: flex;
    align-items: stretch;
    gap: 1rem;
}

.column {
    display: flex;
    flex-direction: column;
    flex: 1 1 1;
    box-sizing: border-box; /* FIXES THE SCALING ISSUE OF useSortable */
    gap: 1rem;
    min-width: 35ch;
    background-color: var(--sk-back-1);
    padding: 1.2rem;
    border-radius: var(--border-rad);
    cursor: pointer;
    transition: all 0.3s ease;
}

.head {
    display: flex;
}

.head > span {
    margin-left: auto;
    color: var(--sk-text-3);
}

h3 {
    margin-block-start: 0;
    margin-block-end: 0.5rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
}

.card-cont {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.card {
    display: flex;
    justify-content: space-between;
    appearance: none;
    background: var(--sk-back-3);
    padding: 1rem;
    border-radius: var(--border-rad);
    cursor: grab;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    transform: scale(1);
    box-shadow:
        inset 0px 0px 1px rgba(0, 0, 0, 0.4),
        0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
        0px 1px calc(2px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.05);
}

.card[data-dragging="true"] {
    transform: scale(1.02);
}
```
