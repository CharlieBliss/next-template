const numberFormatter = (int, suffix) => {
	const rounded = String(Math.floor(int * 10) / 10)
	return rounded.replace(/\.0$/, '') + suffix
}

export const suffixedNumberFormatter = (num) => {
	if (!num && num !== 0) {
		return num
	}
	const int = parseInt(num, 10)
	const t = 1000000000000
	const b = 1000000000
	const m = 1000000
	const k = 1000
	if (int >= t) {
		return numberFormatter(int / t, 't')
	}
	if (int >= b) {
		return numberFormatter(int / b, 'b')
	}
	if (int >= m) {
		return numberFormatter(int / m, 'm')
	}
	if (int >= k) {
		return numberFormatter(int / k, 'k')
	}
	return num.toString()
}

export default suffixedNumberFormatter
