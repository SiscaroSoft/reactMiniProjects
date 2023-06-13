import { useState } from 'react'
import { Task } from '../Task'

import './TaskContainer.css'

export const TaskContainer = ({ tasks, setTasks, dark }) => {
	const [todo, setTodo] = useState({
		completed: false,
		title: '',
		description: '',
	})

	const handleSubmit = e => {
		e.preventDefault()

		if (todo.title) {
			let newTask = { ...todo }
			let newTasks = [...tasks, newTask]
			setTasks(newTasks)
			setTodo({ title: '', description: '', completed: false })
			localStorage.setItem('myTodoTasks', JSON.stringify(newTasks))
		}
	}

	const handleChange = e => {
		setTodo({ ...todo, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className='tasks-container'>
				<form
					action='handleSubmit'
					onSubmit={handleSubmit}
					className='input-form'
				>
					<input
						type='text'
						name='title'
						placeholder='Enter Title'
						className='task-input task-input-title'
						onChange={handleChange}
						value={todo.title}
					/>

					<input
						type='text'
						name='description'
						placeholder='Enter Description'
						className='task-input task-input-desc'
						onChange={handleChange}
						value={todo.description}
					/>

					<button
						type='submit'
						className={`task-btn ${
							dark ? 'darkMode-add-btn' : 'lightMode-add-btn'
						} add-btn`}
					>
						Add
					</button>
				</form>

				<div
					className={`${
						dark
							? 'darkMode-box-tasks-container'
							: 'lightMode-box-tasks-container'
					} box-tasks-container`}
				>
					{tasks?.map((task, i) => {
						return (
							<Task
								task={task}
								tasks={tasks}
								setTasks={setTasks}
								index={i}
								dark={dark}
								key={i}
							/>
						)
					})}
				</div>
			</div>
		</>
	)
}
