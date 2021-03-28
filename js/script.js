// Declaring all necessary variable
const usertext = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const searchInput = document.querySelector(".search input");
const searchContainer = document.querySelector(".search");
const msgHandler = document.querySelector(".msgHandler");
const notes = [];
searchContainer.style.display = "none";
msgHandler.style.display = "none";

// Function To Get Note from USER
const getNotes = (e) => {
  e.preventDefault();
  // Handling empty values
  if (usertext.value == "") {
    usertext.value = "";
    return handler(1);
  }
  // Don't let user to input duplicates
  const checkDuplicate = notes.filter((note) => {
    return usertext.value.trim().toLowerCase() == note.trim().toLowerCase();
  });
  if (checkDuplicate.length > 0) {
    return handler(3);
  }
  handler(0);
  notes.push(usertext.value);
  showNotes(notes);
  usertext.value = "";
};

// Display Notes in Webpage
const showNotes = (notes) => {
  // Show search feature to the user
  if (notes.length > 0) {
    searchContainer.style.display = "block";
  }
  const userInner = document.createElement("li");
  notes.forEach((element) => {
    userInner.innerHTML = `<span>${element}</span> <i class="far fa-trash-alt"></i>`;
    ul.appendChild(userInner);
  });
};

// Delete a Single note
const deleteNote = (e) => {
  if (e.target.className == "far fa-trash-alt") {
    if (ul.childNodes.length == 1) {
      searchContainer.style.display = "none";
    }
    handler(2);
    e.target.parentElement.remove();
  }
};

const handler = (successID) => {
  msgHandler.style.display = "block";

  switch (successID) {
    case 0:
      msgHandler.innerText = "Note Added Successfully";
      break;
    case 1:
      msgHandler.innerText = "Enter A Value";
      break;
    case 2:
      msgHandler.innerText = "Note Deleted Successfully";
      break;
    case 3:
      msgHandler.innerText = "Note Title Already Exists";
      break;
  }

  setTimeout(() => {
    msgHandler.style.display = "none";
  }, 3000);
};

// Search Note by user input into search field
const search = (e) => {
  ul.childNodes.forEach((child) => {
    child.style.display = "block";
    if (!child.firstChild.innerText.includes(e.target.value)) {
      child.style.display = "none";
    }
  });
};

// Event listener for form submission
form.addEventListener("submit", getNotes);

// Event listener for deleting Note
ul.addEventListener("click", deleteNote);

// Search Feature
searchInput.addEventListener("keyup", search);
