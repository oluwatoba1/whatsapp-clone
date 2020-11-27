import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations();

	return (
		<ListGroup variant="flush">
			{conversations &&
				conversations.map((conversation, index) => (
					<ListGroup.Item
						key={index}
						onClick={() => selectConversationIndex(index)}
						active={conversation.selected}>
						{conversation.recipients.map(r => r.name).join(', ')}
					</ListGroup.Item>
				))}
		</ListGroup>
	);
}
