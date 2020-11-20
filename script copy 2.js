let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedElement = null;
let mouse = { x: 0, y: 0 };
let draggedNote = null; // элемент который перетаскиваем

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
function addContentedAttribute(noteElement) {
  noteElement.addEventListener("dblclick", function (event) {
    noteElement.setAttribute("contenteditable", "true");
    noteElement.removeAttribute("draggable");
    noteElement.closest(".column").removeAttribute("draggable");
    noteElement.focus();
  });

  noteElement.addEventListener("blur", function (event) {
    noteElement.removeAttribute("contenteditable", "true");
    if (!noteElement.textContent.length) {
      noteElement.remove();
      noteElement.setAttribute("draggable", "true");
      noteElement.closest(".column").setAttribute("draggable", "true");
    }
  });

  noteElement.addEventListener("dragstart", dragstart_noteHandler);
  noteElement.addEventListener("dragend", dragend_noteHandler);
  noteElement.addEventListener("dragenter", dragenter_noteHandler);
  noteElement.addEventListener("dragover", dragover_noteHandler);
  noteElement.addEventListener("dragleave", dragleave_noteHandler);
  noteElement.addEventListener("drop", drop_noteHandler);

  function dragstart_noteHandler(event) {
    draggedNote = this;
    this.classList.add("dragged");
    console.log("dragstart", event, this);
  }

  function dragend_noteHandler(event) {
    draggedNote = null;
    this.classList.remove("dragged");

    document
      .querySelectorAll(".note")
      .forEach((noteEl) => noteEl.classList.remove("under"));

    console.log("dragend", event, this);
  }

  function dragenter_noteHandler(event) {
    if (this === draggedNote) {
      return;
    }
    this.classList.add("under");
    console.log("dragenter", event, this);
  }

  function dragover_noteHandler(event) {
    event.preventDefault();
    if (this === draggedNote) {
      return;
    }
    console.log("dragover", event, this);
  }

  function dragleave_noteHandler(event) {
    if (this === draggedNote) {
      return;
    }
    this.classList.remove("under");
    console.log("dragleave", event, this);
  }

  function drop_noteHandler(event) {
    if (this === draggedNote) {
      return;
    }

    if (this.parentElement === draggedNote.parentElement) {
      const note = Array.from(this.parentElement.querySelectorAll(".note"));
      const indexA = note.indexOf(this);
      const indexB = note.indexOf(draggedNote);
      console.log(indexA, indexB);
      if (indexA < indexB) {
        this.parentElement.insertBefore(draggedNote, this);
      } else {
        this.parentElement.insertBefore(draggedNote, this.nextElementSibling);
      }
    } else {
      this.parentElement.insertBefore(draggedNote, this);
    }

    console.log("drop", event, this);
  }
}
