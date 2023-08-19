import { getQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

describe('addQueryParams', () => {
  test('with one params', () => {
    const params = getQueryParams({
      one: 'params',
    })
    expect(params).toEqual('?one=params')
  })
  test('with 2 params', () => {
    const params = getQueryParams({
      one: 'params',
      two: '2',
    })
    expect(params).toEqual('?one=params&two=2')
  })
  test('with undefined params', () => {
    const params = getQueryParams({
      one: 'params',
      two: undefined,
    })
    expect(params).toEqual('?one=params')
  })
})
