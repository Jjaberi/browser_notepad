//variables ------------------
const noteList = document.querySelector('#note-list')




//eventlisteners ----------------------

// eventlisteners function 
eventlistener()

function eventlistener(){
    // find submit and run newNote function
    document.querySelector('#form').addEventListener('submit', newNote)
    // remove text 
    document.querySelector('#note-list').addEventListener('click', deleteNote)
    // load data from local storage
    document.addEventListener('DOMContentLoaded', localStorageLoaded)
}



//functions --------

// adding form to submit
function newNote(e){
    e.preventDefault()
    // add removeBtn 
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'X'
    // add class list
    removeBtn.classList = 'remove-note'
    // accesss to data
    const note = document.querySelector('#note').value 
    // create li tag 
    const li = document.createElement('li')
    // add note value to li tag
    li.appendChild(document.createTextNode(note))
    // add remove btn to li 
    li.appendChild(removeBtn)
    // add li to note list
    noteList.appendChild(li)
    // reset form
    this.reset()
    // add note from ls
    addNotesFromLocalStorage(note)
    alert('saved')

}
// delete note function 
function deleteNote(e){
    // check if remove note contain
    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove()
    }
    // delete note form ls
    removeNoteFromLocalStorage(e.target.parentElement.textContent)
    alert('deleted')
}

function addNotesFromLocalStorage(note){
    // get notes form ls
    const notes  = getNotesFromLocalStorage()
    // add notes to array 
    notes.push(note)
    // set item to ls 
    localStorage.setItem('notes', JSON.stringify(notes))

}

function getNotesFromLocalStorage(){
    let notes;
    // get previous data from ls
    let getFromLS = localStorage.getItem('notes')
    // check notes is exist or not
    if(getFromLS == null){
        notes = []
    }else{
        notes = JSON.parse(getFromLS)
    }
    return notes
}

function localStorageLoaded(){
    const notes = getNotesFromLocalStorage()
    // add all notes to ls
    notes.forEach(function(note){
        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
        // add class list
        removeBtn.classList = 'remove-note'
        // create li tag 
        const li = document.createElement('li')
        // add note value to li tag
        li.appendChild(document.createTextNode(note))
        // add remove btn to li 
        li.appendChild(removeBtn)
        // add li to note list
        noteList.appendChild(li)  
    });


}

function removeNoteFromLocalStorage(noteContent){
    // remove note from page
    const noteDelete = noteContent.substring(0, noteContent.length - 1)

    const notesFromls = getNotesFromLocalStorage()
    // remove note from ls
    notesFromls.forEach(function(note, index){
        if (note == noteDelete){
            notesFromls.splice(index, 1)
        }
    })
    localStorage.setItem('notes', JSON.stringify(notesFromls))
}