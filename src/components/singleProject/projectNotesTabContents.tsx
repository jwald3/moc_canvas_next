import React, { useState } from "react";
import { useProjectHomeContext } from "@/contexts/ProjectHomeContext";
import type { ProjectNoteObject } from "@/types/hand_spun_datatypes";

const ProjectNotesTabContents = () => {
    const { project, handleAddNote, handleDeleteNote } = useProjectHomeContext();
    const [newNote, setNewNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

    const handleSaveNote = async () => {
        if (!newNote.trim()) return;
        setIsSubmitting(true);
        try {
            await handleAddNote(newNote);
            setNewNote(""); // Clear input after saving
        } finally {
            setIsSubmitting(false);
        }
    };

    const onDeleteNote = async (noteId: string) => {
        if (!confirm('Are you sure you want to delete this note?')) return;
        setDeletingNoteId(noteId);
        try {
            await handleDeleteNote(noteId);
        } finally {
            setDeletingNoteId(null);
        }
    };

    return (
        <div className="space-y-4 pb-8">
            {/* Quick Notes Input */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a quick note..."
                    disabled={isSubmitting}
                    className="w-full min-h-[100px] p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
                />
                <div className="flex justify-end mt-3">
                    <button 
                        onClick={handleSaveNote}
                        disabled={isSubmitting || !newNote.trim()}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Saving...
                            </>
                        ) : (
                            'Save Note'
                        )}
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {/* Empty State */}
                {(!project?.notes || project.notes.length === 0) && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                        No notes yet. Add your first note above.
                    </div>
                )}

                {/* Note Items */}
                {project?.notes?.map((note: ProjectNoteObject) => (
                    <div key={note.id} className="p-4 group">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                {note.content}
                            </p>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => note.id && onDeleteNote(note.id)}
                                    className={`text-gray-400 hover:text-red-600 ${
                                        deletingNoteId === note.id ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={!note.id || deletingNoteId === note.id}
                                >
                                    {deletingNoteId === note.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500">
                            {note.createdAt && new Date(note.createdAt).toLocaleDateString()} at{" "}
                            {note.createdAt && new Date(note.createdAt).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectNotesTabContents;
