const App = {
  save() {
    const object = {
      columns: {
        idCounter: Colon.columnIdCounter,
        items: [],
      },
      notes: {
        idCounter: Note.noteIdCounter,
        items: [],
      },
    };
    //-----------
    document.querySelectorAll(".column").forEach((columnElement) => {
      const column = {
        id: parseInt(columnElement.getAttribute("data-column-id")),
        noteIds: [],
      };
      columnElement.querySelectorAll(".note").forEach((noteElement) => {
        column.noteIds.push(parseInt(noteElement.getAttribute("data-note-id")));
      });
      object.columns.items.push(column);
    });
    //-----------
    document.querySelectorAll(".note").forEach((noteElement) => {
      const note = {
        id: parseInt(noteElement.getAttribute("data-note-id")),
        text: noteElement.innerText,
      };
      object.notes.items.push(note);
    });
    //save string
    const json = JSON.stringify(object);
    console.log(json);
    localStorage.setItem("trello", json);
    return object;
  },

  load() {
    if (!localStorage.getItem("trello")) {
      return;
    }

    const object = JSON.parse(localStorage.getItem("trello"));
    console.log(object);
  },
};
