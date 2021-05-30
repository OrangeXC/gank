/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import ListSpin from '../../components/ListSpin'

describe('ListSpin', () => {
  it('child', () => {
    const { container } = render(<ListSpin />)

    expect(container.children[0]).toHaveStyle({
      textAlign: 'center',
      marginBottom: '20px',
      padding: '30px 50px'
    })
  })
})
