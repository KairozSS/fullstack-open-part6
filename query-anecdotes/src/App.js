import { useQuery } from 'react-query';
import { getAnecdotes } from './services/anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
	const result = useQuery('anecdotes', getAnecdotes);

	const handleVote = () => {
		console.log('vote');
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
