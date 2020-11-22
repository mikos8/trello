const Colon = {
  columnIdCounter: 4,
  dragged: null, //колонку которую будем перетаскивать
  addColumn() {
    let text = prompt("write new item");
    const columEl = `<div class="column" draggable="true" data-column-id="${Colon.columnIdCounter}">
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
      `[data-column-id="${Colon.columnIdCounter}"]`,
    );

    //событие на надпись  [+ добавить карточку] условно кнопка
    colElem
      .querySelector("[data-action-addNote]")
      .addEventListener("click", Note.addCards);
    // добавляю событие на заголовок колонки чтобы редактировать
    const columnHeader = colElem.querySelector(".column-header");

    // добавляю событие на двойной клик для редактирования заголовка колонки
    columnHeader.addEventListener("dblclick", function (event) {
      columnHeader.setAttribute("contenteditable", true); //добавляю аттрибут
      columnHeader.focus(); //делаю фокус
    });

    //событие при потере фокуса то есть когда блюр=потеря фокуса
    columnHeader.addEventListener("blur", function (event) {
      columnHeader.removeAttribute("contenteditable", true);
      if (!colElem.textContent.length) {
        colElem.remove();
        colElem.setAttribute("draggable", "true");
      }
    });

    Colon.columnIdCounter++;
    Colon.addContentAttribute(colElem);
  },
  addContentAttribute(columnEl) {
    columnEl.addEventListener("dragstart", dragstart_HandlerColon);
    columnEl.addEventListener("dragend", dragend_HandlerColon);
    columnEl.addEventListener("dragenter", dragenter_HandlerColon);
    columnEl.addEventListener("dragover", dragover_HandlerColon);
    columnEl.addEventListener("dragleave", dragleave_HandlerColon);
    columnEl.addEventListener("drop", drop_HandlerColon);

    function dragstart_HandlerColon(event) {
      Colon.dragged = this;
      this.classList.add("dragged");
      console.log("dragstartColumn", this);
      event.stopPropagation();
      document
        .querySelectorAll(".note")
        .forEach((noteElem) => noteElem.removeAttribute("draggable"));
    }

    function dragend_HandlerColon(event) {
      event.stopPropagation();
      Colon.dragged = null;
      console.log("dragendColumn", this);
      this.classList.remove("dragged");
      document
        .querySelectorAll(".column")
        .forEach((colElem) => colElem.classList.remove("under"));
      document
        .querySelectorAll(".note")
        .forEach((noteElem) => noteElem.setAttribute("draggable", "true"));
    }
    //
    function dragenter_HandlerColon(event) {
      event.stopPropagation();
      if (!Colon.dragged || this === Colon.dragged) {
        return;
      }
      this.classList.add("under");
      console.log("dragenterColumn", this);
    }

    function dragover_HandlerColon(event) {
      event.preventDefault();
      event.stopPropagation();

      if (!Colon.dragged || this === Colon.dragged) {
        return;
      }
      console.log("dragoverColumn", this);
    }

    function dragleave_HandlerColon(event) {
      event.stopPropagation();
      if (!Colon.dragged || this === Colon.dragged) {
        return;
      }
      this.classList.remove("under");
      console.log("dragleaveColumn", this);
    }

    function drop_HandlerColon(event) {
      if (Note.dragged) {
        return this.querySelector("[data-notes]").append(Note.dragged);
      } else if (Colon.dragged) {
      }
      console.log("dropColumn", this);
    }
  },
};
