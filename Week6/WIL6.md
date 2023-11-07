# Week6

---

# 5. React 기본 : 간단한 일기장 프로젝트

## 프로젝트 소개

1. 사용자 입력 및 배열 리스트 처리하기
2. React Lifecycle과 API
3. React App 프로처럼 성능 최적화하기 with 도구 사용
4. React 컴포넌트 트리에 전역 데이터 공급하기

## React에서 사용자 입력 처리하기

### 목표 : 다양한 사용자 입력 처리하기

1. 한 줄 입력 처리하기
2. 여러 줄 입력 처리하기
3. 선택 박스 입력 처리하기
4. 사용자 입력 데이터 핸들링하기

### 사전 작업

`npx crate-react-app 이름` 을 통해 React 파일 생성

필요 없는 파일( App.test.js, logo.ssg, reportWebVitals.js, setupTests.js를 삭제

App.css, App.js, index.css, index.js에서 필요 없는 코드를 삭제

### DiaryEditor 컴포넌트

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/3bf9b346-0dd6-44e6-b097-e188b5e44b69/Untitled.png)

**작성자, 일기 본문 초기형**

```jsx
import { useState } from "react";

const DiaryEditor = () => {

	// author : 작성자, input에 들어갈 내용을 관리하는 state
	// setAutor : 상태 author의 상태 변화를 주도하는 상태 변화 함수
	// 실시간으로 입력값이 바뀔 때마다 상태 변화 함수를 이용해 상태에 입력값을 저장
	const [author, setAuthor] = useState(""); // 초기값은 아무것도 입력하지 않은 상태
 
	// content : 일기 본문, textarea에 들어갈 내용을 관리하는 state
	// setContent : 상태 content의 상태 변화를 주도하는 상태 변화 함수
	// 실시간으로 입력값이 바뀔 때마다 상태 변화 함수를 이용해 상태에 입력값을 저장
	const [content, setContent] = useState("");
	return (
	  <div className="DiaryEditor"> 
	    <h2>오늘의 일기</h2>

	    {/* 1. 한 줄 입력 처리하기 */}
	    {/* 입력값이 바뀔 때마다 Event 객체 e를 함수에 전달 */}
	    {/* e.target.value에 입력값이 저장됨 -> author를 e.target.value로 업데이트 */}
	    <div>
	      <input value={author} 
	      onChange={(e) => {
	        setAuthor(e.target.value);
	       }} 
	      />
	    </div>

	    {/* 2. 여러 줄 입력 처리하기 */}
	    {/* 입력값이 바뀔 때마다 Event 객체 e를 함수에 전달 */}
	    {/* e.target.value에 입력값이 저장됨 -> author를 e.target.value로 업데이트 */}
	    <div>
	      <textarea value={content} 
	      onChange={(e) => {
	        setContent(e.target.value);
	       }}
	      />
	    </div>
	  </div>
	);
};

export default DiaryEditor;
```

⇒ `input`과 `textarea`의 코드에 중복이 많음 : 아래와 같이 대체

**state 합치기**

```jsx
import { useState } from "react";

const DiaryEditor = () => {
  
  const [state, setState] = useState({
    author:"",
    content:"",
  });

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input value={state.author} 
        onChange={(e) => {
          setState({
            author: e.target.value, {/* state의 개수가 많아지면 하나씩 설정하기 어려움 : ...state로 대체, 단 순서가 바뀌면 안 됨 */}
            content: state.content,
          });
        }} 
        />
      </div>

      <div>
        <textarea value={state.content} 
        onChange={(e) => {
          setState({
            author: state.author, {/* state의 개수가 많아지면 하나씩 설정하기 어려움 : ...state로 대체, 단 순서가 바뀌면 안 됨 */}
            content: e.target.value,
          });
        }}
        />
      </div>
    </div>
  );
};

export default DiaryEditor;
```

**Eventhandler 합치기**

```jsx
import { useState } from "react";

const DiaryEditor = () => {
  
  const [state, setState] = useState({
    author:"",
    content:"",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input 
        name="author"
        value={state.author} 
        onChange={handleChangeState} 
        />
      </div>

      <div>
        <textarea 
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>
    </div>
  );
};

export default DiaryEditor;
```

**감정 점수 추가**

```jsx
import { useState } from "react";

const DiaryEditor = () => {
  
  const [state, setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input 
        name="author"
        value={state.author} 
        onChange={handleChangeState} 
        />
      </div>

      <div>
        <textarea 
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>

			{/* 3. 선택 박스 입력 처리하기 ***/}**
      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

**저장 버튼 추가**

```jsx
import { useState } from "react";

const DiaryEditor = () => {
  
  const [state, setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 완료");
  }

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input 
        name="author"
        value={state.author} 
        onChange={handleChangeState} 
        />
      </div>

      <div>
        <textarea 
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>

      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

**css 적용**

```jsx
.DiaryEditor {
    border: 1px solid gray;
    text-align: center;
    padding: 20px;
}

.DiaryEditor input,
textarea {
    margin-bottom: 20px;
    width: 500px;
    padding: 10px;
}

.DiaryEditor textarea {
    height: 15px;
}

.DiaryEditor select {
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .DiaryEditor button {
    width: 500px;
    padding: 10px;
    cursor: pointer;
  }
```

## React에서 DOM 조작하기 - useRef

### 목표 : React에서 DOM 조작하기

- 일기 저장 버튼을 클릭했을 때
- 작성자와 일기가 정상적으로 입력되었는지 확인하고
- 아니라면 focus하기

### DiaryEditor 컴포넌트

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/362f1cd5-11cd-45d0-a06b-ea14c47f6462/Untitled.png)

**handleSubmit 함수를 수정**

```jsx
import { useState } from "react";

const DiaryEditor = () => {
  
  const [state, setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      alert("작성자는 최소 1글자 이상 입력해주세요.")
      return;
    }

    if (state.content.length < 5) {
      alert("일기는 최소 5글자 이상 입력해주세요.")
      return;
    }
    alert("저장 성공");
  }

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input 
        name="author"
        value={state.author} 
        onChange={handleChangeState} 
        />
      </div>

      <div>
        <textarea 
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>

      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

⇒ 갑자기 `alert`을 띄우는건 좋은 UI 경험이 아님

`**alert` 대신 `focus` : useRef 이용**

*`focus` : 강조하고자 하는 곳에 테두리를 두껍게 함

```jsx
import { useRef, useState } from "react";

const DiaryEditor = () => {
  
  const authorInput = useRef(); // useRef 함수를 호출해서 어떤 반환값을 담아줌 : React.MutableObject
  const contentInput = useRef(); // React.MutableObject : HTML, DOM 요소를 접근할 수 있는 기능

  const [state, setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); // useRef 함수로 생성한 레퍼런스 객체는 현재 가리키는 값을 current라는 프로퍼티로 불러와서 사용
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    alert("저장 성공");
  }

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>

      <div>
        <input
        ref={authorInput}
        name="author"
        value={state.author} 
        onChange={handleChangeState} 
        />
      </div>

      <div>
        <textarea
        ref={contentInput}
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>

      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

## React에서 배열 사용하기 1 : 리스트 렌더링 (조회)

### 목표 : React에서 리스트 렌더링 하기

- 배열을 이용하여
- React에서 List를 렌더링 해보고
- 개별적인 컴포넌트로 만들어보기

### DiaryList 컴포넌트

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/5d5dee2b-2878-48c0-acea-77f07f0b834d/Untitled.png)

**App.js에 DiaryList 추가**

```jsx
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// 임시 배열을 만들어서 DiaryList 컴포넌트에 Props로 데이터를 전달해서 그 데이터를 렌더링
const dummyList = [
  {
    id:1,
    author: "홍길동",
    content: "하이 1",
    emotion: 5,
    created_date: new Date().getTime() // 현재 시간을 ms로
  },
  {
    id:2,
    author: "이순신",
    content: "하이 2",
    emotion: 2,
    created_date: new Date().getTime() // 현재 시간을 ms로
  },
  {
    id:3,
    author: "김연아",
    content: "하이 3",
    emotion: 1,
    created_date: new Date().getTime() // 현재 시간을 ms로
  },
]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/> {/* prop로 dummyList 전달*/}
    </div>
  );
}

export default App;
```

**DiaryList 컴포넌트 새로 생성**

```jsx
const DiaryList = ({ diaryList }) => {
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div> 
				{/* 고유한 id를 key 설정, 
        만약 고유한 값이 없는 경우 diaryList.map((it, idx), key=idx로 대체 
        단, idx의 경우가 순서가 바뀌거나 새로운 것이 삽입되면 달라질 수 있음 */}
            {diaryList.map((it) => (
                <div key={it.id}>
                    <div>작성자 : {it.author}</div>
                    <div>일기 : {it.content}</div>
                    <div>감정 : {it.emotion}</div>
                    <div>작성시간(ms) : {it.created_date}</div>
                </div>
            ))}
        </div>
    </div>
    );
};

// props로 undefined이 전달되면 error가 발생하기 때문에 빈 배열을 default로 설정
DiaryList.defaultProps = {
    diaryList:[],
};
export default DiaryList;
```

⇒ diaryList의 수정, 삭제를 위해 렌더링할 아이템을 별도의 컴포넌트로 관리해야 함

### DiaryItem 컴포넌트

**DiaryList 컴포넌트 수정**

```jsx
import DiaryItem from "./DiaryItem";
const DiaryList = ({ diaryList }) => {
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    </div>
    );
};

DiaryList.defaultProps = {
    diaryList:[],
};
export default DiaryList;
```

**DiaryItem 컴포넌트 새로 생성**

```jsx
const DiaryItem = ({ id, author, content, emotion, created_date }) => {
    return (
      <div className="DiaryItem">
        <div className="info">
          <span className="author_info">
            | 작성자 : {author} | 감정점수 : {emotion} |
          </span>
          <br /> {/* 줄바꿈 */}
          <span className="date">{new Date(created_date).toLocaleString()}</span> {/* 알아보기 쉽게 바꿔줌*/}
        </div>
        <div className="content">{content}</div>
      </div>
    );
  };
  
  export default DiaryItem;
```

**css 적용**

```jsx
/* editor */

.DiaryEditor {
  border: 1px solid gray;
  text-align: center;
  padding: 20px;
}

.DiaryEditor input,
textarea {
  margin-bottom: 20px;
  width: 500px;
}

.DiaryEditor input {
  padding: 10px;
}
.DiaryEditor textarea {
  padding: 10px;
  height: 150px;
}

.DiaryEditor select {
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
}

.DiaryEditor button {
  width: 500px;
  padding: 10px;
  cursor: pointer;
}

/* List  */

.DiaryList {
  border: 1px solid gray;
  padding: 20px;
  margin-top: 20px;
}

.DiaryList h2 {
  text-align: center;
}

/* ITEM */

.DiaryItem {
  background-color: rgb(240, 240, 240);
  margin-bottom: 10px;
  padding: 20px;
}

.DiaryItem span {
  margin-right: 10px;
}

.DiaryItem .info {
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.DiaryItem .date {
  color: gray;
}

.DiaryItem .content {
  margin-bottom: 30px;
  margin-top: 30px;
  font-weight: bold;
}

.DiaryItem textarea {
  padding: 10px;
}
```

## React에서 배열 사용하기 2 : 데이터 추가하기

### 목표 : React에서 리스트 데이터 추가하기

- 배열을 이용한 React의 List에
- 아이템을 동적으로 추가해보기
- With React처럼 생각하기

### 컴포넌트, 데이터 구조

같은 level 안에서는 데이터 전달 불가능

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/e1702fae-92a4-4d1d-a46a-b162eb48677b/Untitled.png)

React는 단방향으로만 데이터가 전달 : 위 → 아래, 단방향 데이터 흐름

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/780a621b-5600-4ace-a7a8-6e2b36e302d6/Untitled.png)

React의 상태인 state를 공통 부모 요소로 끌어올려 해결 : state 끌어올리기 

- App → DiaryList : data state의 값을 전달
- App → DiaryEditor : data state의 상태 변화 함수 setData를 props로 전달

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/69386f83-2fc8-465f-a1c4-adc214bfe0ff/Untitled.png)

이벤트는 위쪽(역방향 이벤트 흐름), 데이터는 아래쪽(단방향 데이터 흐름)으로 흐름

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/17e5b11f-bc6f-4a38-bd5f-b13fdc72459d/Untitled.png)

### 임시 배열 대신 실제 입력 데이터를 리스트에 추가

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/c121dcf8-195f-4dd2-a3c9-b3b8665a858b/Untitled.png)

**App 컴포넌트 변경**

```jsx
import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  
  const [data, setData] = useState([]); // 일기 데이터 배열을 저장 : DiaryEditor 컴포넌트와  DiaryList가 함께 사용할 일기 데이터

  const dataId = useRef(0); // id를 설정하기 위해 사용

  // author, content, emotion을 onCreate가 받아서 data에 업데이트 시키는 로직을 setData를 이용해서 onCreate 안에 작성
  const onCreate = (author, content, emotion) => { // 일기 데이터를 추가할 수 있는 함수
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        create_date,
        id: dataId.current
      }
      dataId.current += 1;
      setData([newItem, ... data]);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data}/> {/* data가 바뀌면 새로 렌더링 */}
    </div>
  );
}

export default App;
```

**DiaryEditor 컴포넌트 변경**

```jsx
import { useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {
  
  const authorInput = useRef(); // useRef 함수를 호출해서 어떤 반환값을 담아줌 : React.MutableObject
  const contentInput = useRef(); // React.MutableObject : HTML, DOM 요소를 접근할 수 있는 기능

  const [state, setState] = useState({
    author:"",
    content:"",
    emotion:1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); // useRef 함수로 생성한 레퍼런스 객체는 현재 가리키는 값을 current라는 프로퍼티로 불러와서 사용
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion); // 일기 저장을 누르면 onCreate를 호출
    alert("저장 성공");
    setState({ // DiaryEditor 컴포넌트의 state를 모두 기본값으로 초기화
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor"> 
      <h2>오늘의 일기</h2>
      <div>
        <input
        ref={authorInput}
        name="author"
        value={state.author} 
        onChange={handleChangeState}
        type="text" 
        />
      </div>

      <div>
        <textarea
        ref={contentInput}
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>

      <div>
        <select
        name="emotion"
        value={state.emotion}
        onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

## React에서 배열 사용하기 3 : 데이터 삭제하기

### 각 아이템마다 삭제 버튼을 통해 일기를 삭제할 수 있음

**App 컴포넌트 변경**

```jsx
import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  
  const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        create_date,
        id: dataId.current
      }
      dataId.current += 1;
      setData([newItem, ... data]);
  };

  const onDelete = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    );
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
			{/* DiaryItem이 onDelete를 호출할 수 있어야 함 : App -> DiaryList -> DiaryItem으로 내려줌 */}
      <DiaryList diaryList={data} onDelete={onDelete} /> 
    </div>
  );
}

export default App;
```

**DiaryList 컴포넌트 변경**

```jsx
import DiaryItem from "./DiaryItem";
const DiaryList = ({ onDelete, diaryList }) => {
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it} onDelete={onDelete} />
            ))}
        </div>
    </div>
    );
};

DiaryList.defaultProps = {
    diaryList:[],
};
export default DiaryList;
```

**DiaryItem 컴포넌트 변경**

```jsx
const DiaryItem = ({ onDelete, id, author, content, emotion, created_date }) => {
    return (
      <div className="DiaryItem">
        <div className="info">
          <span className="author_info">
            | 작성자 : {author} | 감정점수 : {emotion} |
          </span>
          <br />
          <span className="date">{new Date(created_date).toLocaleString()}</span>
        </div>
        <div className="content">{content}</div>
        <button
          onClick={() => {
            if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
              onDelete(id);
            }
          }}
        >
          삭제하기
        </button> {/* 각 아이템마다 삭제 버튼 추가 : 삭제 버튼을 누르면 data state에서 해당 아이템을 삭제*/}
      </div>
    );
  };
  
  export default DiaryItem;
```

## React에서 배열 사용하기 4 : 데이터 수정하기

### 목표 : React에서 리스트 데이터 수정하기

- 배열을 이용한 React의 List에
- 아이템을 동적으로 수정 해보기
- With 조건부 렌더링

### 수정하기 버튼을 눌러 content를 변경하고 저장 또는 취소

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/0c05b7f6-d9ac-4408-a2de-ba85b96e34c7/Untitled.png)

**DiaryItem 컴포넌트 변경**

```jsx
import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date
}) => {

  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);  // 수정 content에 포함되는 데이터를 관리하는 state, 기본값을 원래 content로 설정하여 수정을 누르면 현재 작성되어 있는 content를 보여줌

  const [isEdit, setIsEdit] = useState(false); // 수정 중인지 아닌지를 참거짓 형태로 표현
  const toggleIsEdit = () => setIsEdit(!isEdit); // 호출되면 isEdit의 값을 반전

  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => { // 수정 상태에서 나감, 즉 수정 상태에서 작성한 내용을 지움
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
      <div className="DiaryItem">
        <div className="info">
          <span className="author_info">
            | 작성자 : {author} | 감정점수 : {emotion} |
          </span>
          <br />
          <span className="date">{new Date(created_date).toLocaleString()}</span>
        </div>

        <div className="content">
        {isEdit ? ( 
          <textarea // 수정중
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : ( // 수정중이 아님
          content
        )}
      </div>
      {isEdit ? (  
        <> {/* 수정중*/}
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <> {/* 수정중 아님*/}
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default DiaryItem;
```

**App 컴포넌트 변경**

```jsx
import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  
  const [data, setData] = useState([]);

  const dataId = useRef(0);
  
  const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        create_date,
        id: dataId.current
      }
      dataId.current += 1;
      setData([newItem, ... data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    );
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
```

**DiaryList 컴포넌트 변경**

```jsx
import DiaryItem from "./DiaryItem";
const DiaryList = ({ onEdit, onRemove, diaryList }) => {
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
            ))}
        </div>
    </div>
    );
};

DiaryList.defaultProps = {
    diaryList:[],
};
export default DiaryList;
```

## React Lifecycle 제어하기 : useEffect

### Lifecycle 생애 주기

**React 컴포넌트의 생애주기(생명주기)**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/1ba7c493-5958-47c8-8df1-336d8984f716/Untitled.png)

탄생 → 변화 → 죽음 : 이 과정에 각 작업을 수행할 수 있음

- 탄생 Mount : 화면에 나타나는 것 ex) 초기화 작업
- 변화 Update : 업데이트 = 리렌더 ex) 예외 처리 작업
- 죽음 UnMount : 화면에서 사라지는 것 ex) 메모리 정리 작

**React lifecycle마다 실행할 수 있는 메서드**

기본적으로 class형 컴포넌트만 사용 가능 ⇒ React Hooks

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/eb93558b-eab0-4f10-9f35-b7522dc7e3fd/Untitled.png)

### **React Hooks**

class형 컴포넌트만 사용할 수 있는 메서드를 함수형 컴포넌트에서 낚아채서 사용

use 키워드

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/fccd0c64-da9d-44cf-be3e-d78d76ca121d/Untitled.png)

**class형 컴포넌트의 단점**

- 같은 기능인데도 함수형 컴포넌트에 비해 코드 길이가 길다
- 중복 코드
- 가독성 문제

 ⇒ React Hooks 출시

### **useEffect**

React의 함수형 컴포넌트에서 lifecycle을 제어하기 위해 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/ec9a7a24-095e-46c8-8c28-edd3a1543005/Untitled.png)

- 첫 번째 parameter : Callback 함수
- 두 번째 parameter : Dependency Array (deps) 의존성 배열

deps에 자꾸 변하는 값을 넣어두면 이 값이 변할 때마다 콜백 함수가 실행됨

### Lifecycle 컴포넌트

```jsx
import React, { useEffect, useState } from "react";

const UnMountTest = () => { // UnMount 설정을 위한 세팅
  useEffect(() => { // UnMount : callback 함수가 함수를 하나 return
    console.log("Sub Component Mount");
    return () => { {/* UnMount 시점에 실행 */}
      console.log("Sub Component Unmount");
    };
  }, []);
  return <div>UN MOUNT TEST</div>;
};

const LifeCycle = () => {
  const [count, setCount] = useState(0); // 기본 세팅
  const [text, setText] = useState(""); // 기본 세팅

  const [isVisible, setIsVisible] = useState(false); // UnMount 설정을 위한 세팅
  const toggle = () => setIsVisible(!isVisible);

  useEffect(() => {
    console.log("Mount!"); // Mount 시점 : deps에 빈 배열 전달
  }, []);

  useEffect(() => {
    console.log("Update!");  // Update 시점 : deps에 아무것도 전달하지 않음
  });

  useEffect(() => {
    console.log(`count is update : ${count}`); // count가 변하는 시점마다 Update
  }, [count]); 

  useEffect(() => {
    console.log(`text is update : ${text}`); // text가 변하는 시점마다 Update
  }, [text]);

  return (
    <div>
      <div> {/* 기본 세팅 ~ */}
        {count}
        <button onClick={() => setCount(count + 1)}>count up</button>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>  {/* ~ 기본 세팅 */}

      <button onClick={toggle}>ON/OFF BUTTON</button> {/* UnMount 설정을 위한 세팅 */}
      {isVisible && <UnMountTest />} {/* isVisible이 true일 때 <UnMountTest />가 반환*/}
    </div>
  );
};

export default LifeCycle;
```

**APP 컴포넌트 변경**

```jsx
import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import LifeCycle from './Lifecycle';

function App() {
  
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  
  const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        create_date,
        id: dataId.current
      }
      dataId.current += 1;
      setData([newItem, ... data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    );
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <LifeCycle />
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
```

## React에서 API 호출하기

### 목표 : React에서 API 호출하기

- useEffect를 이용하여 컴포넌트 Mount 시점에
- API를 호출하고 해당 API의 결과값을
- 일기 데이터의 초기값으로 이용하기

JSONPlaceholder-source-comments를 이용

[JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

### API를 불어와서 기본값을 설정

**App 컴포넌트 변경**

```jsx
import { useRef, useState, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import LifeCycle from './Lifecycle';

function App() {
  
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => { // API를 불러와서 기본값 설정
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => { // 20개만 잘라서
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 1 ~ 5 랜덤
        created_date: new Date().getTime() + 1, // 
        id: dataId.current++ // id에 dataId.current를 넣고 +1한 후 끝남
      };
    });

    setData(initData);
  };

  useEffect(() => { // Mount시 수행
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        create_date,
        id: dataId.current
      }
      dataId.current += 1;
      setData([newItem, ... data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    );
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
```

## React developer tools

React 개발 시 생산성을 확 올려주는 유용한 개발자 도구

크롬 확장 도구

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)

### npm start를 통해 React를 실행

개발자 도구 - **components**

우리가 만들었던 컴포넌트의 계층 구조를 해석해서 보여줌

- 각 컴포넌트가 어떤 State, Ref, Effect를 가지고 있는지
- state가 실시간으로 변경 되는
- 어떤 props를 받았는지
- 리스트 아이템의 키 값 등

개발자 도구 - components - view setting(오른쪽 상단, 톱니바퀴 모양)

“Highlight updates when components render.”를 체크

내용을 작성하면 리렌더링 되고 있는 컴포넌트에 강조 표시를 해줌

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/8294aecf-ccc2-404b-bb58-33c212c80833/Untitled.png)

## 최적화 1 : 연산 결과 재사용 useMemo

### 목표 : 연산 결과 값을 재사용 하는 방법

- 현재 일기 데이터를 분석하는 함수를 제작하고
- 해당 함수가 일기 데이터의 길이가 변화하지 않을 때
- 값을 다시 계산하지 않도록 하기

+) Memoization 이해하기

### Memoization

이미 계산 해 본 연산 결과를 기억 해 두었다가 동일한 계산을 시키면, 다시 연산하지 않고 기억해 두었던 데이터를 반환시키게 하는 방법

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/88bcb458-87e4-4efa-b6ce-b9fe26c5fa17/Untitled.png)

### useMemo

리턴을 가지고 있는 함수를 memoization해서 최적화하기 위해 사용

첫 번째 인자 : 콜백 함수

두 번째 인자 : data.length -> data.length가 변화할 때만 콜백 함수를 실행
useMemo를 사용하면 그건 더이상 함수가 아니라 값 : useMemo가 값을 리턴하기 때문

### 일기의 감정 점수를 분석

**App 컴포넌트 변경**

```jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

// 일기 수정의 경우 데이터의 길이가 변하지 않으므로 콜백 함수가 수행되지 않음
  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("일기 분석 시작");

		// 기분이 좋은 일기의 개수를 센다
    const goodCount = data.filter((it) => it.emotion >= 3).length;

		// 기분이 좋지 않은 일기의 개수를 센다
    const badCount = data.length - goodCount;

		// 기분이 좋은 일기의 비율을 구한다
    const goodRatio = (goodCount / data.length) * 100.0;

		// 3가지 데이터를 개체로 리턴
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

	// 함수를 호출하여 리턴받은 객체를 객체에 비구조 할당
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 값으로 사용

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
			{/* 분석한 데이터를 출력 */}
      <div>전체 일기 : {data.length}</div> 
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
```

## 최적화 2 : 컴포넌트 재사용 React.memo

### React.memo

부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리덴더링 됨

→ 아래 상황에서 <TextView>는 리렌더링 될 필요가 없음 : 변경 사항이 없기 때문

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a86fb079-6391-4850-b780-7ab55549123c/Untitled.png)

⇒ 아래와 같이 설정 : React.memo를 통해 함수형 컴포넌트에 업데이트 조건을 걸자

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a362ce50-2031-4513-9101-9b793c82eca6/Untitled.png)

**React.memo**

[React 최상위 API – React](https://ko.legacy.reactjs.org/docs/react-api.html#reactmemo)

`React.memo`는 [고차 컴포넌트(Higher Order Component)](https://ko.legacy.reactjs.org/docs/higher-order-components.html)입니다.

컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, `React.memo`를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.

`React.memo`컴포넌트가 고차 컴포넌트로써 함수처럼 호출

매개 변수로 컴포넌트 전달

더 강화된 새로운 컴포넌트를 반환하여 `MyComponent`상수에 저장

똑같은 `props`를 주면 다시 계산하지 않고 재사용

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});
```

⇒ 고차 컴포넌트 `React.memo`로 리렌더링 되지 않았으면 하는 컴포넌트를 감싸면 `props`가 바뀌지 않으면 리렌더링 되지 않은 강화된 컴포넌트를 만들 수 있음

*고차 컴포넌트

컴포넌트를 가져와 새 컴포넌트를 반환하는 함수

함수를 호출해서 매개변수로 컴포넌트를 전달하면 더 좋아진 컴포넌트를 반환

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

**비원시 타입의 비교**

객체, 함수, 배열 같은 비원시 타입을 비교할 때는 주소에 의한 얕은 비교를 수행

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/b1113735-fc85-47bc-ac2a-2932df7912a9/Untitled.png)

단, 대입을 하면 같다고 인식

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/86f0f363-1f6f-4f87-b605-9107a08bb971/Untitled.png)

⇒ React.memo의 두 번째 인자로 `areEqual`함수를 전달, 그 안에 깊은 비교를 구현

```jsx
function MyComponent(props) {
  /* props를 사용하여 렌더링 */
}
function areEqual(prevProps, nextProps) {
  /*
  nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 
	그렇지 않다면 false를 반환
  */
}
export default React.memo(MyComponent, areEqual); // areEqual을 비교함수로 사용
```

### OptimizeTest 컴포넌트

**OptimizeTest 컴포넌트 생성 : 컴포넌트를 재사용하는 실습용으로 사용**

```jsx
import React, { useEffect, useState } from "react";

// count state를 props로 받음
// 버튼을 클릭해도 값이 변경되지 않으므로 리렌더링 되지 않고 출력도 안 함
const CounterA = React.memo(({ count }) => {
  useEffect(() => { 	// 렌더링 될 때 출력
    console.log(`CountA Update - count : ${count}`);
  });
  return <div>{count}</div>;
});

 // obj state를 props로 받음
const CounterB = ({ obj }) => {
  useEffect(() => { 	// 렌더링 될 때 출력
    console.log(`CountB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true; // 변화가 없다 : 리렌더링을 하지 않는다
  }
  return false;
};

// 객체를 비교할 때는 얕은 비교를 하기 때문에 areEqual을 활용
// CounterB 컴포넌트는 areEqual 함수에 결과에 따라 리렌더링 여부를 결정
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1); // count state
  const [obj, setObj] = useState({ // object state
    count: 1 // 객체로 카운터를 사용
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
				{/* count 값이 원래 값으로 변경 : 그대로 유지 */}
        <button onClick={() => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
				{/* count 값이 원래 값으로 변경 : 그대로 유지 */}
        <button onClick={() => setObj({ count: 1 })}>B Button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
```

**App 컴포넌트 변경**

```jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
```

## 최적화 3 : useCallback

### 어디가 낭비? : React developer tools 활용하여 탐색

개발자 도구 - Components - view setting(오른쪽 상단, 톱니바퀴 모양)에서

“Highlight updates when components render.” 기능을 활용

: 어떤 컴포넌트가 리렌더링 되고 있는지를 표시

**컴포넌트는 언제 렌더링 되는가?**

- 자신이 가진 state에 변화
- 부모 컴포넌트가 리렌더링
- 자신이 받은 props에 변경

현재 코드에서 일기 삭제가 수행되면 DiaryEditor가 리렌더링 : 낭비

### useCallback

[Hooks API Reference – React](https://ko.legacy.reactjs.org/docs/hooks-reference.html#usecallback)

두 번째 인자로 전달된 dependency array 안의 값이 변경되지 않으면 첫 번째 인자로 전달한 콜백 함수를 계속 재사용할 수 있게 해주는 react hook

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

[메모이제이션된](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98) 콜백을 반환합니다.

### DiaryEditor 컴포넌트 최적화

**DiaryEditor 변경**

```jsx
import React, { useEffect, useRef, useState } from "react";

// onCreate는 App 컴포넌트가 렌더링 될 때마다 다시 만들어짐
// => onCreate가 리렌더링 되지 않아야 DiaryEditor 컴포넌트를 최적화 가능
const DiaryEditor = React.memo(({ onCreate }) => { 
	// useEffect : 어디가 렌더링 되는지 출력
  useEffect(() => {
    console.log("DiaryEditor 렌더");
  });
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          value={state.author}
          onChange={handleChangeState}
          name="author"
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          onChange={handleChangeState}
          name="content"
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
});

// 코드가 길 때는 export default React.memo(DiaryEditor);로 하면 좀 더 편함
export default DiaryEditor;
```

**App 컴포넌트 변경**

```jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

/* 
	onCreate 함수는 콜백 안에 갖혀서 deps를 빈 배열로 전달하기 때문에 
	onCreate 함수가 알고 있는 data는 빈 배열 
	=> 콜백 함수의 마지막 코드를 setData([newItem, ...data]);로 작성하면 
		 새로운 일기를 추가하면 기존 일기는 사라지고 새로운 일기만 저장되는 일이 발생
	=> 함수형 업데이트 활용 : setData((data) => [newItem, ...data]);
		 data 인자를 통해 최신의 state를 참고할 수 있음
*/
  const onCreate = useCallback( // 첫 번째 인자 : 콜백 함수, 두 번째 인자:
		// 콜백 함수 : 저장을 눌렀을 때 DiaryEditor가 데이터를 추가
    (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current
      };

      dataId.current += 1;
      setData((data) => [newItem, ...data]); // 함수형 업데이트
    },
    [] // deps를 빈 배열로 지정 : Mount 되는 시점에 한 번만 만들고 이후에는 재사용
  );

  const onRemove = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId
    );
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId
          ? { ...it, content: newContent }
          : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3)
      .length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const {
    goodCount,
    badCount,
    goodRatio
  } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList
        onEdit={onEdit}
        onRemove={onRemove}
        diaryList={data}
      />
    </div>
  );
};
export default App;
```

## 최적화 4 : 최적화 완성

### DiaryItem 컴포넌트 최적화

아이템 하나만 삭제해도 전체 아이템이 리렌더링 되는 문제를 해결

**DiaryItem 컴포넌트 변경**

```jsx
import React, { memo, useEffect, useRef, useState } from "react";

const DiaryItem = ({ // props
  onRemove, // App 컴포넌트로부터 받은 함수
  onEdit, // => data state가 변화하면 리렌더링 될 수 밖에 없음
  id, // data
  author,
  content, // 얘만 수정 가능
  emotion,
  created_date
}) => { // 어떤 item이 렌더링 되는지 출력
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
```

**App 컴포넌트 변경**

```jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    setData(initData);
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };

    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId)); // 함수형 업데이트
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>  // 함수형 업데이트
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
```

## 복잡한 상태 변 로직 분리하기 : useReducer

### **UseReducer**

```jsx
// first : state
// second : 상태 변화를 일으키는 함수, 액션 객체 전달
// reducer : second를 호출해서 액션 객체를 전달하면 reducer가 상태 변화를 처리
// initial : state의 초기값
const [first, second] = useReducer(reducer, initial);
```

```jsx
const reducer = (state, action) => {
	switch (action.type) {
		...
	}
};
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/4e006a06-6ef4-49d4-9990-ea7519086450/Untitled.png)

### App 컴포넌트에서 상태 변화 로직 분리하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/73619036-eddb-4573-b041-325a75c2ad5c/Untitled.png)

**App 컴포넌트**

```jsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
	//useState,
  useRef
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

// state ; 상태 변화가 일어나기 직전의 상태
// action : 어떤 상태 변화를 일으켜야 하는지 정보 action.type로 switch 이용
// reducer가 리턴하는 값이 새로운 상태
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; // action.data = initData로 초기화
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, // onCreate 함수의 dispatch에서 전달해준 데이터
        created_date
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? { // 수정하려는 요소를 만나면
              ...it,
              content: action.newContent // content만 수정
            }
          : it // 수정하려는 요소가 아니면 그냥 그대로 둠
      );
    }
    default:
      return state;
  }
};

const App = () => {
  // const [data, setDate] = useState([]);
  
 // 첫 번째는 data state, 두 번째는 항상 dispatch
 // useReducer에 상태 변화를 처리하는 reducer 함수, data state의 초기값을 전달
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });
		 // action.type = "INIT", action.data = initData
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current } // newItem의 데이터
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId }); // 이 id를 가진 아이템을 지움
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    });
  }, []);

  const memoizedDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = memoizedDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
```

## 컴포넌트 트리에 데이터 공급하기 : Context

### Context

**props 드릴링**

단방향 데이터 전달만 가능한 React에 특성에 의해 발생

데이터를 전달하기 위한 prop(그냥 거쳐가기만 하는 prop)가 많아짐

여러 차례 props를 거쳐서 데이터를 전달해야 함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/101d7822-ec1e-46ea-862d-09cf26c7ff2e/Untitled.png)

**Context**

Provider 컴포넌트가 공급하는 모든 데이터에 접근할 수 있는 컴포넌트의 영역

</Provider/>: 모든 자식 컴포넌트에 바로 데이터를 넘길 수 있다는 특징을 가짐

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/5ab344db-399b-4905-9c68-615aa0670a7a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/e8026996-7352-4bd8-81c4-cac7ed25e21e/Untitled.png)

```jsx
const contextName = React.createContext(defaultvalue);

// context 객체는 Provider라는 컴포넌트를 가지고 있음
<contextName.Provider value = { // 자식 컴포넌트에 전달하고자 하는 값 }> 
	{ // 자식 컴포넌트 }
</name.Provider>
```

### props 드릴링 제거하기

**App 컴포넌트 변경**

```jsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  createContext
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

// 다른 컴포넌트들이 context가 보내는 데이터를 받으려면 export 해줘야 함
// 단, export default는 파일 하나당 하나만 사용 가능하므로 export 사용
export const DiaryStateContext = createContext(null);
export const DiaryDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent
            }
          : it
      );
    }
    default:
      return state;
  }
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const getData = async () => {
    setTimeout(async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((res) => res.json());

      const initData = res.slice(0, 20).map((it) => {
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++
        };
      });

      dispatch({ type: "INIT", data: initData });
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current }
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); // 절대 리랜더링 되지 않는게 useMemo로 묶어줌

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
		{/* 여기에 onCreate. onRemove, onEdit을 전달하면 
				data state가 바뀔 때마다 리렌더링이 일어나 최적화가 소용 없어짐
			  => context 중첩 */}
    <DiaryStateContext.Provider value={data}> {/* 여기 */}

      <DiaryDispatchContext.Provider value={memoizedDispatch}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
```

**DiaryList 컴포넌트 변경**

```jsx
import React, { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext); // Context에서 데이터를 불러옴

  return (
    <div className="DiaryList_container">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it, idx) => (
          <DiaryItem key={`diaryitem_${it.id}`} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: []
};

export default DiaryList;
```

**DiaryEditor 컴포넌트 변경**

```jsx
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const [diary, setDiary] = useState({
    author: "",
    content: "",
    emotion: 1
  });

  const handleChangeDiary = (e) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value
    });
  };

  const handleAddButtonClick = () => {
    if (diary.author.length < 1) {
      authorRef.current.focus();
      return;
    }

    if (diary.content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(diary.author, diary.content, diary.emotion);
    alert("일기가 성공적으로 추가되었습니다");

    setDiary({
      author: "",
      content: "",
      emotion: 1
    });
  };

  const authorRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <div className="DiaryEditor_container">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorRef}
          name="author"
          placeholder="작성자"
          type="text"
          value={diary.author}
          onChange={handleChangeDiary}
        />
      </div>
      <div>
        <textarea
          ref={contentRef}
          name="content"
          placeholder="일기"
          type="text"
          value={diary.content}
          onChange={handleChangeDiary}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={diary.emotion}
          onChange={handleChangeDiary}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleAddButtonClick}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default memo(DiaryEditor);
```

**DiaryItem 컴포넌트 변경**

```jsx
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLoclContent] = useState(content);
  const localContentInput = useRef(null);

  const handleRemove = () => {
    if (window.confirm(`${id}번 째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLoclContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem_container">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>

      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLoclContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isEdit ? (
        <div>
          <button onClick={handleQuitEdit}>수정 취소하기</button>
          <button onClick={handleEdit}>저장하기</button>
        </div>
      ) : (
        <div>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </div>
      )}
    </div>
  );
};

export default memo(DiaryItem);
```

# 6. React 실전 프로젝트 : 감정 일기장 만들기

## 페이지 라우팅 0 : React SPA & CSR

### **Routing**

어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

경로를 정해주는 행위 자체와 그런 과정들을 다 포함하여 일컫는 말

Router : 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가

### **Page Routing**

요청에 따라 어떤 페이지를 돌려줄지 결정하는 과정

인터넷을 사용해서 웹 사이트에 접속하려면 브라우저를 통해서 웹 서버에 경로의 요청을 알리고 웹 문서를 받아봄

**Multipage Application MPA**

여러 개의 페이지를 준비해 두었다가 요청이 들어오면 경로에 따라 적절한 페이지를 보내는 방식

브라우저가 웹 페이지에 대한 데이터를 받으면 새로 고침되면서 페이지가 이동하는 방식

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/7b59c8cc-472e-4aac-a487-71c7b593575e/Untitled.png)

**Single Page Application SPA와 Client Side Rendering CSR**

SPA : React가 해당

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/dce2211d-96ea-4bee-9785-ec933268c0ba/Untitled.png)

 ⇒ 여러 페이지 사용 불가? no

페이지를 이동하면 React가 Index.html의 내용을 업데이트 하는 방식으로 페이지를 이동

이때 서버에 접근이 불필요하기 때문에 매우 빠름

데이터가 필요한 경우에는 서버에 데이터만 받음

SPA에서 클라이언트 측이 직접 페이지를 렌더링 하는 방식을 CRS이라고 함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/e6e53868-18bc-47c4-ab3c-36816434fa1f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a911b1f5-3afb-4444-9b13-c32f09d4c1fd/Untitled.png)

## 페이지 라우팅 1 : React Router 기본

### 기본 세팅

터미널에 `npm i react-router-dom@6`을 입력해 React Router 설치

`package.json`에서 설치되었는지 확인 가능

pages 폴더를 만들고 그 안에 Home.js, New.js, Edit.js, Diary.js를 생성

### App 컴포넌트

```jsx
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      {/* 얘로 감싸져 있는 부분은 브라우저의 URL과 매핑 */}
      <div className="App">
        <h2>App.js</h2>

        {/* 브라우저의 URL이 바뀌게 되면 어떤 컴포넌트를 렌더링해서 페이지 역할을
            하게 할 것인지를 결정하기 위해 <Routes></Routes>로 바뀔 부분을 표시 */}
        <Routes>
          {/* URL을 변경하면 이 안의 것만 변경 */}
          {/* <Route /> : 실질적으로 URL 경로와 컴포넌트를 매칭시켜줌 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>

        {/* a태그를 사용하면 SPA을 쾌적한 페이지 이동을 누릴 수 없음 
            => react-router-dom의 Link 사용*/}
        <RouteTest />

      </div>
    </BrowserRouter>
  );
}

export default App;
```

### RouterTest.js

"react-router-dom"의 Link를 활용하여 각 페이지로 이동하는 링크를 생성

```jsx
import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/new"}>NEW</Link>
      <br />
      <Link to={"/edit"}>EDIT</Link>
      <br />
      <Link to={"/diary"}>DIARY</Link>
    </>
  );
};

export default RouteTest;
```

## 페이지 라우팅 2 : React Router 응용

### React Router Dom의 유용한 기능

**REACT ROUTER V6**

React에서 CSR 기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리

1. Path Variable : useParams
2. Query String : useSearchParams
3. Page Moving : useNavigate

### Path Variable : useParams

URL에 변수를 담아서 전달하는 방법

 useParams라는 hook을 사용해서 가져옴

**App 컴포넌트 변경**

```jsx
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />{" "}
          {/*/diary/1과 같이 id(path variable)를 넣어 접근 */}
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

**Diary 컴포넌트 변경**

```jsx
import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams(); // 전달되는 id(path variable)을 모아서 객체로 전달

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지입니다.</p>
    </div>
  );
};

export default Diary;
```

### Query String : useSearchParams

Query : 웹 페이지에 데이터를 전달하는 가장 간단한 방법

ex) /edit?id=10&mode=dark : ? 뒤는 페이지 라우팅 하는 경로에는 영향을 주지 않음

Edit 컴포넌트 변경

```jsx
import { useSearchParams } from "react-router-dom";

const Edit = () => {
  // useSearchParams는 배열을 반환 : 베열의 이름은 자유롭게 가능
  // 첫 번째 반환 idx로 get을 통해 전달받은 query string을 꺼내쓸 수 있음
  // setSearchParams는 searchParams를 변경하는 기능
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다.</p>

			{/* setSearchParams를 활용해 query string을 변경 */}
      <button onClick={() => setSearchParams({ who: "js" })}>QS 변경</button>

    </div>
  );
};

export default Edit;
```

### Page Moving : useNavigate

**Edit 컴포넌트 변경**

```jsx
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
	// 페이지를 이동시킬 수 있는 기능을 하는 함수를 하나 반환
	//Link를 클릭하지 않아도 의도적으로 경로를 바꿈
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ who: "js" })}>QS 변경</button>
      <button
        onClick={() => {
          navigate("/home"); {/* 인자로 경로를 작성 */}
        }}
      >
        HOME으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Edit;
```

## 프로젝트 기초 공사 1

### 기초 공사 항목

1. 폰트 세팅 : Google Web Fonts를 이용한 프로젝트에 사용되는 폰트 세팅
2. 레이아웃 세팅 : 모든 페이지에 반영되는 레이아웃 세팅
3. 이미지 에셋 세팅 : 감정 이미지들을 프로젝트에 불러와 사용할 수 있는 환경 세팅
4. 공통 컴포넌트 세팅 : 모든 페이지에 공통으로 사용되는 버튼, 헤더 컴포넌트 세팅

### 폰트 세팅

Nanum pen Script, Yeon sung : Open Font License

[Browse Fonts - Google Fonts](https://fonts.google.com/)

**App.css 변경**

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

.App {
  padding: 20px;

  font-family: "Yeon Sung", cursive;
  font-family: "Nanum Pen Script", cursive; /* 가장 아래의 font-family가 실행 */
}
```

### 레이아웃 세팅

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/cd6a7a46-ee71-4268-b95b-4fee517bfa85/Untitled.png)

**App.css 변경**

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center; /* 가로축 가운데로 */
  align-items: center; /* 세로축 가운데로 */
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh; /* 현재 웹 스크린의 100%를 높이로 */
  margin: 0; /* 기본적으로 설정되어 있는 margin을 0으로 */
}

/* @media mid-width와 max-width를 통해서 규칙을 지정하게 해 줌 */
@media (min-width: 650px) {
  /* width가 650px 이상일 때만 적용 */
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}
```

### 이미지 에셋 세팅

public 디렉토리 내에 assets이라는 폴더를 생성해서 그 안에 감정 이미지들을 넣음

**App 컴포넌트 변경**

```jsx
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import RouteTest from "./components/RouteTest"; 필요 없으므로 지우기

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  // const env = process.env; 이미지가 안나오면
  // env.PUBLIC_URL = env.PUBLIC_URL || ""; 추가할 것

  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>

        {/* process.env.PUBLIC_URL : public 디렉토리의 경로 */}
        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        {/* <RouteTest />  필요 없으므로 지우기 */}
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### 공통 컴포넌트 세팅

UI 요소(버튼 등)가 어떤 기준으로 얼마나 변경되는지를 찾아내서 패턴화 해야함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/541ae21e-6d9d-451f-bb7b-e5c77e9526e3/Untitled.png)

- 버튼 컴포넌트
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/ff9df8b0-1c10-460e-9e50-ac068db2faf8/Untitled.png)
    
    **MyButtom.js 생성**
    
    ```jsx
    const MyButton = ({ text, type, onClick }) => {
      // type의 디폴트를 default로 설정
      const btnType = ["positive", "negative"].includes(type) ? type : "default";
      return (
        <button
          className={["MyButton", `MyButton_${type}`].join(" ")}
          onClick={onClick}
        >
          {text}
        </button>
      );
    };
    
    MyButton.defautProps = {
      type: "default",
    };
    
    export default MyButton;
    ```
    
    **App 컴포넌트 변경**
    
    ```jsx
    import "./App.css";
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    
    import Home from "./pages/Home";
    import New from "./pages/New";
    import Edit from "./pages/Edit";
    import Diary from "./pages/Diary";
    
    // COMPONENTS
    import MyButton from "./components/MyButton";
    
    function App() {
      return (
        <BrowserRouter>
          <div className="App">
            <h2>App.js</h2>
    
            {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
            <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} /> */}
    
            <MyButton 
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"positive"} 
            />
            <MyButton 
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"negative"} 
            />
            <MyButton 
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"default"} 
            />
    
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
    
    export default App;
    ```
    
    **App.css 변경**
    
    ```jsx
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");
    
    body {
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Nanum Pen Script", cursive;
      min-height: 100vh;
      margin: 0;
    }
    
    @media (min-width: 650px) {
      .App {
        width: 640px;
      }
    }
    
    @media (max-width: 650px) {
      .App {
        width: 90vw;
      }
    }
    
    #root {
      background-color: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    .App {
      min-height: 100vh;
      padding-left: 20px;
      padding-right: 20px;
    }
    
    /* MyButton */
    .MyButton {
      cursor: pointer;
      border: none;
      border-radius: 5px;
    
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
    
      font-size: 18px;
    
      white-space: nowrap; /* 버튼 안의 글자가 짤려서 여러줄이 되지 않게 해 줌*/
      font-family: "Nanum Pen Script";
    }
    
    .MyButton_default {
      background-color: #ececec;
      color: black;
    }
    
    .MyButton_positive {
      background-color: #64c964;
      color: white;
    }
    
    .MyButton_negative {
      background-color: #fd565f;
      color: white;
    }
    ```
    
- 헤더 컴포넌트
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/6813432b-6bea-4fef-9488-ab09c0ffc851/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/2730a504-86e0-44e0-9e71-b563f6c79633/Untitled.png)
    
    **MyHeader.js 생성**
    
    ```jsx
    const MyHeader = ({ headText, leftChild, rightChild }) => {
      return (
        <header>
          <div className="head_btn_left">{leftChild}</div>
          <div className="head_text">{headText}</div>
          <div className="head_btn_right">{rightChild}</div>
        </header>
      );
    };
    
    export default MyHeader;
    ```
    
    **App 컴포넌트 변경**
    
    ```jsx
    import "./App.css";
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    
    import Home from "./pages/Home";
    import New from "./pages/New";
    import Edit from "./pages/Edit";
    import Diary from "./pages/Diary";
    
    // COMPONENTS
    import MyButton from "./components/MyButton";
    import MyHeader from "./components/MyHeader";
    
    // {/* */}
    
    function App() {
      return (
        <BrowserRouter>
          <div className="App">
            <MyHeader
              headText={"App"}
              leftChild={
                <MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 버튼")} />
              }
              rightChild={
                <MyButton
                  text={"오른쪽 버튼"}
                  onClick={() => alert("오른쪽 버튼")}
                />
              }
            />
            <h2>App.js</h2>
    
            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"positive"}
            />
            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"negative"}
            />
            <MyButton
              text={"버튼"}
              onClick={() => alert("버튼 클릭")}
              type={"default"}
            />
    
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
    
    export default App;
    ```
    
    **App.css 변경**
    
    ```jsx
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");
    
    body {
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Nanum Pen Script", cursive;
      min-height: 100vh;
      margin: 0;
    }
    
    @media (min-width: 650px) {
      .App {
        width: 640px;
      }
    }
    
    @media (max-width: 650px) {
      .App {
        width: 90vw;
      }
    }
    
    #root {
      background-color: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    .App {
      min-height: 100vh;
      padding-left: 20px;
      padding-right: 20px;
    }
    
    /* MyButton */
    .MyButton {
      cursor: pointer;
      border: none;
      border-radius: 5px;
    
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
    
      font-size: 18px;
    
      white-space: nowrap;
      font-family: "Nanum Pen Script";
    }
    
    .MyButton_default {
      background-color: #ececec;
      color: black;
    }
    
    .MyButton_positive {
      background-color: #64c964;
      color: white;
    }
    
    .MyButton_negative {
      background-color: #fd565f;
      color: white;
    }
    
    /* HEADER */
    
    header {
      padding-top: 20px;
      padding-bottom: 20px;
    
      display: flex; /* display 방향을 가로로 바꿔줌 */
      align-items: center;
      border-bottom: 1px solid #e2e2e2;
    }
    
    header > div {
      /* header의 바로 아래 자식인 div */
      display: flex;
    }
    
    header .head_text {
      width: 50%;
      font-size: 25px;
      justify-content: center;
    }
    
    header .head_btn_left {
      width: 25%;
      justify-content: start;
    }
    
    header .head_btn_right {
      width: 25%;
      justify-content: end;
    }
    
    header button {
      font-family: "Nanum Pen Script";
    }
    ```
    

## 프로젝트 기초 공사 2

### 기초 공사 항목

1. 상태 관리 세팅하기 : 프로젝트 전반적으로 사용될 일기 데이터 State 관리 로직 작성하기
2. 프로젝트 State Context 세팅하기 : 일기 데이터 State를 공급할 Context를 생성하고 Provider로 공급하기
3. 프로젝트 Dispatch Context 세팅하기 : 일기 데이터 State의 Dispatch 함수들을 공급할 Context를 생성하고 Provider로 공급하기

### 기초 공사

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/fd3ec8ac-8d24-4aec-9ed6-20b478bbe171/Untitled.png)

**App 컴포넌트 변경**

```jsx
import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.date;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getItem(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getItem(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <h2>App.js</h2>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
```

## 페이지 구현 : 홈 (/)

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a8f8d82b-9c8b-41d7-8897-9dd994608456/Untitled.png)

### 헤더

**Home.js 변경**

```jsx
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setDate] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setDate(diaryList.filter((it) => firstDay <= it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth - 1, curDate.getDate())
    );
  };

  return (
    <div>
      {/* header 왼쪽버튼, 현재 년월, 오른쪽버튼*/}
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onclick={increaseMonth} />}
      />
    </div>
  );
};

export default Home;
```

### 최신순/오래된 순 정렬

**DiaryList.js 생성**

```jsx
import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
```

**App 컴포넌트 변경 : dummyList 추가**

```jsx
import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.date;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1699360513774,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1699360513775,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1699360513776,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1699360513777,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1699360513778,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getItem(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getItem(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

// {/* */}
```

**Home.js 변경 : DiaryList 추가**

```jsx
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setDate] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setDate(diaryList.filter((it) => firstDay <= it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth - 1, curDate.getDate())
    );
  };

  return (
    <div>
      {/* header 왼쪽버튼, 현재 년월, 오른쪽버튼*/}
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onclick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;

// {/* */}
```

### 감정 필터

**DiaryList.js 변경**

```jsx
import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter(filterCallBack);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
```

### 새 일기쓰기 버튼

**DiaryList.js 변경**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter(filterCallBack);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />

      <MyButton
        type="positive"
        text={"새 일기쓰기"}
        onClick={() => navigate("/new")}
      />

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
```

### 스타일링

**App 컴포넌트 변경**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter(filterCallBack);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="memu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />

          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
```

**App.css 변경**

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

```

### 다이어리 리스트

**DiaryItem 컴포넌트 생성**

```jsx
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text="수정하기" />
      </div>
    </div>
  );
};

export default DiaryItem;
```

**App.css 변경**

```jsx
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

/* DiaryItem */
.DiaryItem {
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
}

.DiaryItem .emotion_img_wrapper {
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.DiaryItem .emotion_img_wrapper_1 {
  background-color: #64c964;
}

.DiaryItem .emotion_img_wrapper_2 {
  background-color: #9dd772;
}

.DiaryItem .emotion_img_wrapper_3 {
  background-color: #fdce17;
}

.DiaryItem .emotion_img_wrapper_4 {
  background-color: #fd8446;
}

.DiaryItem .emotion_img_wrapper_5 {
  background-color: #fd565f;
}

.DiaryItem .emotion_img_wrapper img {
  width: 50px;
}

.DiaryItem .info_wrapper {
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
}

.DiaryItem .diary_date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}

.DiaryItem .diary_content_preview {
  font-size: 18px;
}

.DiaryItem .btn_wrapper {
  min-height: 70px;
}
```

## 페이지 구현 : 일기 쓰기 (/new)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/9641e18a-b889-4980-9b6c-08c7e4c716ec/Untitled.png)

### 헤더

**new.js 변경**

```jsx
import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "../components/MyButton";

const New = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
    </div>
  );
};

export default New;
```

### 날짜

**new.js 변경**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "../components/MyButton";

const getsStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  const [date, setDate] = useState(getsStringDate(new Date()));

  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
            className="input_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
```

new 페이지와 edit 페이지가 비슷하기 때문에 위 코드를 DiaryEditor 컴포넌트로 분리

**DiaryEditor 컴포넌트 생성**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

const getsStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

const DiartEditor = () => {
    const [date, setDate] = useState(getsStringDate(new Date()));

    const navigate = useNavigate();
  
    return (
      <div className="DiaryEditor">
        <MyHeader
          headText={"새 일기쓰기"}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
        />
        <div>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className="input_box">
              <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date" />
            </div>
          </section>
        </div>
      </div>
    );
}

export default DiartEditor;
```

**new.js 수정**

```jsx
import DiartEditor from "../components/DiaryEditor";

const New = () => {
  return (
    <div>
      <DiartEditor />
    </div>
  );
};

export default New;
```

**App.css 수정**

```jsx
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

/* DiaryItem */
.DiaryItem {
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
}

.DiaryItem .emotion_img_wrapper {
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.DiaryItem .emotion_img_wrapper_1 {
  background-color: #64c964;
}

.DiaryItem .emotion_img_wrapper_2 {
  background-color: #9dd772;
}

.DiaryItem .emotion_img_wrapper_3 {
  background-color: #fdce17;
}

.DiaryItem .emotion_img_wrapper_4 {
  background-color: #fd8446;
}

.DiaryItem .emotion_img_wrapper_5 {
  background-color: #fd565f;
}

.DiaryItem .emotion_img_wrapper img {
  width: 50px;
}

.DiaryItem .info_wrapper {
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
}

.DiaryItem .diary_date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}

.DiaryItem .diary_content_preview {
  font-size: 18px;
}

.DiaryItem .btn_wrapper {
  min-height: 70px;
}

/* DiaryEditor */

.DiaryEditor section {
  margin-bottom: 40px;
}

.DiaryEditor h4 {
  font-size: 22px;
  font-weight: bold;
}

.DiaryEditor .input_date {
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
}
```

### 감정

**DiaryEditor 컴포넌트 변경**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

const getsStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiartEditor = () => {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getsStringDate(new Date()));

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiartEditor;
```

**EmotionItem 컴포넌트 생성**

```jsx
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
```

**App.css 변경**

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

/* DiaryItem */
.DiaryItem {
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
}

.DiaryItem .emotion_img_wrapper {
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.DiaryItem .emotion_img_wrapper_1 {
  background-color: #64c964;
}

.DiaryItem .emotion_img_wrapper_2 {
  background-color: #9dd772;
}

.DiaryItem .emotion_img_wrapper_3 {
  background-color: #fdce17;
}

.DiaryItem .emotion_img_wrapper_4 {
  background-color: #fd8446;
}

.DiaryItem .emotion_img_wrapper_5 {
  background-color: #fd565f;
}

.DiaryItem .emotion_img_wrapper img {
  width: 50px;
}

.DiaryItem .info_wrapper {
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
}

.DiaryItem .diary_date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}

.DiaryItem .diary_content_preview {
  font-size: 18px;
}

.DiaryItem .btn_wrapper {
  min-height: 70px;
}

/* DiaryEditor */

.DiaryEditor section {
  margin-bottom: 40px;
}

.DiaryEditor h4 {
  font-size: 22px;
  font-weight: bold;
}

.DiaryEditor .input_date {
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
}

.DiaryEditor .emotion_list_wrapper {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
}

/* EmotionItem */

.EmotionItem {
  cursor: pointer;

  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.EmotionItem img {
  width: 50%;
  margin-bottom: 10px;
}

.EmotionItem {
  font-size: 18px;
}

.EmotionItem-off {
  background-color: #ececec;
}

.EmotionItem_on_1 {
  background-color: #64c964;
  color: white;
}

.EmotionItem_on_2 {
  background-color: #9dd772;
  color: white;
}

.EmotionItem_on_3 {
  background-color: #fdce17;
  color: white;
}

.EmotionItem_on_4 {
  background-color: #fd8446;
  color: white;
}

.EmotionItem_on_5 {
  background-color: #fd565f;
  color: white;
}
```

### 일기

**DiaryEditor 컴포넌트 변경**

```jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];
const getsStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiartEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getsStringDate(new Date()));

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiartEditor;
```

**App.css 변경**

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

/* DiaryItem */
.DiaryItem {
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
}

.DiaryItem .emotion_img_wrapper {
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.DiaryItem .emotion_img_wrapper_1 {
  background-color: #64c964;
}

.DiaryItem .emotion_img_wrapper_2 {
  background-color: #9dd772;
}

.DiaryItem .emotion_img_wrapper_3 {
  background-color: #fdce17;
}

.DiaryItem .emotion_img_wrapper_4 {
  background-color: #fd8446;
}

.DiaryItem .emotion_img_wrapper_5 {
  background-color: #fd565f;
}

.DiaryItem .emotion_img_wrapper img {
  width: 50px;
}

.DiaryItem .info_wrapper {
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
}

.DiaryItem .diary_date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}

.DiaryItem .diary_content_preview {
  font-size: 18px;
}

.DiaryItem .btn_wrapper {
  min-height: 70px;
}

/* DiaryEditor */

.DiaryEditor section {
  margin-bottom: 40px;
}

.DiaryEditor h4 {
  font-size: 22px;
  font-weight: bold;
}

.DiaryEditor .input_date {
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
}

.DiaryEditor .emotion_list_wrapper {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
}

.DiaryEditor textarea {
  font-family: "Nanum Pen Script";
  font-size: 20px;

  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  resize: vertical;

  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding: 20px;
}

/* EmotionItem */

.EmotionItem {
  cursor: pointer;

  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.EmotionItem img {
  width: 50%;
  margin-bottom: 10px;
}

.EmotionItem {
  font-size: 18px;
}

.EmotionItem-off {
  background-color: #ececec;
}

.EmotionItem_on_1 {
  background-color: #64c964;
  color: white;
}

.EmotionItem_on_2 {
  background-color: #9dd772;
  color: white;
}

.EmotionItem_on_3 {
  background-color: #fdce17;
  color: white;
}

.EmotionItem_on_4 {
  background-color: #fd8446;
  color: white;
}

.EmotionItem_on_5 {
  background-color: #fd565f;
  color: white;
}
```

### 취소, 완료 버튼

**DiaryEditor 컴포넌트 변경**

```jsx
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryDispatchContext from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];
const getsStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiartEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getsStringDate(new Date()));

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length > 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiartEditor;
```

App.css 변경

```css
@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Pen Script", cursive;
  min-height: 100vh;
  margin: 0;
}

@media (min-width: 650px) {
  .App {
    width: 640px;
  }
}

@media (max-width: 650px) {
  .App {
    width: 90vw;
  }
}

#root {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.App {
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
}

/* MyButton */
.MyButton {
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
}

.MyButton_default {
  background-color: #ececec;
  color: black;
}

.MyButton_positive {
  background-color: #64c964;
  color: white;
}

.MyButton_negative {
  background-color: #fd565f;
  color: white;
}

/* HEADER */

header {
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
}

header > div {
  display: flex;
}

header .head_text {
  width: 50%;
  font-size: 25px;
  justify-content: center;
}

header .head_btn_left {
  width: 25%;
  justify-content: start;
}

header .head_btn_right {
  width: 25%;
  justify-content: end;
}

header button {
  font-family: "Nanum Pen Script";
}

/* DiaryList */

.DiaryList .menu_wrapper {
  margin-top: 20px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
}

.DiaryList .menu_wrapper .right_col {
  flex-grow: 1;
}

.DiaryList .menu_wrapper .right_col button {
  width: 100%;
}

.DiaryList .ControlMenu {
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
}

/* DiaryItem */
.DiaryItem {
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom: 1px solid #e2e2e2;

  display: flex;
  justify-content: space-between;
}

.DiaryItem .emotion_img_wrapper {
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.DiaryItem .emotion_img_wrapper_1 {
  background-color: #64c964;
}

.DiaryItem .emotion_img_wrapper_2 {
  background-color: #9dd772;
}

.DiaryItem .emotion_img_wrapper_3 {
  background-color: #fdce17;
}

.DiaryItem .emotion_img_wrapper_4 {
  background-color: #fd8446;
}

.DiaryItem .emotion_img_wrapper_5 {
  background-color: #fd565f;
}

.DiaryItem .emotion_img_wrapper img {
  width: 50px;
}

.DiaryItem .info_wrapper {
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
}

.DiaryItem .diary_date {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}

.DiaryItem .diary_content_preview {
  font-size: 18px;
}

.DiaryItem .btn_wrapper {
  min-height: 70px;
}

/* DiaryEditor */

.DiaryEditor section {
  margin-bottom: 40px;
}

.DiaryEditor h4 {
  font-size: 22px;
  font-weight: bold;
}

.DiaryEditor .input_date {
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
}

.DiaryEditor .emotion_list_wrapper {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
}

.DiaryEditor textarea {
  font-family: "Nanum Pen Script";
  font-size: 20px;

  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  resize: vertical;

  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding: 20px;
}

.DiaryEditor .control_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* EmotionItem */

.EmotionItem {
  cursor: pointer;

  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.EmotionItem img {
  width: 50%;
  margin-bottom: 10px;
}

.EmotionItem {
  font-size: 18px;
}

.EmotionItem-off {
  background-color: #ececec;
}

.EmotionItem_on_1 {
  background-color: #64c964;
  color: white;
}

.EmotionItem_on_2 {
  background-color: #9dd772;
  color: white;
}

.EmotionItem_on_3 {
  background-color: #fdce17;
  color: white;
}

.EmotionItem_on_4 {
  background-color: #fd8446;
  color: white;
}

.EmotionItem_on_5 {
  background-color: #fd565f;
  color: white;
}
```

## 페이지 구현 : 일기 수정 (/edit)

**App.js 수정**

```jsx
import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.date;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1699360513774,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1699360513775,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1699360513776,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1699360513777,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1699360513778,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
```

**Edit.js 수정**

```jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiartEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiartEditor isedit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
```

**DiaryEditor 컴포넌트 수정**

```jsx
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 저장하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
				rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

## 페이지 구현 : 일기 상세 (/diary)

### 헤더

**Diary.js 변경**

```jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";

import MyButton from "../components/MyButton.js";
import MyHeader from "../components/MyHeader.js";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
      </div>
    );
  }
};

export default Diary;
```

**util/date.js 생성 : 중복되는 코드를 따로 저장하여 활용**

```jsx
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
```

### 감정

**DiaryEditor.js의 emotion_list를 별도의 파일로 만듦 : /util/emotion.js**

```jsx
export const emotionList = [
    {
      emotion_id: 1,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
      emotion_descript: "완전 좋음",
    },
    {
      emotion_id: 2,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
      emotion_descript: "좋음",
    },
    {
      emotion_id: 3,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
      emotion_descript: "그럭저럭",
    },
    {
      emotion_id: 4,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
      emotion_descript: "나쁨",
    },
    {
      emotion_id: 5,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
      emotion_descript: "끔찍함",
    },
  ];
```

**Diary.js 변경**

```jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

import MyButton from "../components/MyButton.js";
import MyHeader from "../components/MyHeader.js";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
```

**App.css 변경**

```css
...

/* Diary */

.DiaryPage section{
  width: 100%;
  margin-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.DiaryPage h4 {
  font-size: 22px;
  font-weight: bold;
}

.DiaryPage .diary_img_wrapper {
  background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.DiaryPage .emotion_descript {
  font-size: 25px;
}

.DiaryPage .diary_img_wrapper_1 {
  background-color: #64c964;
  color: white;
}

.DiaryPage .diary_img_wrapper_2 {
  background-color: #9dd772;
  color: white;
}

.DiaryPage .diary_img_wrapper_3 {
  background-color: #fdce17;
  color: white;
}

.DiaryPage .diary_img_wrapper_4 {
  background-color: #fd8446;
  color: white;
}

.DiaryPage .diary_img_wrapper_5 {
  background-color: #fd565f;
  color: white;
}
```

### 일기

**Diray.js 변경**

```jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

import MyButton from "../components/MyButton.js";
import MyHeader from "../components/MyHeader.js";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
```

**App.css 변경**

```css
...

.DiaryPage .diray_content_wrapper {
  width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.DiaryPage .diray_content_wrapper p {
  padding: 20px;
  text-align: left;
  font-size: 20px;
  font-family: "Yeon Sung";
  font-weight: 400;
  line-height: 2.5;
}
```

## (서브 챕터) 흔히 발생하는 버그 수정하기

### DiaryItem의 key 중복

```jsx
Warning: Encountered two children with the same key, `1`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
    at div
    at DiaryList (http://localhost:3000/static/js/bundle.js:724:3)
    at div
    at Home (http://localhost:3000/static/js/bundle.js:1506:70)
    at RenderedRoute (http://localhost:3000/static/js/bundle.js:40154:5)
    at Routes (http://localhost:3000/static/js/bundle.js:40776:5)
    at div
    at Router (http://localhost:3000/static/js/bundle.js:40714:15)
    at BrowserRouter (http://localhost:3000/static/js/bundle.js:38774:5)
    at App (http://localhost:3000/static/js/bundle.js:102:77)
```

dummyData를 key 1 ~ 5까지 넣었는데 `const dataId = useRef(0);`로 초기값을 0으로 설정했기 때문에 발생 

### Home.js에서 lastday 설정

```jsx
const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23, // 시
        59, // 분
        59  // 초 까지 추가하여 정확하게 설정
      ).getTime();
```

## LocalStorage를 일기 데이터베이스로 사용하기

### State는 휘발성 메모리

자바스크립트의 기능을 활용해서 React의 State의 값을 추가적으로 저장해도 결론적으로 자바스크립트는 client side 즉, 웹 브라우저에서 동작하는 데이터이기 때문에 새로 고침을 누르면 사라짐 ⇒ 데이터베이스 사용

**Web Storage APl**

[Web Storage API - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API)

### LocalStorage

아래와 같이 저장 가능

```jsx
useEffect(() => {
    localStorage.setItem("item1", 10);
    localStorage.setItem("item2", "20");
    localStorage.setItem("item3", JSON.stringify({ value : 30}));
  }, []);
```

개발자도구 - Application - Storage - Local Storage에서 확인 가능

객체의 경우 `JSON.stringify`를 통해 문자열 형태로 바꿔서 저장해야 함

로컬 스토리지에 들어간 값은 (일부러 지우지 않는 한) 코드를 지우더라도 지워지지 않음

로컬 스토리지에 들어간 값은 문자열로 바뀌어서 들어감

```jsx
useEffect(() => {
    const item1 = localStorage.getItem("item1");
    const item2 = localStorage.getItem("item2");
    const item3 = localStorage.getItem("item3");
    console.log({item1, item2, item3})
  }, []);

// 결과 : {item1: '10', item2: '20', item3: '{"value":30}'}
```

### LocalStorage를 일기 데이터베이스로 사용

**App.js 변경**

```jsx
import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.date;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localDate = localStorage.getItem("diary");
    if (localDate) {
      const diaryList = JSON.parse(localDate).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
```

## 프로젝트 최적화

### 정적 분석과 동적 분석

**정적 분석**

코드를 보면서 최적화가 안 된 부분을 파악

**동적 분석**

도구를 활용

: React developer tools - Components - Highlight updates when components render

### Home에서 날짜가 바뀔 때 필터, 새 일기쓰기 버튼이 함께 리렌더링

왼쪽, 오른쪽 버튼을 누르면 Home 컴포넌트의 State가 변경되어서 리렌더링

필터, 버튼을 가지고 있는 DiaryList 컴포넌트(Home 컴포넌트의 자식 요소) 리렌더링

필터를 가지고 있는 ControlMenu 컴포넌트(DiaryList 컴포넌트의 자식 요소) 리렌더링

**DiaryList.js 변경**

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

// useState에서 반환 받은 상태변화 함수는 렌더링이 일어나도 동일한 id를 보장 
// : 기본적으로 useCallback처리가 되어서 나온다고 생각하면 됨
// => ControlMenu에 onChange(이 코드에서는 상태 변화 함수만 받고 있음)가 있는데도 
//    따로 처리를 해 줄 필요가 없음
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter(filterCallBack);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />

          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
```

### 필터를 바꾸면 DiaryItem 전체가 리렌더링 : 심지어 변할게 없더라도

DiaryItem 컴포넌트(DiaryList 컴포넌트의 자식)

: DiaryList 컴포넌트에서 필터 값을 변경해주면 DiaryList가 관리하는 State가 바뀌기 때문에 업데이트 발생, 자식 컴포넌트인 DiaryItem 컴포넌트도 리렌더링 

**DiaryItem.js 변경**

```jsx
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text="수정하기" />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
```

### 일기를 수정하면 감정도 리렌더링

오늘의 일기를 수정하면 DiaryEditor 컴포넌트의 Content State가 변경

⇒ DiaryEditor 컴포넌트의 자식 컴포넌트인 EmotionItem도 리렌더링

EmotionItem이 전달 받는 요소에는 함수도 있기 때문에 (onClick) 컴포넌트 렌더링 될 때 다시 생성되서 React.memo에 담아둔 EmotionItem에도 렌더링을 발생시킴

*상태 변화 함수나 useCallback으로 묶어둔 함수를 전달하면 괜찮음 

**EmotionItem.js 변경**

```jsx
import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
```

**DiaryEditor.jd 변경**

```jsx
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 저장하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
```

## 배포 준비 & 프로젝트 빌드하기

### 타이틀, decription, language 변경

/public/index.html에서 아래와 같이 변경

```html
<meta
    name="description"
    content="나만의 감정 일기장"
/>

<title>감정 일기장</title>

<html lang="ko">
```

### 페이지마다 타이틀 변경

**Diary.js 페이지**

```jsx
useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  });
```

### 아이콘 변경

/public에 favicon.ico 파일 추가

### 용량 줄이기(bulid)

우리가 만든 react 어플리케이션을 압축된 형태로 배포할 수 있게 해줌

`npm run build`로 실행, 폴더의 맨 위에 build 파일 생성

### 배포하기

`npm insall -g serve`로 빌드된 파일을 배포해줄 수 있는 기능을 갖는 serve 명령어 설치

serve -s build를 입력해서 배포

## Firebase로 프로젝트 배포하기

## Open Graph 설정하기
