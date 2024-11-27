const addNoteBtn = document.getElementById("add-note-btn");
const viewNotesBtn = document.getElementById("view-notes-btn");
const notesList = document.getElementById("notes-list");
const noteContent = document.getElementById("note-content");


async function fetchNotes() {
    const response = await fetch("http://localhost:3000/notes");
    const notes = await response.json();
    renderNotesList(notes);
}


function renderNotesList(notes) {
    notesList.innerHTML = "";
    notes.forEach(note => {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note-item");

        const noteTitle = document.createElement("span");
        noteTitle.textContent = note.title;
        noteItem.appendChild(noteTitle);

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteNote(note.id));

        noteItem.appendChild(deleteBtn);

        noteItem.addEventListener("click", () => viewNoteContent(note.id));
        notesList.appendChild(noteItem);
    });
}


async function viewNoteContent(noteId) {
    const response = await fetch(`http://localhost:3000/notes/${noteId}`);
    const note = await response.json();
    noteContent.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
    `;
}


async function addNewNote() {
    const title = prompt("Enter the title for the note:");
    if (!title) return;

    const content = prompt("Enter the content for the note:");
    if (!content) return;

    const newNote = { title, content };

    const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
    });

    const savedNote = await response.json();
    alert("Note added successfully!");
    fetchNotes();  
}


async function deleteNote(noteId) {
    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        alert("Note deleted successfully!");
        fetchNotes();  
    } else {
        alert("Error deleting note!");
    }
}


addNoteBtn.addEventListener("click", addNewNote);
viewNotesBtn.addEventListener("click", fetchNotes);


fetchNotes();
