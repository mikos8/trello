let columnIdCounter = 4;
let mouse = { x: 0, y: 0 };
// элемент который перетаскиваем

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

function addColumn() {
  let text = prompt("write new item");
  const columEl = `<div class="column" draggable="true" data-column-id="${columnIdCounter}">
                <p class="column-header">${text}</p>
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
  //событие на налпись добавить карточку условно кнопка
  colElem
    .querySelector("[data-action-addNote]")
    .addEventListener("click", addCards);
  // добавляю событие на заголовок колонки чтобы редактировать
  const columnHeader = colElem.querySelector(".column-header");

  // добавляю событие на двойной клик для редактирования заголовка колонки
  columnHeader.addEventListener("dblclick", function (event) {
    columnHeader.setAttribute("contenteditable", true); //добавляю аттрибут
    columnHeader.focus(); //делаю фокус
  });

  //событие при потере фокуса то есть когда блюр
  columnHeader.addEventListener("blur", function (event) {
    columnHeader.removeAttribute("contenteditable", true);
  });

  if (!colElem.textContent.length) {
    colElem.remove();
  }

  columnIdCounter++;
}

function addCards(columnElement) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note");
  noteEl.setAttribute("data-note-id", Note.noteIdCounter);
  noteEl.setAttribute("draggable", "true");
  noteEl.innerText = prompt("write new Task");
  Note.noteIdCounter++;
  this.closest(".column").querySelector("[data-notes]").append(noteEl);
  console.log(this.closest(".column"));
  console.log(Note.noteIdCounter);
  addContentedAttribute(noteEl);
}
//
document.querySelectorAll(".note").forEach(addContentedAttribute);

//функция добавления аттрибутов

