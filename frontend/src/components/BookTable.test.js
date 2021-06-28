import React from 'react'
import { render,cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BookForm from './BookForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('Book Form component', () => {

  let initialState;
  let mockStore;
  let store;
    let setCurrentId;
    let handleClose;
    let open;
    let currentId;
    beforeEach(() => {
      initialState = { output: 10 }
      jest.resetAllMocks();
      mockStore = configureStore();
      store = mockStore(initialState);
      setCurrentId = jest.fn();
      handleClose = jest.fn();
      open = true;
      currentId = "";
    });
    
    afterEach(() => {
      cleanup();
    });
    

  it('check table name', async () => {
  
    
    const { getByText } = render(<Provider store={store}><BookForm open={open} currentId={currentId} setCurrentId={setCurrentId} handleClose={handleClose} /></Provider>)
    expect(
      getByText((content) => {
        return (
          content.includes('Book Name')
        )
      })
    )
    expect(
      getByText((content) => {
        return (
          content.includes('Author')
          
        )
      })
    )
    expect(
      getByText((content) => {
        return (

          content.includes('Publication')
        )
      })
    )
    expect(
      getByText((content) => {
        return (
          content.includes('Price')
        )
      })
    )
  })
})
