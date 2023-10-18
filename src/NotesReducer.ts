import { type Note } from "./types";

// Actions
export const ADD_NOTE = 1;
export const UPDATE_NOTE = 2;
export const DELETE_NOTE = 3;

export type Action =
| {type: typeof ADD_NOTE, newNote: Note}
| {type: typeof UPDATE_NOTE, noteId: Note["id"], update: Partial<Omit<Note, "created" | "id">>}
| {type: typeof DELETE_NOTE, noteId: Note["id"]}

const NotesReducer = (state: Note[], action: Action): Note[] => {
  switch(action.type) {
    case ADD_NOTE:
      return [...state, action.newNote]
    case UPDATE_NOTE:
      return state.map(note => note.id === action.noteId ? {...note, ...action.update} : note);
    case DELETE_NOTE:
      return state.filter(note => note.id !== action.noteId);
    default:
      return state;
  }
}

export default NotesReducer;