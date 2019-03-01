import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import SearchResults from 'components/SearchResults'

describe('Components::SearchResults', () => {
  let props
  beforeEach(() => {
    props = {
      repos: Immutable.fromJS({
        lang: 'lang',
        totalCount: 2,
        items: [{
          id: 1
        }, {
          id: 2
        }]
      })
    }
  })

  function renderDoc () {
    return shallow(<SearchResults {...props} />)
  }

  it('renders all items', () => {
    const doc = renderDoc()
    const node = doc.find('li')
    expect(node).toHaveLength(props.repos.get('items').size)
  })
})
