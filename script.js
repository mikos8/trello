let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedElement = null;
let mouse = { x: 0, y: 0 };

//добавляю событие на кнопку добавить колонку
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", function (event) {
    let text = prompt("write new item");
    const columEl = `<div class="column" draggable="true" data-column-id="${columnIdCounter}">
            <p class="column-header" contenteditable="true">${text}</p>
            <div data-notes></div>
            <p class="column-footer">
              <span data-action-addNote class="action"
                >+ Добавить карточку</span
              >
            </p>
          </div>`;

    document.querySelector(".columns").insertAdjacentHTML("beforeend", columEl);

    console.log(columEl);
    const colEl = document.querySelector(
      `[data-column-id="${columnIdCounter}"]`
    );
    colEl
      .querySelector("[data-action-addNote]")
      .addEventListener("click", function (event) {
        const noteEl = document.createElement("div");
        noteEl.classList.add("note");
        noteEl.setAttribute("data-note-id", noteIdCounter);
        noteEl.setAttribute("grabble", "true");
        noteIdCounter++;

        colEl.querySelector("[data-notes]").append(noteEl);
        console.log(noteIdCounter);
      });
    columnIdCounter++;
  });

//перебираю все колонки и добавляю события на кнопку добавить карточку
document.querySelectorAll(".column").forEach((columnElement) => {
  let numArray = document.querySelectorAll(".column");
  console.log(numArray);
  columnElement
    .querySelector("[data-action-addNote]")
    .addEventListener("click", function (event) {
      const noteEl = document.createElement("div");
      noteEl.classList.add("note");
      noteEl.setAttribute("data-note-id", noteIdCounter);
      noteEl.setAttribute("grabble", "true");
      noteIdCounter++;

      columnElement.querySelector("[data-notes]").append(noteEl);
      console.log(noteIdCounter);
    });
});

function scanDocElement() {
  let numArray = document.querySelectorAll(".column");
  numArray.forEach((columnElement) => {
    if (columnElement == numArray.length - 1) {
      columnElement
        .querySelector("[data-action-addNote]")
        .addEventListener("click", function (event) {
          /*let notesElwrapper = columnElement.querySelector("[data-notes]");
      const cartItemHTML = `<div class="note" draggable="true" data-note-id="${noteIdCounter}">Купить собачий корм.</div>`;
      notesElwrapper.insertAdjacentHTML("beforeend", cartItemHTML);
      console.log("add task");
      ++noteIdCounter;*/
          const noteEl = document.createElement("div");
          noteEl.classList.add("note");
          noteEl.setAttribute("data-note-id", noteIdCounter);
          noteEl.setAttribute("grabble", "true");
          noteIdCounter++;

          columnElement.querySelector("[data-notes]").append(noteEl);
          console.log(noteIdCounter);
        });
    }
  });
}
