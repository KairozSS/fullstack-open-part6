import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './services/anecdotes';
import { usePutNotification } from './NotificationContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
	const putNotification = usePutNotification();
	const queryClient = useQueryClient();
	const result = useQuery('anecdotes', getAnecdotes);
	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes');
			queryClient.setQueryData('anecdotes', anecdotes.map(
				a => a.id !== updatedAnecdote.id ? a : updatedAnecdote
			));
		}
	});

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1
		});
		putNotification(`anecdote '${anecdote.content}' voted`, 5);
	};

	if (result.isLoading) {
		return <div>Loading data...</div>;
	}

	if (result.isError) {
		return <div>anecdote service not available due to problems in server</div>;
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
