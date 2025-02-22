"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import useNotes from "@/app/portal/about/components/AboutService/useAboutAction";
import { State } from "./interface/interface";
import Notes from "./notes";
import { FaPenFancy, FaRegUser } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";

export function About() {
  const [state, setState] = useState<State>({
    notes: [],
    open: false,
    isEditing: false,
    currentIndex: null,
    value: { title: "", content: "" },
  });

  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  const {
    handleChange,
    handleAddNote,
    handleEditNote,
    handleSaveNote,
    handleDeleteNote,
    resetNote,
  } = useNotes({
    state,
    setState,
    onMessage: setMessage as React.Dispatch<React.SetStateAction<string>>,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.fullName) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="pr-8 pl-8">
      <h1 className="text-3xl pt-4 font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text mb-6 text-center flex items-center justify-center gap-2">
        {user ? (
          <>
            <MdWavingHand size={28} className="text-yellow-500 animate-wave" />
            Good Morning, {user.fullName}!
          </>
        ) : (
          <>
            <FaRegUser size={28} className="text-gray-500" />
            Welcome, Guest
          </>
        )}
      </h1>

      {state.notes.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <BiNotepad size={24} className="text-blue-500" />
            Your Notes
          </h2>

          <div className="h-[950px] overflow-y-auto px-2 scroll-m-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {state.notes.map((note, index) => (
                <div
                  key={index}
                  className="p-5 w-[400px] rounded-xl bg-white h-96 shadow-lg border border-gray-200 transition transform hover:scale-105 hover:shadow-xl relative group"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-4">
                    Created on: {note.createdAt}
                  </p>
                  <button
                    className="absolute top-3 right-3 text-blue-500 hover:text-blue-700 transition-all"
                    onClick={() => handleEditNote(index)}
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 flex items-center justify-center gap-2">
          <FaPenFancy size={18} className="text-gray-400" />
          No notes yet. Add some!
        </p>
      )}

      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full shadow-lg text-white text-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce"
        onClick={resetNote}
      >
        <AiOutlinePlus size={24} />
      </button>

      <Notes
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
        value={state.value}
        onValueChange={handleChange}
        onAdd={handleAddNote}
        isEditing={state.isEditing}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />

      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInOut">
          {message}
        </div>
      )}
    </div>
  );
}

export default About;
