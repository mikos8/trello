let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedElement = null;
let mouse = { x: 0, y: 0 };

//добавляю событие на кнопку добавить колонку
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", addColumn);

//перебираю все колонки и добавляю события на кнопку добавить карточку
document.querySelectorAll(".column").forEach((columnElement) => {
  columnElement
    .querySelector("[data-action-addNote]")
    .addEventListener("click", addCards);
});

function addColumn(event) {
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
  const colElem = document.querySelector(
    `[data-column-id="${columnIdCounter}"]`
  );

  colElem
    .querySelector("[data-action-addNote]")
    .addEventListener("click", function (event) {
      const noteEl = document.createElement("div");
      noteEl.classList.add("note");
      noteEl.setAttribute("data-note-id", noteIdCounter);
      noteEl.setAttribute("grabble", "true");
      noteEl.innerText = prompt("write new Task");
      noteIdCounter++;

      colElem.querySelector("[data-notes]").append(noteEl);
      console.log(noteIdCounter);
    });
  columnIdCounter++;
}

function addCards(event) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note");
  noteEl.setAttribute("data-note-id", noteIdCounter);
  noteEl.setAttribute("grabble", "true");
  noteEl.innerText = prompt("write new Task");
  noteIdCounter++;
  columnElement.querySelector("[data-notes]").append(noteEl);
  console.log(noteIdCounter);
}
