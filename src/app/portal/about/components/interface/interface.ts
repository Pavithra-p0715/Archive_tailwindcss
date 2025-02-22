export interface NotesProps {
  open: boolean;
  onClose: () => void;
  value: { title: string; content: string };
  onValueChange: (field: "title" | "content", val: string) => void;
  onAdd: () => void;
  isEditing: boolean;
  onSave: () => void;
  onDelete: () => void;
}
export interface Note {
  createdAt: string;
  title: string;
  content: string;
}

export interface State {
  notes: Note[];
  open: boolean;
  isEditing: boolean;
  currentIndex: number | null;
  value: { title: string; content: string };
}

export interface UseNotesProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  onMessage: React.Dispatch<React.SetStateAction<string>>;
}
