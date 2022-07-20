// Book Constructor
function Book(title, author, isbn) {
  (this.title = title), (this.author = author), (this.isbn = isbn);
}

// UI COnstructor
function UI() {}
// taking all the input values and showing all the info inserted as table rows
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};
// after submitting a book, we want to leave all the input areas clear.
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
// creatign the pop up alert if the fields are empty
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className} `;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // container is the div that contains this entire form and here we are adding the div - which is a pop up alert before the form - on top of the form to be precise
  container.insertBefore(div, form);
  //set time out function for the pop up window to disappear after 3 secs
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};
// Target the delete button to delete the entire row
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Event listener for submit button for some reason targetting the entire form (the "book-form" id is the id for the form not just for the submit input)
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please Fill Out All The Fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted", "error");
  e.preventDefault();
});
