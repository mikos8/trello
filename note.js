const Note = {
  noteIdCounter: 8,
  draggedElement: null,
  dragged: null,
  addContentedAttribute(noteElement) {
    // добавляю событие на двойной клик для редактирования "contenteditable"
    noteElement.addEventListener("dblclick", function (event) {
      noteElement.setAttribute("contenteditable", "true");
      noteElement.removeAttribute("draggable");
      noteElement.closest(".column").removeAttribute("draggable");
      noteElement.focus();
    });
    //событие при потере фокуса то есть когда блюр
    noteElement.addEventListener("blur", function (event) {
      noteElement.removeAttribute("contenteditable", "true");
      // если карта пустая удалем ее
      if (!noteElement.textContent.length) {
        noteElement.remove();
        noteElement.setAttribute("draggable", "true");
        noteElement.closest(".column").setAttribute("draggable", "true");
      }
    });

    noteElement.addEventListener("dragstart", Note.dragstart_noteHandler);
    noteElement.addEventListener("dragend", Note.dragend_noteHandler);
    noteElement.addEventListener("dragenter", Note.dragenter_noteHandler);
    noteElement.addEventListener("dragover", Note.dragover_noteHandler);
    noteElement.addEventListener("dragleave", Note.dragleave_noteHandler);
    noteElement.addEventListener("drop", Note.drop_noteHandler);
  },
  //карта которую перетаскивают
  dragstart_noteHandler(event) {
    Note.draggedNote = this;
    this.classList.add("dragged");
    console.log("dragstart Note", this);

    document
      .querySelectorAll(".column")
      .forEach((colElem) => colElem.removeAttribute("draggable"));
  },
  //карта которую перестали перетаскивать
  dragend_noteHandler(event) {
    Note.draggedNote = null;
    this.classList.remove("dragged");
    document
      .querySelectorAll(".note")
      .forEach((noteEl) => noteEl.classList.remove("under"));

    console.log("dragend Note", this);

    document
      .querySelectorAll(".column")
      .forEach((colElem) => colElem.setAttribute("draggable", "true"));
  },
  //карта над которой только начали вводить перетаскиваемую карту
  dragenter_noteHandler(event) {
    event.stopPropagation();
    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.add("under");
    console.log("dragenter Note", this);
  },

  dragover_noteHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    console.log("dragover Note", this);
  },
  //покинули карту над которой вводили перестаскиваемую
  dragleave_noteHandler(event) {
    event.stopPropagation();
    if (!Note.dragged || this === Note.dragged) {
      return;
    }
    this.classList.remove("under");
    console.log("dragleave Note", this);
  },
  //карта на которую перетащили перетаскиваемую карту. кинули карту сверху
  drop_noteHandler(event) {
    event.stopPropagation();
    // условие для карточек если элемент не равен также карточке тогжа вызываем событие
    if (!Note.dragged || this === Note.dragged) {
      return;
    }

    if (this.parentElement === Note.dragged.parentElement) {
      const note = Array.from(this.parentElement.querySelectorAll(".note"));
      const indexA = note.indexOf(this);
      const indexB = note.indexOf(Note.dragged);
      console.log(indexA, indexB);

      if (indexA < indexB) {
        this.parentElement.insertBefore(Note.dragged, this);
      } else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
      }
    } else {
      this.parentElement.insertBefore(Note.dragged, this);
    }

    console.log("drop Note", this);
  },
  addCards(columnElement,id = null) { 
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");

    if(id){
      noteEl.setAttribute("data-note-id", id);
    }else{
      noteEl.setAttribute("data-note-id", Note.noteIdCounter);
      Note.noteIdCounter++;
    }
      
    noteEl.setAttribute("draggable", "true");
    noteEl.innerText = prompt("write new Task");
    
    this.closest(".column").querySelector("[data-notes]").append(noteEl);
    console.log(this.closest(".column"));
    console.log(Note.noteIdCounter);
    Note.addContentedAttribute(noteEl);
  },
};
