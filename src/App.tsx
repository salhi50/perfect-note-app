import React from "react";
import NotesReducer, { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from "./NotesReducer";
import { type Note } from "./types";
import Button from "./Button";
import {BsList, BsX, BsPencilSquare, BsTrashFill} from "react-icons/bs";
import { nanoid } from "nanoid";

const App: React.FC = () => {
  const [notes, dispatch] = React.useReducer(NotesReducer, undefined, function() {
    const localNotes = localStorage.getItem("notes");
    return localNotes ? JSON.parse(localNotes) : [];
  });
  const [selectedNoteId, setSelectedNoteId] = React.useState<Note["id"] | null>(null);
  // For screen sizes (mobile)
  const [showAside, setShowAside] = React.useState(false);

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Close aside on screen sizes when selecting a note
  React.useEffect(() => {
    setShowAside(false);
  }, [selectedNoteId]);

  // Adding keyboard navigation for notes tabs
  function handleTabKeydown(e: React.KeyboardEvent<HTMLLIElement>) {
    const firstNote = notes[0];
    const lastNote = notes[notes.length - 1];
    const prevNote = notes[notes.indexOf(selectedNote!) - 1];
    const nextNote = notes[notes.indexOf(selectedNote!) + 1];
    const focusNoteTab = (note: Note) => {
      document.getElementById(`tab-${note.id}`)?.focus();
    }
    switch(e.key) {
      case "Backspace":
        e.preventDefault();
        deleteNote();
        break;
      case "ArrowUp":
        e.preventDefault();
        if(prevNote) focusNoteTab(prevNote);
        else focusNoteTab(lastNote);
        break;
      case "ArrowDown":
        e.preventDefault();
        if(nextNote) focusNoteTab(nextNote);
        else focusNoteTab(firstNote);
        break;
      case "Home":
        e.preventDefault();
        focusNoteTab(firstNote);
        break;
      case "End":
        e.preventDefault();
        focusNoteTab(lastNote);
        break;
    } 
  }

  function createNewNote() {
    const newNote: Note = {
      title: "",
      id: nanoid(6),
      body: "",
      created: new Date().toLocaleString(),
    }
    dispatch({type: ADD_NOTE,newNote});
    setSelectedNoteId(newNote.id);
  }

  function deleteNote() {
    let confirmed = confirm("Delete this note?");
    if(confirmed) {
      dispatch({type: DELETE_NOTE, noteId: selectedNoteId!});
      setSelectedNoteId(null);
    }
  }

  return <>
    <header className="ds:hidden">
      {/* button toggle aside */}
      <Button
        leadingIcon={<BsList aria-hidden size="20px" />}
        label="Your notes"
        onClick={() => setShowAside(true)}
        className="m-4"
      />
    </header>

    {/* Wrapper */}
    <div className="ds:grid grid-cols-[auto_1fr]">

      {/* Overlay is visible on screen sizes when aside is open */}
      <div 
        className={
          "bg-black bg-opacity-50 fixed inset-x-0 inset-y-0 ds:hidden" +
          (!showAside ? " hidden" : "")
        }
      />

      {/* Aside */}
      <aside 
        className={
          "bg-surface-1 pb-4 pt-12 h-full top-0 w-64 fixed left-0 ds:block ds:static ds:h-screen ds:pt-4 overflow-y-auto" +
          (!showAside ? " hidden" : "")
        }
        aria-label="Sidebar"
      >
        {/* Close aside on screen sizes button */}
        <Button
          label={null}
          leadingIcon={<BsX aria-hidden size="20px" />}
          onClick={() => setShowAside(false)}
          className="absolute top-4 right-4 ds:hidden"
          ariaLabel="Close sidebar"
        />
        
        <h1 id="notes-list-title" className="px-4 mb-4">Your notes</h1>

        {/* Notes list */}
        <ul
          role="tablist"
          aria-labelledby="notes-list-title"
          aria-orientation="vertical"
        >

          {notes.map((note, indx) => (
            <li
              role="tab"
              id={`tab-${note.id}`}
              aria-selected={note === selectedNote}
              tabIndex={note === selectedNote || (indx === 0 && !selectedNote) ? 0 : -1}
              className={
                "py-2 px-4 bg-surface-1 hover:bg-surface-2 select-none cursor-pointer font-medium active:bg-surface-4" +
                (note === selectedNote ? " bg-surface-4 pointer-events-none" : "")
              }
              children={note.title.trim().length > 0 ? note.title : "Untitled"}
              onClick={() => setSelectedNoteId(note.id)}
              onFocus={() => setSelectedNoteId(note.id)}
              onKeyDown={handleTabKeydown}
              key={note.id}
            />
          ))}

        </ul>

        {/* New note button */}
        <div className="px-4 mt-4 bg-surface-1">
          <Button
            label="New note"
            leadingIcon={<BsPencilSquare aria-hidden />}
            onClick={createNewNote}
            className="w-full"
          />
        </div>

      </aside>

      {/* Main content */}
      <main>
        {
        /* Note Card */
        selectedNote &&
        <div 
          className="h-96 mb-4 ds:m-[10vh_auto] max-w-2xl flex flex-col ds:h-[80vh] ds:px-4"
          aria-label="Note card"
        >

          {/* Card header */}
          <header 
            className="bg-surface-4 border-x-0 border-t-2 ds:border-x-2 border-solid border-main border-b-0 py-2 px-4"
            aria-label="Note card header"
          >
            {/* Note title */}
            <input
              type="text"
              placeholder="Title"
              className="border-0 bg-transparent text-lg font-medium block w-full"
              autoFocus
              value={selectedNote.title}
              onChange={e => dispatch({type: UPDATE_NOTE, noteId: selectedNoteId!, update: {title: e.target.value}})}
            />
            {/* Note date created */}
            <small className="mt-1 text-muted">
              Created: {selectedNote.created}
            </small>
          </header>

          {/* Card body */}
          <div 
            className="flex-1 bg-surface-1 border-x-0 border-y-2 ds:border-x-2 border-solid border-main px-4 py-2"
            aria-label="Note card body"
          >
            {/* Note body */}
            <textarea
              placeholder="Take notes..."
              className="h-full w-full border-0 bg-transparent block"
              value={selectedNote.body}
              onChange={e => dispatch({type: UPDATE_NOTE, noteId: selectedNoteId!, update: {body: e.target.value}})}
            />
          </div>

          {/* Card footer */}
          <footer 
            className="bg-transparent py-2 px-4 ds:px-0"
            aria-label="note card footer"
          >
            <Button
              label="Delete"
              leadingIcon={<BsTrashFill aria-hidden />}
              onClick={deleteNote}
            />
          </footer>

        </div>
        }
      </main>

    </div>
  </>
}

export default App;