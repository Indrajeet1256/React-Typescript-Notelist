import { useState, useMemo } from "react";
import { Row, Col, Button, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { NoteCard } from "./NoteCard";
import { SimplifiedNote } from "./NoteCard";
import { EditTagsModal } from "./EditTagsModal";

type NoteListProps = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

export function NoteList({
	availableTags,
	notes,
	onUpdateTag,
	onDeleteTag,
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState<string>("");
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
		useState<boolean>(false);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				selectedTags.every((tag) => {
					return note.tags.some((noteTag) => noteTag.id === tag.id);
				})
			);
		});
	}, [title, selectedTags, notes]);

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to="/new">
							<Button variant="primary" type="button">
								Create
							</Button>
						</Link>
						<Button
							onClick={() => setEditTagsModalIsOpen(true)}
							variant="outline-secondary"
							type="button">
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								isMulti
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				show={editTagsModalIsOpen}
				handleClose={() => setEditTagsModalIsOpen(false)}
				availableTags={availableTags}
				onUpdateTag={onUpdateTag}
				onDeleteTag={onDeleteTag}
			/>
		</>
	);
}
