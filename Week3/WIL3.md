# local storage 연결

setItem(key, value)	키(key)와 값(value)을 기반으로 저장합니다.
getItem(key)	키(key) 값을 기반으로 값(value)을 불러옵니다.
key(index)	인덱스(index) 값을 기반으로 값(value)을 불러옵니다.
removeItem(key)	키(key) 값을 기반으로 해당 로컬 스토리지를 제거합니다.
clear()	로컬 스토리지들을 초기화 합니다.
length	로컬 스토리지에 저장된 데이터 개수를 반환 받습니다.

# for each

각 배열 요소에 대해 제공된 함수를 한 번씩 실행합니다.

```jsx
const ratings = [5, 4, 5];
let sum = 0;
const sumFunction = async (a, b) => a + b;
ratings.forEach(async (rating) => {
sum = await sumFunction(sum, rating);
});
console.log(sum);
// 순진하게 예상한 출력: 14
// 실제 출력: 0
```
