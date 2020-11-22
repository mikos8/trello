let mouse = { x: 0, y: 0 };

//добавляю событие на кнопку добавить колонку
document
  .querySelector("[data-action-addColumn]")
  .addEventListener("click", Colon.addColumn);

//перебираю все колонки и добавляю события на кнопку добавить карточку
document.querySelectorAll(".column").forEach((columnElement) => {
  columnElement
    .querySelector("[data-action-addNote]")
    .addEventListener("click", Note.addCards);
});

document.querySelectorAll(".note").forEach(Note.addContentedAttribute);
document.querySelectorAll(".column").forEach(Colon.addContentAttribute);
