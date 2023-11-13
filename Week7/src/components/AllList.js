import styled from "styled-components";
const AllList = ({ onToggle, onDelete, allList }) => {
  return (
    <div className="AllList">
      <List>
        <H2>✔️ Todo</H2>
        <ul>
          {allList
            .filter((it) => it.isDone === false)
            .map((it) => (
              <Li key={it.id}>
                <span
                  onClick={() => {
                    onToggle(it.id);
                  }}
                >
                  {it.text}
                </span>
                <Button
                  onClick={() => {
                    onDelete(it.id);
                  }}
                >
                  ❌
                </Button>
              </Li>
            ))}
        </ul>
      </List>
      <List>
        <H2>✔️ Done</H2>
        <ul>
          {allList
            .filter((it) => it.isDone === true)
            .map((it) => (
              <Li>
                <span
                  onClick={() => {
                    onToggle(it.id);
                  }}
                >
                  {it.text}
                </span>
                <Button
                  onClick={() => {
                    onDelete(it.id);
                  }}
                >
                  ❌
                </Button>
              </Li>
            ))}
        </ul>
      </List>
    </div>
  );
};

AllList.defaultProps = {
  allList: [],
};

const H2 = styled.h2`
  padding-left: 20px;
  margin-bottom: 0;
`;
const Button = styled.button`
  border: 0;
  background: none;
  font-size: 15px;
  cursor: pointer;
`;
const Li = styled.li`
  list-style-type: none;
  cursor: pointer;
  font-size: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
`;
const List = styled.div`
  border-top: 1px solid rgb(200, 200, 200);
  height: 20rem;
  overflow: auto;
`;

export default AllList;
