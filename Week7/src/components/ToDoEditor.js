import { useState } from "react";
import styled from "styled-components";

const ToDoEditor = ({ onCreate }) => {
  const [text, setText] = useState("");

  const addToDo = () => {
    if (text.length < 1) {
      alert("⚠ Empty ⚠");
      return;
    }
    onCreate(text);
    setText("");
  };

  return (
    <div className="ToDoEditor">
      <H1>TO DO LIST</H1>
      <InputContainer>
          <Input
            placeholder=" ✏️ Enter what you have to do."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addToDo();
              }
            }}
          />

          <Button className="submit-btn" onClick={addToDo}>
            +
          </Button>
      </InputContainer>
    </div>
  );
};

const H1 = styled.h1`
padding-left: 30px;
padding-top: 20px;
margin-bottom: 0;
`

const Button = styled.button`
border: 0;
background: none;
font-size: 20px;
cursor: pointer;
`

const Input = styled.input`
width: 384px;
height: 30px;
font-size: 17px;
border: 0;
border-radius: 15px;
outline: none;
background-color: rgb(241, 241, 241);
`

const InputContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-top: 1rem;
padding-bottom: 1rem;
`

export default ToDoEditor;
