import React, { useRef, useReducer, useCallback } from 'react';
import './App.css';

import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList'
export const TodoContext = React.createContext();

const mockTodo =[
  {
    id:0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id:1,
    isDone: false,
    content: "빨래 넣기",
    createDate: new Date().getTime(),
  },
  {
    id:2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  },
]
function reducer(state, action){
  switch(action.type) {
    case "CREATE" : {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) => 
        it.id ===action.targetId
        ? {
          ...it,
          isDone: !it.isDone,
        }
        : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}


function App() {
  const idRef = useRef(3);
  const [todo,dispatch] = useReducer(reducer,mockTodo);

  const onCreate = (content) =>{
    dispatch(
      {
        type: "CREATE",
        newItem: {
          id: idRef.current,
          content,
          isDone: false,
          createDate: new Date().getTime(),
        },
      }
    );
    idRef.current += 1;
  };
  const onUpdate = useCallback((targetId) => {
    dispatch(
      {
        type: "UPDATE",
        targetId,
      });
  },[]);
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  },[]);

  return (
    <div className='App'>
    <Header/>
    <TodoContext.Provider value={{todo, onCreate, onUpdate, onDelete}}>
      <TodoEditor/>
      <TodoList/>
    </TodoContext.Provider>
    </div>
  );
}

export default App;