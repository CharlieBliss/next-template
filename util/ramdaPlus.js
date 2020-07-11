import {
	curry, __, compose, isEmpty, without, addIndex, map, reduce, forEach,
	always, has, curryN, filter, fromPairs, adjust, toPairs, sort,
} from 'ramda'

export const shuffle = arr => sort(() => (0.5 - Math.random()), arr)

export const ternary = curry((bool, truth, faulty) => (bool ? truth : faulty))

export const orNull = ternary(__, __, null)

export const noop = always(undefined)

export const indexedMap = addIndex(map)

export const indexedReduce = addIndex(reduce)

export const indexedFilter = addIndex(filter)

export const indexedForEach = addIndex(forEach)

export const isSubset = compose(isEmpty, without)

export const chunkFill = (chunkNumber, chunkSize, arr) => {
	const len = Number(chunkNumber)
	let idx = 0
	let idy = 0
	const result = []
	while (idx < len) {
		if (idy >= arr.length) {
			break
		}
		if (idx === len - 1) {
			result.push(arr.slice(idy))
		} else {
			result.push(arr.slice(idy, idy += chunkSize))
		}
		idx += 1
	}
	return result
}

export const memoizeWithPass = curryN(2, (mFn, fn) => {
	const cache = {}
	return (...args) => {
		const [key, pass] = mFn(...args)
		if (!has(key, cache)) {
			cache[key] = fn(...[...args, pass])
		}
		return cache[key]
	}
})

let idMaker = 0
export const uniqueId = () => {
	idMaker += 1
	return idMaker
}


export const mapKeys = curry(
	(fn, obj) => fromPairs(map(adjust(0, fn), toPairs(obj))),
)
