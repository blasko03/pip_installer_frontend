import { ascendingOrder } from './ascending_order'

test('testing order function', async () => {
  expect(ascendingOrder('a', 'b')).toBe(-1)
  expect(ascendingOrder('b', 'a')).toBe(1)
  expect(ascendingOrder('a', 'a')).toBe(0)
})
