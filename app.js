
// Add note
document.addEventListener('DOMContentLoaded', buildNotes);
document.querySelector(".add-note").addEventListener('click', appendNote);
document.querySelector('.delete-all-btn').addEventListener('click', deleteAll);
removeDeleteButton();

function appendNote(){
    const title = document.querySelector(".title").value.trim();
    const text = document.querySelector(".text-area").value.trim();

    if(title && text){   // If both text and title are provided
        let storage = Object.keys(localStorage);
        if(storage.includes(title)){
            return;
        }
        else{
            localStorage.setItem(title, text);
            document.querySelector(".title").value  = "";
            document.querySelector(".text-area").value = "";
            location.reload();
        }
    }
}

function buildNotes(){
    let storage = Object.keys(localStorage);
    for(let i = 0; i < storage.length; i++){
        if(storage[i] === "theme"){
            continue;
        }
        let value = localStorage.getItem(storage[i]);

        // Create all the tags
        let display = document.createElement('div');
        display.classList.add('display');

        let notesContainer = document.createElement('div');
        notesContainer.classList.add('notes-container');

        let notes = document.createElement('div');
        notes.classList.add('notes');
        notes.innerText = value;

        let modify = document.createElement('div');
        modify.classList.add('modify');

        let deleteNote = document.createElement('button');
        deleteNote.setAttribute("type", "submit");
        deleteNote.classList.add('delete-note');
        deleteNote.innerText = "Delete";
        deleteNote.addEventListener("click", function(){
            let storage =  Object.keys(localStorage);
            if(storage.includes(storage[i])){
                localStorage.removeItem(storage[i]);
            }
            location.reload();
        });

        let editNote = document.createElement('button');
        editNote.setAttribute('type', "submit");
        editNote.classList.add('edit');
        editNote.innerText = "Edit";
        editNote.addEventListener("click", () => {    // Edit Note
            let storage = Object.keys(localStorage);
            if(storage.includes(storage[i])){
                document.querySelector(".display-container").classList.toggle("off");

                const editContainer = document.createElement("div");
                editContainer.classList.add("edit-container");

                const editTextArea = document.createElement('textarea');
                editTextArea.setAttribute("cols", "40");
                editTextArea.setAttribute("rows", "15");
                editTextArea.classList.add("edit-area");

                const finishButton = document.createElement("button");
                finishButton.setAttribute("type", "submit");
                finishButton.classList.add("finish");
                finishButton.innerText = "Finish";

                editContainer.append(editTextArea);
                editContainer.append(finishButton);
                document.querySelector("#notes-info").append(editContainer);
                editTextArea.value = localStorage.getItem(storage[i]);

                // After editing, the user should submit
                finishButton.addEventListener('click', () => {
                    if(editTextArea.value !== ""){  // Ensure the user enters the right value
                        localStorage.setItem(storage[i], editTextArea.value);

                        document.querySelector(".display-container").classList.toggle("off");
                        document.querySelector(".delete-all").classList.toggle("off");
                        editContainer.classList.toggle("off");
                        document.querySelector('.input-section').style.display = "none";
                        location.reload();
                    }
                });
            }
        });

        modify.append(deleteNote);
        modify.append(editNote);

        notesContainer.append(notes);
        notesContainer.append(modify);

        display.append(notesContainer);
        document.querySelector(".display-container").append(display);
    }
}

function removeDeleteButton(){                  // Remove Delete Button
    if(localStorage.length <= 1){
        document.querySelector(".delete-all").style.display = "none";
    }
}

function deleteAll(){
    let storage = Object.keys(localStorage);
    storage.forEach((key) => {
        localStorage.removeItem(key);
        location.reload();
    });
}