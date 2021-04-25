import { useReducer } from 'react'
import reducer from './app/reducer'
import Keyboard from './Keyboard'
import keys from './app/keys'

export default function Calc() {
	const [state, dispatch] = useReducer(reducer, { value: '', expression: [] })
	const output = state.expression.join(' ')

	const handleClick = ({ target }) => {
		const $button = target.closest('li')
		if (!$button) return
		const { number, code } = $button.dataset
		if (number) return dispatch({ type: 'number', payload: number })
		dispatch({ type: code })
	}

	return (
		<div className='calculator'>
			<div className='calculator__head'>
				<h1>Калькулятор</h1>
				<button className='calculator__head_close'>x</button>
			</div>
			<div className='calculator__entry-field'>
				<p className='calculator__entry-field_output'>{output}</p>
				<p className='calculator__entry-field_input'>{state.value || '0'}</p>
			</div>
			<Keyboard handleClick={handleClick} keys={keys} />
		</div>
	)
}
