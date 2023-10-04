import { Note } from "./App";
import {
	useParams,
	Outlet,
	Navigate,
	useOutletContext,
} from "react-router-dom";
type NoteLayoutProps = {
	notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
	const { id } = useParams();
	const note = notes.find((note) => note.id === id);

	if (note === null || note === undefined) return <Navigate to="/" replace />;

	return <Outlet context={note} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
	return useOutletContext<Note>();
}
