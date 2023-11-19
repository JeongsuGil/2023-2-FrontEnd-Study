import ToDoEditor from "./components/ToDoEditor";
import AllList from "./components/AllList";
import { GlobalStyle } from "./components/style";
import { useEffect, useRef, useReducer, useCallback } from "react";
import styled from "styled-components";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      const newItem = {
        ...action.data,
        isDone: false,
      };
      newState = [newItem, ...state];
      break;
    }

    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "TOGGLE": {
      const restItem = state.filter((it) => it.id !== action.targetId);
      const targetItem = state.find((it) => it.id === action.targetId);
      const toggledItem = { ...targetItem, isDone: !targetItem.isDone };
      newState = [toggledItem, ...restItem];
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};
const App = () => {
  const [list, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("todo");
    if (localData) {
      const todolist = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (todolist.length >= 1) {
        listId.current = parseInt(todolist[0].id) + 1;
        dispatch({ type: "INIT", data: todolist });
      }
    }
  });
  const listId = useRef(0);

  const onCreate = useCallback((text) => {
    dispatch({ type: "CREATE", data: { text, id: listId.current } });
    listId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onToggle = useCallback((targetId) => {
    dispatch({ type: "TOGGLE", targetId });
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <ToDoEditor onCreate={onCreate} />
      <AllList allList={list} onDelete={onDelete} onToggle={onToggle} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 30rem;
  height: 50rem;
  margin: 0 auto;
`;

export default App;
