import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getRandomId from './utils/getRandomId';

const App = () => {
	const anecdotes = useSelector(state => state);
	const dispatch = useDispatch();
	const [newAnecdote, setNewAnecdote] = useState('');

	useEffect(() => {
		sortByVotes();
	}, []);

	const vote = (id) => {
		dispatch({ type: 'VOTE', payload: { id } });
		sortByVotes();
	};

	const sortByVotes = () => {
		dispatch({ type: 'SORT_ANECDOTES_BY_VOTES' });
	};

	const addAnecdote = (e) => {
		e.preventDefault();
		dispatch({
			type: 'NEW_ANECDOTE',
			payload: {
				content: newAnecdote,
				id: getRandomId(),
				votes: 0
			}
		});
		setNewAnecdote('');
		sortByVotes();
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input
						value={newAnecdote}
						onChange={(e) => setNewAnecdote(e.target.value)}
					/>
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default App;