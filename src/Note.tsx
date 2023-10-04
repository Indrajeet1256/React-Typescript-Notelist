import { useNote } from "./NoteLayout";
import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
	onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<>
			<Row className="align-items-center mb-4 flex-wrap">
				<Col>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack gap={1} direction="horizontal">
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>

				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to={`/${note.id}/edit`}>
							<Button variant="primary" type="button">
								Edit
							</Button>
						</Link>
						<Button
							variant="outline-danger"
							type="button"
							onClick={() => {
								onDelete(note.id);
								navigate("/");
							}}>
							Delete
						</Button>
						<Link to="/">
							<Button variant="outline-secondary" type="button">
								Back
							</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	);
}
