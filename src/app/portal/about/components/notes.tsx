"use client";

import React from "react";
import { NotesProps } from "./interface/interface";

const Notes: React.FC<NotesProps> = ({
  open,
  onClose,
  value,
  onValueChange,
  onAdd,
  isEditing,
  onSave,
  onDelete,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="w-[90%] md:w-1/2 bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-xl transition-all transform scale-100 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            {isEditing ? "Edit Note" : "Create a Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white text-xl hover:scale-110 transition-transform"
          >
            ✖
          </button>
        </div>

        <hr className="mb-4 border-white/40" />

        {!isEditing && (
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 bg-transparent border border-white/40 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
            value={value.title}
            onChange={(e) => onValueChange("title", e.target.value)}
          />
        )}

        <textarea
          placeholder="Write your note..."
          className="w-full p-3 bg-transparent border border-white/40 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          rows={4}
          value={value.content}
          onChange={(e) => onValueChange("content", e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all"
              >
                Save
              </button>
              <button
                onClick={onDelete}
                className="px-5 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onAdd}
                className="px-5 py-2 rounded-lg bg-green-500 text-white shadow-md hover:bg-green-600 transition-all"
              >
                Add Note
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-gray-500 text-white shadow-md hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
