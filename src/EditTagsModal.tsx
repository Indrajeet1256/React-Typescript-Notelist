import { Modal, Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Tag } from "./App";

type EditTagsModalProps = {
	availableTags: Tag[];
	handleClose: () => void;
	show: boolean;
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

export function EditTagsModal({
	availableTags,
	handleClose,
	show,
	onUpdateTag,
	onDeleteTag,
}: EditTagsModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										type="text"
										value={tag.label}
										onChange={(e) => onUpdateTag(tag.id, e.target.value)}
									/>
								</Col>
								<Col xs="auto">
									<Button
										variant="outline-danger"
										type="button"
										onClick={() => onDeleteTag(tag.id)}>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
