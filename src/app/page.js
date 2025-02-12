"use client"
import { useState, useEffect } from 'react';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return;
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes((prev) => [...prev, data]);
      setNewNote('');
    } else {
      console.error("Failed to add note");
    }
  };

  const updateNote = async () => {
    if (!editingContent.trim()) return;
    const res = await fetch(`/api/notes/${editingNote}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editingContent.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes((prev) =>
        prev.map((note) => (note._id === editingNote ? data : note))
      );
      setEditingNote(null);
      setEditingContent('');
    } else {
      console.error("Failed to update note");
    }
  };

  const startEditing = (note) => {
    setEditingNote(note._id);
    setEditingContent(note.content);
  };

  const deleteNote = async (id) => {
    const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } else {
      console.error("Failed to delete note");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Notes</h1>
      <div className="my-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border p-2 w-full"
          placeholder="New note..."
        />
        <button onClick={addNote} className="bg-blue-500 text-white p-2 mt-2 w-full">
          Add Note
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note._id} className="border p-2 flex justify-between my-2">
            {editingNote === note._id ? (
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{note.content}</span>
            )}
            <div>
              {editingNote === note._id ? (
                <button onClick={updateNote} className="text-green-500 ml-2">Save</button>
              ) : (
                <button onClick={() => startEditing(note)} className="text-yellow-500 ml-2">Edit</button>
              )}
              <button onClick={() => deleteNote(note._id)} className="text-red-500 ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
