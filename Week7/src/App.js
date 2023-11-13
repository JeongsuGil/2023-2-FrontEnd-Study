import "./App.css";
import ToDoEditor from "./components/ToDoEditor";
import AllList from "./components/AllList";
import { GlobalStyle } from "./components/style";
import { useRef, useState } from "react";
import styled from "styled-components";

const App = () => {
  const [list, setList] = useState([]);
  const listId = useRef(0);

  const onCreate = (text) => {
    const newItem = {
      id: listId.current,
      text,
      isDone: false,
    };
    listId.current += 1;
    setList([newItem, ...list]);
  };

  const onDelete = (targetId) => {
    const newList = list.filter((it) => it.id !== targetId);
    setList(newList);
  };

  const onToggle = (targetId) => {
    const restItem = list.filter((it) => it.id !== targetId);
    const targetItem = list.find((it) => it.id === targetId);
    const toggledItem = { ...targetItem, isDone: !targetItem.isDone };
    setList([toggledItem, ...restItem]);
    console.log(restItem);
    console.log(targetItem);
  };

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
