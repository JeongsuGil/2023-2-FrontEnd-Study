Week8
---

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
