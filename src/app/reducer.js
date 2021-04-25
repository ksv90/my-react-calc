import { isOperator, isBrackets, lastSymbol, calculate } from './utils.js'

export default function reducer(state, { type, payload }) {
	const { value, expression } = state
	switch (type) {
		case 'Escape':
		case 'Delete':
			return setState({ value: '', expression: [] })
		case 'number':
			const v = value === '0' ? '' : value
			return setState({
				value: value.length < 10 ? v + payload : value,
			})
		case 'Backspace':
			if (value.length === 2 && value.includes('-'))
				return setState({ value: '' })
			if (value.length === 1) return setState({ value: '' })
			if (value.length > 1) return setState({ value: value.slice(0, -1) })
		case '+/-':
			return setState({ value: '' + parseFloat(value || 0) * -1 })
		case ',':
			if (value.includes('.')) return state
			return setState({ value: +value + '.' })
		case 'sqr':
			if (
				!expression.length ||
				isOperator(expression) ||
				lastSymbol(expression) === '('
			)
				return setExpression(`sqr(${+value})`)
		case 'sqrt':
			if (
				!expression.length ||
				isOperator(expression) ||
				lastSymbol(expression) === '('
			)
				return setExpression(`sqrt(${+value})`)
		case '%':
			if (
				!expression.length ||
				isOperator(expression) ||
				lastSymbol(expression) === '('
			)
				return setExpression(`${+value}%`)
			return state
		case '(':
			if (
				!expression.length ||
				isOperator(expression) ||
				lastSymbol(expression) === '('
			)
				return setState({ expression: [...expression, '('] })
			return state

		case ')':
			if (!isBrackets(expression)) return state
			if (isOperator(expression) || lastSymbol(expression) === '(' || value)
				return setExpression(`${+value}`, ')')
			return setExpression(')')

		case '/':
		case '*':
		case '-':
		case '+':
			const isOp = isOperator(expression)
			if (value === '' && !expression.length) return setExpression('', type)
			else if (lastSymbol(expression) === '(')
				return setExpression(`${+value}`, type)
			else if (!expression.length) return setExpression(value, type)
			else if (value !== '' && isOp) return setExpression(value, type)
			else if (value === '' && isOp) {
				expression.splice(-1, 1)
				return setState({ expression: [...expression, type] })
			} else return setExpression(type)

		case 'Enter':
		case '=':
			if (!expression.length) return state
			let brackets = isBrackets(expression)
			if (isOperator(expression)) expression.push(`${+value}`)
			if (brackets) while (brackets--) expression.push(')')
			return setState({
				value: '' + calculate(expression),
				expression: [...expression],
			})

		default:
			return state
	}

	function setState(newState) {
		return { ...state, ...newState }
	}

	function setExpression(...newExpression) {
		return {
			...state,
			value: '',
			expression: [...expression, ...newExpression],
		}
	}
}
