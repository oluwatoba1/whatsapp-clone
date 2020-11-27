import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([]);
	const { contacts } = useContacts();
	const { createConversation } = useConversations();

	function handleSubmit(e) {
		e.preventDefault();

		createConversation(selectedContactIds);

		closeModal();
	}

	function handleCheckboxChange(contactId) {
		setSelectedContactIds(prevSelectedContactIds => {
			if (prevSelectedContactIds.includes(contactId)) {
				return prevSelectedContactIds.filter(id => id !== contactId);
			} else {
				return [...prevSelectedContactIds, contactId];
			}
		});
	}

	return (
		<>
			<Modal.Header closeButton>Create Conversation</Modal.Header>
			<Modal.Body>
				<Form>
					{contacts.map(contact => (
						<Form.Group key={contact.id} controlId={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContactIds.includes(contact.id)}
								label={contact.name}
								onChange={() => handleCheckboxChange(contact.id)}
							/>
						</Form.Group>
					))}
				</Form>

				<Button onClick={handleSubmit} type="submit">
					Create
				</Button>
			</Modal.Body>
		</>
	);
}
