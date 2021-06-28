import React from 'react'
import { render,cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './Header'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('Header component', () => {
  let initialState;
  let mockStore;
  let store;
  beforeEach(() => {
    initialState = { output: 10 }
    jest.resetAllMocks();
    mockStore = configureStore();
    store = mockStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it('loads and displays Header name', async () => {
    const initialState = { output: 10 }
    const mockStore = configureStore()
    const store = mockStore(initialState)
    const { getByText } = render(<Provider store={store}><Header /></Provider>)
    expect(getByText("Books Marketplace")).toBeInTheDocument()
  })

  it('check the value in the header', async () => {
    const userInfo = {
      userInfo: {
        firstName: 'First Name',
        lastName: 'Last Name'
      }
    }

    const { getByText } = render(<Provider store={store}><Header userInfo={userInfo} /></Provider>)

    expect(
      getByText((content) => {
        return (
          content.includes('Hello')
        )
      })
    )
  })
})
