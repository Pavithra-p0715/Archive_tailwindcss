"use client";

import { State, UseNotesProps } from "../interface/interface";

const useNotes = ({ state, setState, onMessage }: UseNotesProps) => {
  const updateState = (updates: Partial<State>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handleChange = (field: keyof State["value"], val: string) =>
    updateState({ value: { ...state.value, [field]: val } });

  const handleAddNote = () => {
    if (!state.value.title.trim() || !state.value.content.trim()) return;
    updateState({
      notes: [
        ...state.notes,
        { ...state.value, createdAt: new Date().toLocaleString() },
      ],
      open: false,
      value: { title: "", content: "" },
    });
    onMessage("Note added successfully!");
    setTimeout(() => {
      onMessage("");
    }, 3000);
  };

  const handleEditNote = (index: number) =>
    updateState({
      value: state.notes[index],
      currentIndex: index,
      isEditing: true,
      open: true,
    });

  const handleSaveNote = () => {
    if (
      !state.value.title.trim() ||
      !state.value.content.trim() ||
      state.currentIndex === null
    )
      return;
    const updatedNotes = [...state.notes];
    updatedNotes[state.currentIndex] = {
      ...state.value,
      createdAt: updatedNotes[state.currentIndex].createdAt,
    };
    updateState({
      notes: updatedNotes,
      open: false,
      value: { title: "", content: "" },
      isEditing: false,
      currentIndex: null,
    });
    onMessage("Note updated successfully!");
    setTimeout(() => {
      onMessage("");
    }, 3000);
  };

  const handleDeleteNote = () => {
    if (state.currentIndex !== null) {
      updateState({
        notes: state.notes.filter((_, i) => i !== state.currentIndex),
        open: false,
        value: { title: "", content: "" },
        isEditing: false,
        currentIndex: null,
      });
      onMessage("Note deleted successfully!");
      setTimeout(() => {
        onMessage("");
      }, 3000);
    }
  };

  const resetNote = () =>
    updateState({
      value: { title: "", content: "" },
      isEditing: false,
      currentIndex: null,
      open: true,
    });

  return {
    handleChange,
    handleAddNote,
    handleEditNote,
    handleSaveNote,
    handleDeleteNote,
    resetNote,
  };
};

export default useNotes;
