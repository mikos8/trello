const Note = {
    noteIdCounter:8,
    draggedNote: null,
    addContentedAttribute(noteElement) {
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
          Note.draggedNote = this;
          this.classList.add("dragged");
          console.log("dragstart", event, this);
        }
      
        function dragend_noteHandler(event) {
          Note.draggedNote = null;
          this.classList.remove("dragged");
      
          document
            .querySelectorAll(".note")
            .forEach((noteEl) => noteEl.classList.remove("under"));
      
          console.log("dragend", event, this);
        }
      
        function dragenter_noteHandler(event) {
          if (this === Note.draggedNote) {
            return;
          }
          this.classList.add("under");
          console.log("dragenter", event, this);
        }
      
        function dragover_noteHandler(event) {
          event.preventDefault();
          if (this === Note.draggedNote) {
            return;
          }
          console.log("dragover", event, this);
        }
      
        function dragleave_noteHandler(event) {
          if (this === Note.draggedNote) {
            return;
          }
          this.classList.remove("under");
          console.log("dragleave", event, this);
        }
      
        function drop_noteHandler(event) {
          if (this === Note.draggedNote) {
            return;
          }
      
          if (this.parentElement === Note.draggedNote.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll(".note"));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.draggedNote);
            console.log(indexA, indexB);
            if (indexA < indexB) {
              this.parentElement.insertBefore(Note.draggedNote, this);
            } else {
              this.parentElement.insertBefore(Note.draggedNote, this.nextElementSibling);
            }
          } else {
            this.parentElement.insertBefore(Note.draggedNote, this);
          }
      
          console.log("drop", event, this);
        }
      }
}