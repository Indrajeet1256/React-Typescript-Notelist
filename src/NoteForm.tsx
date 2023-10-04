import { FormEvent, useRef, useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
	title = "",
	markdown = "",
	tags = [],
	onSubmit,
	onAddTag,
	availableTags,
}: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});
		navigate("..");
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								defaultValue={title}
								type="text"
								required
								ref={titleRef}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags((prevTags) => [...prevTags, newTag]);
								}}
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						defaultValue={markdown}
						ref={markdownRef}
						as="textarea"
						required
						rows={15}
					/>
				</Form.Group>
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button variant="primary" type="submit">
						Save
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-primary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}
