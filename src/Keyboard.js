export default function Keyboard({ keys, handleClick }) {
	return (
		<ul className='calculator__keyboard' onClick={handleClick}>
			{keys.map(element)}
			<li data-code='=' className='calculator__keyboard_other2'>
				<span>=</span>
			</li>
		</ul>
	)
}

function element([operator, code, icon], i) {
	return (
		<li
			key={i}
			data-code={operator ? `${code}` : ''}
			data-number={operator ? '' : `${code}`}
			className={
				operator ? 'calculator__keyboard_other' : 'calculator__keyboard_number'
			}
		>
			<span>{icon || code}</span>
		</li>
	)
}
