# Week5

---

# 1. JavaScript 기본

## Hello World

```jsx
console.log(문자열);
console.log(변수이름);
console.log(상수이);
```

## 변수와 상수

```jsx
let 변수이름 = 변수값; // 변수의 중복 선언 금지
var 변수이름 = 변수값; // 변수의 중복 선언 가능
const 상수이름 = 상수깂; // 상수 : 선언 이후에 값 변경 불가
```

- 이름 규칙
    - _와 $를 제외한 기호 사용 불가
    - 문자로 시작
    - 예약어는 사용 불가

## 자료형과 형 변환

### • 자료형

```jsx
// Number : 정수와 실수를 구분하지 않음 
let 변수이름 = 숫자; // Infinity, -Infinity, NaN의 값도 가능

// String : 백틱을 사용하면 ${}(= 탬플릿 리터럴) 사용 가능
let 변수이름 = "문자열" or '문자열', `문자열`;

// Boolean : 참거짓
let 변수이름 = true or false;

// Undefined : 아무것도 할당하지 않았을 때 자동으로 할당
let 변수이름;
console.log(변수이름); // Undefined

// Null : 의도적으로 아무것도 저장하지 않음을 의도적으로 표현
let 변수이름 = Null;
```

- Primitive Data Type 원시 타입
    
    한 번에 하나의 값만 가질 수 있음, 하나의 고정된 저장 공간 이용
    
    - Number
    - String
    - Boolean
    - Undefined
    - Null
    
- Non-Primitive Data Type 비 원시 타입
    
    한 번에 여러 개의 값을 가질 수 있음, 여러 개의 고정되지 않음 동적 공간 사용
    
    - Object
    - Array
    - Funciton
    

### • 형 변환

```jsx
let numberA = 12;
let numberB = "2";

// 묵시적 형 변환
console.log(numberA * numberB); // 24 : B는 String -> Number 
console.log(numberA + numberB); // 122 : A는 Number -> String

// 명시적 형 변환
console.log(numberA + parseInt(numberB)); // 24 : B는 String -> Number
```

## 연산자

```jsx
// 대입 연산자 =
let a = 1;
let b = 2;
let c = "1";
let d = "2";

// 산술 연산자 + - * / %
console.log(a + b); // 3
console.log(a - b); // -1
console.log(a * b); // 2
console.log(a / b); // 0.5
console.log(a % b); // 1

// 연결 연산자 +
// Number와 String 연결하면 묵시적 형 변환에 의해 Number -> String이 됨을 주의
console.log(c + d); // "12"

// 복합 연산자 += -= *= /=
a += 10; // 11, a = a + 10;과 동일

// 증감 연산자 ++ --
// 숫자에만 사용 가능
console.log(a++); // 후위 연산 : 1
console.log(++a); // 전위 연산 : 2

// 논리 연산자 ! && ||
console.log(!true); // false : NOT
console.log(true && false); // false : ANR
console.log(true && false); // true : OR

// 비교 연산자 == === != !== > < >= <=
let compare = 1 = "1"; // 값만 비교 : true
let compare = 1 == "1"; // 값과 타입 비교 : false

// typeof 변수이름
console.log(typeof a); // Number
console.log(typeof c); // String

// 널 병합 연산자 ?? : 양쪽 피연산자 중 Null이나 Undefined이 아닌 값을 선택
let test;
test = test ?? 10; // test = 10
```

## 조건문

```jsx
let a = 5;

// if..  (else if ...) else ..
if(a >= 7){
	console.log("7 이상");
} else if (a >= 5) {
	console.log("5 이상");
} else if (a >= 3) {
	console.log("3 이상");
} else {
	console.log("2 이하");
}

// switch : 적절히 break를 사용하는 것이 중요
let country = "ko";

switch(country){
	case = "ko":
		console.log("한국");
		break;
	case = "cn":
		console.log("중국");
		break;
	case = "jp":
		console.log("일");
		break;
	default:
		console.log("미분류");
}
```

## 함수

```jsx
let count = 1; // 전역 변수 : 어디에서나 접근 가

// 함수 선언식 : function 함수이름(매개변수1, 매개변수2, ...) { ... }
function getArea(width, height){
	let area = width * height; // 지역 변수 : 함수 외부에서 접근 불가
	return area;
}

// 함수 호출
let result = getArea(10, 20); // 200
console.log("area : ", result); // area : 200
console.log(area); // error
```

## 함수 표현식, 화살표 함수

```jsx
console.log(helloB()); // 호이스팅 O
console.log(helloA()); // 호이스팅 X : error

// 함수 표현식 : 변수에 함수를 담아 활용, 이때 변수의 이름을 함수에 이름처럼 사용
let helloA = function () {
	return "안녕하세요";
}

const helloText = hello();
console.log(helloText) // "안녕하세요"

// 함수 선언식
function helloB() {
	return "안녕하세요";
}

// 화살표 함수 : 무명 함수를 간결하게 작성할 수 있도록 함, 호이스팅 X
let helloA = () => {
	return "안녕하세요";
}
let helloA = () => "안녕하세요";
```

## 콜백 함수

```jsx
// 콜백 함수 : 함수의 매개 변수(parameter)로 함수를 넘김
function checkMood (mood, goodCallBack, sadCallBack)
	if(mood === "good") {
		goodCallBack();
	} else {
		sadCallBack();
	}
}

function cry() {
	console.log("Action : cry");
}

function sing() {
	console.log("Action : sing");
}

checkMood("good", sing, cry); 
```

## 객체

```jsx
// 1. 객체 생성자 방식
let person = new Object();

// 2. 객체 리터럴 방식 : 중괄호 내에 key: value 방식으로 저장
let person = {
	key1: "value1", // 객체 프로퍼티 : 어떤 자료형도 상관 없음
	key2: "value2",
	key3: 123,
	name: "길정수",
	say: function () {
		console.log(`안녕 나는 ${this["name"]}`);
	}, // 객체 내부에 함수도 저장 가능 : 메서드, this는 자기자신 객체를 가리킴
};

// 점 표기법 : key를 통해 value에 접근
console.log(person.key1); // "value1"

// 대괄호 표기법 : 대괄호 내에 반드시 문자열 형태로 key 값을 넣어야  
console.log(person["key3"]); // 123

/*
	const로 객체를 선언해도 프로퍼티를 추가, 수정, 삭제하는데는 지장이 없음
	person = { }의 형태로 새롭게 대입하는 것만 문제가 됨
*/

// 객체 프로퍼티 추가
person.name = "홍길동";
person["age"] = 22;

// 객체 프로퍼티 수정
person.key1 = "new value1";
person["key3"] = 456;

// 객체 프로퍼티 삭제
// delete : 프로퍼티 이름과 프로퍼티 값의 관계를 끊을 뿐 메모리에서 지우진 않음
delete person.key1;
delete person["key3"];

// null로 변경 : 기존에 가지고 있던 값을 메모리에서 지울 수 있음
person.key1 = null;

// 객체 프로퍼티의 존재 여부 확인 : in 연산자
console.log(`name : ${"name" in person}`); // name : true
console.log(`gender: ${"gender" in person}`); // gender: false
```

## 배열

```jsx
// 1. 배열 생성자 방식
let arr = new Array();

// 2. 배열 리터럴 방식
let arr = [1, 2, 3, 4, 5]; // 어떤 자료형도 상관 없음
console.log(arr[0]); // 0

// 값 추가
arr.push(6); // 배열의 제일 마지막에 추가

// 배열의 길이
console.log(arr.length);
```

## 반복문

```jsx
for (let i = 1; i <= 100; i++) {
	console.log("안녕");
}

// 주로 배열과 함께 사용
const arr = [1, 2, 3];
for (let i = 1; i <= arr.length; i++) {
	console.log(arr[i]);
}

// for 반문과 객체를 함께 사용
let person = {
	name: "홍길동",
	age: 22,
	tall: 180,
};

const personKeys = Object.keys(person); // 객체의 프로퍼티 이름으로 이루어진 배열
const personValues = Object.values(person); // 객체의 프로퍼티 값으로 이루어진 배열

// 객체 프로퍼티 값을 모두 출
for (let i = 1; i <= personValues .length; i++) {
	console.log(personValues [i]);
}
```

## 배열 내장 함수

```jsx
const arr1 = [1, 2, 3, 4];
let number = 3;
// 1. 배열 순회
arr1.forEach(e) => console.log(e);

// 2. 배열의 모든 요소를 순회하면 어떤 연산을 수행, 이 값을 추려 새로운 배열 형성
const newArr = arr1.map((e) => {
	return e * 2;
});

// 3. 배열 내 값 존재 여부 확인 : === 연산
console.log(arr1.includes(number)); // true

// 4. 배열 내 값 존재 여부 확인하고 index 출력 : 없으면 -1 출력
console.log(arr1.indexOd(number)); // 2

// 5. 객체가 포함된 배열에서 값 찾고 index를 반환
// 일치하는 값이 여러 개 있을 경우 가장 첫 번째 index를 반환
const arr2 = [
	{ color: "red"},
	{ color: "black"},
	{ color: "blue"},
	{ color: "green"}
];

console.log(arr2.findIndex((e) => e.color === "red")); // 0

// 6. 조건에 일치하는 요소를 가져옴
console.log(arr2.find((e) => e.color === "red")); // color : "red"

// 7. 배열을 필터링
const arr3 = [
	{ num: 1, color: "red"},
	{ num: 2, color: "black"},
	{ num: 3, color: "blue"},
	{ num: 4, color: "green"},
	{ num: 5, color: "blue"}
];

console.log(arr3.filter((e) => e.color === "blue")); // 만족하는 모든 요소를 배열로 반환

// 8. index를 기준으로 배열을 자름
console.log(arr3.slice(0, 2)); // 0 ~ 1번 index만 새로운 배열로 반환

// 9. 배열을 붙임
const arr4 = [
	{ num: 1, color: "red"},
	{ num: 2, color: "black"},
	{ num: 3, color: "blue"}
];

const arr5 = [
	{ num: 4, color: "green"},
	{ num: 5, color: "blue"}
];

console.log(arr4.concat(arr5)); // arr4에 arr5를 붙임

// 10. 배열을 정렬
const chars = ["나", "다", "가"];
chars.sort(); // chars = ["가", "나", "다"]

const numbers = [15, 0, 5, 8, 2, 30];
numbers.sort(); // numbers = [0, 15, 2, 30, 5, 8] : sort는 문자열 기준 사전 순서대로 정렬

const compare = (a, b) => {
	if(a > b){
		return 1; // a가 b보다 뒤에 있어야 한다.
	}
	if(a < b){
		return -1; // a가 b보다 앞앞에 있어야 한다.
	}
	return 0; // 그대로 둔다.
}
numbers.sort(compare); // numbers = [0, 2, 5, 8, 15, 30]

// 11. 배열 내의 모든 요소를 문자열 형태로 합침
const hello = ["홍길동", "님", "안녕하세요"];
console.log(hello.join()); // 홍길동,님,안녕하세요
console.log(hello.join(" ")); // 홍길동 님 안녕하세요
```

# 2. JavaScript 응용

## Truthy & Falsy

```jsx
let a = [] or {} or 숫자 or 문자열 or Infinity; // truthy
let a = null or undefined or 0 or -0 or NaN or 빈문자열 // falsy

if(a) {
	console.log("true"); // truthy
} else {
	console.log("false"); // falsy
}

// falsy를 예외 처리 시에 사용 가능
const getName = (person) => {
	if(!person) {
		return "객체가 아닙니다.";
	}
	return person.name;
};

let person;
const name = getName(person);
console.log(name);
```

## 삼항 연산자

```jsx
// 양수 음수 구분
let a = 3;
a >= 0 ? console.log("양수") : console.log("음수"); // 양수

// 빈 배열인지 구분
let arr = [];
arr.length === 0 ? console.log("empty") : console.log("not empty"); // empty
const result = arr.length === 0 ? "empty" : "not empty"; // result = empty

// truthy falsy 구분
let a;
const result = a ? true : false; // result = false

// 3항 연산자 중복 : 가독성이 떨어지므로 if 조건문을 쓰는게 나음
// 90 이상 A+, 50 이상 B+ 나머지는 F
let score = 100;
score >= 90
	? console.log("A+")
	: scroe >= 50
	? console.log("B+")
	: console.log("F")
```

## 단락 회로 평가

```jsx
// 왼쪽 -> 오른쪽로 연산하는 논리 연산자의 특성을 이용
// 연산자 앞만 보고 뒤에는 볼 필요도 없이 연산을 끝내는 
console.log(false && true); // 앞이 false이면 false
console.log(true || false); // 앞이 true이면 true
console.log(!true);

// 단락 회로 평가를 이용하면 더욱 간단하게 예외 처리 가능
const getName = (person) => {
/*	if(!person) {
		return "객체가 아닙니다.";
	}
	return person.name;
*/
	const name = person && person.name; // person이 falsy이면 거기서 종
	return name || "객체가 아닙니다."; // name이 falsy이면 "객체가 아닙니다." 출력
};

let person;
const name = getName(person);
console.log(name);
```

## 조건문 업그레이드

```jsx
// 주어진 문자열이 한식 종류에 해당하는지 확인하는 함수
// 여러 케이스 중 하나인지를 확인할 때 배열의 내장함수 includes 활용
function isKoreanFood(food) {
	if(["불고기", "떡볶이", "비빔밥"].includes(fooc)) {
		return true;
	}
	return false;
}

// 주어진 값에 따라 각각 다른 값을 반환하는 함수
// 객체의 괄호 표기법, 단락 회로 평가를 활용
const meal = {
	한식: "불고기",
	중식: "멘보샤",
	일식: "초밥",
	양식: "스테이크",
	인도식: "카레"
};
const getMeal = (mealType) => {
	return meal[mealType] || "굶기";	
}
```

## 비 구조화 할당

```jsx
// 배열의 비 구조화 할
let arr = ["one", "two", "three"];

// 배열의 기본 변수 비 구조화 할당
let [one, two, three] = arr;

// 배열의 선언 분리 비 구조화 할당
let [one, two, three] = ["one", "two", "three"];
let [one, two, three, four] = ["one", "two", "three"]; // four = undefined
let [one, two, three, four="four"] = ["one", "two", "three"]; // four = four로 기본값 할당

// 배열의 비 구조화 할당 swap에 활용
let a = 1;
let b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

```jsx
// 객체의 비 구조화 할당
let object = { one: "one", two: "two", three: "three"}

// 키 값을 기준으로 할당
let { one, two, three } = object;
let { one: newone, two, three } = object; // 새로운 키 값 이름 설정 가능 one -> newone
```

## Spread 연산자

```jsx
// 객체의 중복되는 요소를 복사할 떄 사용
const cookie = {
	base: "cookie",
	madeIn: "korean"
};

const chocochipCookie = { // cookie 객체의 값을 복사
	... cookie
	topping: "chocochip"
};

const berryCookie = {
	... cookie
	topping: "berry"
};

// 배열에서도 사용 가능
const NoToppingCookies = ["촉촉한 쿠키", "안촉촉한 쿠키"];
const toppingCookies = ["블루베리쿠키", "바나나쿠키", "딸기쿠키", "초코칩쿠키"];

// 배열 내장 함수 concat을 써도 두 배열을 합칠 수는 있지만
// concat과 달리 중간에 새로운 값을 추가할 수 있다는 점이 강점
const allCookies = [...NoToppingCookies, "함정쿠키", ...toppingCookies]; 
```

## 동기 & 비동기

### 싱글 스레드

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a21c0c34-6714-4fb1-ab66-1b882c8d7b9d/Untitled.png)

자바스크립트는 코드가 작성된 순서대로 작업을 처리함

이전 작업이 진행 중일 때는 다음 작업을 수행하지 않고 기다림

먼저 작성된 코드를 먼저 다 실행하고 나서 뒤에 작성된 코드를 실행함

⇒ **동기 방식(블로킹 방식)**

**단점**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/aaa55009-19d3-4ab3-ae51-2ef3367dadf4/Untitled.png)

하나의 작업이 너무 오래 걸리게 되면 모든 작업이 오래 걸리는 하나의 작업이 종료되기 전까지 모두 멈추게 되기 때문에 전반적인 흐름이 느려진다는 것임

### 멀티 스레드와 비동기 작업

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/0b83298f-9632-47c2-bfd3-54453041f355/Untitled.png)

코드를 실행하는 일꾼 thread를 여러 개 사용하는 방식인 MultiThread 방식으로 작동시키면 작업 분할 가능, 오래 걸리는 일이 있어도 다른 Thread에 지시하면 되므로 괜찮음

⇒ 그러나 자바스크립트는 싱글 스레드로 동작함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/db29986b-0fc0-408a-851a-05cad4693b81/Untitled.png)

싱글 스레드 방식을 이용하면서 동기적 작업의 단점을 극복 : 여러 개의 작업을 동시에 실행

⇒ 즉, 먼저 작성된 코드의 결과를 기다리지 않고 다음 코드를 바로 실행

⇒ **비동기 작업(논블로킹 작업)**

비동기 작업의 경우 콜백 함수를 붙여 실행이 끝났음을 표현

```jsx
// 비동기 작업 예시 1
function taskA(a, b, cb) {
	setTimeout(() => {
		const res = a + b;
		cb(res);
	}, 3000);
}

function taskB(a, cb) {
	setTimeout(() => {
		const res = a * 2;
		cb(res);
	}, 1000);
}

function taskC(a, cb) {
	setTimeout(() => {
		const res = a * -1;
		cb(res);
	}, 2000);
}

taskA(3, 4, (res) => {
	console.log("A RESULT : ", res);
});

taskB(7, (res) => {
	console.log("B RESULT : ", res);
});

taskC(14, (res) => {
	console.log("C RESULT : ", res);
});

console.log("끝");

// 끝 -> B -> C -> A 순으로 출력
```

### JS Engine은 동기, 비동기를 어떻게 행하는가

Heap : 변수나 상수 등이 사용되는 메모리를 저장하는 영역

Call Stack : 코드의 실행에 따라 호출 스택을 쌓는 영역

**동기 처리**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/922cff53-3d8a-4314-9006-8b98403f25c9/Untitled.png)

먼저 실행된 함수가 콜 스택의 아래에 위치

제일 위쪽 함수(가장 나중에 실행된 함수)부터 out됨

Main Context가 out되면 프로그램이 종료

JS는 Call Stack이 하나 있기 때문에 싱글 스레드 방식

**비동기 처리**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/50fdc468-5a02-4bf5-9a75-d187b08bd67b/Untitled.png)

비동기 함수인 setTimeout()은 Call Stack이 아닌 Web APIs에 들어감

⇒ asyncAdd()가 먼저 실행될 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/ead252c0-7252-453b-8e8f-1f7db41778eb/Untitled.png)

비동기 함수의 기다림이 끝나면

⇒ cb()는 Callback Queue에 들어가고 Event Loop를 통해 Call Stack으로 돌아올 수 있음

```jsx
// 비동기 작업 예시 2 : 콜백 지옥
function taskA(a, b, cb) {
	setTimeout(() => {
		const res = a + b;
		cb(res);
	}, 3000);
}

function taskB(a, cb) {
	setTimeout(() => {
		const res = a * 2;
		cb(res);
	}, 1000);
}

function taskC(a, cb) {
	setTimeout(() => {
		const res = a * -1;
		cb(res);
	}, 2000);
}

taskA(3, 4, (a_res) => {
	console.log("A RESULT : ", a_res);
	taskB(a_res, (b_res) => {
		console.log("B RESULT : ", b_res);
		taskC(b_res, (c_res) => {
			console.log("C RESULT : ", c_res);
		});
	});
});

console.log("끝");

// 끝 -> A -> B -> C 순으로 출력

/* 
<콜백 지옥>
비동기 처리의 결과를 또다른 비동기 처리의 값으로 전달하는 것이 반복되며 
콜백 함수가 안쪽으로 계속 파고 드는 것 => Promise 객체로 해결
*/
```

## Promise - 콜백 지옥에서 탈출하기

### Promise 객체 사용한 비동기 처리

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/82c3ffaa-4db5-41b7-a130-8839f2b97213/Untitled.png)

**비동기 작업이 가질 수 있는 3가지 상태**

- Pending 대기 상태
    
    현재 비동기 작업이 진행 중이거나 비동기 작업을 시작할 수도 없는 문제가 발생했음
    
- Fulfilled 성공
    
    비동기 작업이 의도한 대로 정상적으로 완료된 상태
    
- Rejected 실패
    
    비동기 작업이 모종의 이유로 실패했음
    
    ex) 서버가 응답을 하지 않음, 시간이 너무 오래 걸려 자동으로 취소
    

```jsx
// 콜백을 이용해 비동기 처리
function isPositive(number, resolve, reject){
	setTimeout(() => {
		if(typeof number === 'number'){
			// 성공 resolve
			resolve(number >= 0 ? "양수" : "음수")
		} else {
			// 실패 reject
			reject("숫자를 입력하세요.");
		}
	}, 2000);
}

isPositive(10, (res) => {
	console.log("성공 : ", res);
}, (err) => {
	console.log("실패 : ", err);
});

// Promise를 활용해서 비동기 처리
function isPositive(number){
	const executor = (resolve, reject) => // 비동기 함수의 실질적인 실행자
		setTimeout(() => {
			if(typeof number === 'number'){
				// 성공 resolve
				console.log(number);
				resolve(number >= 0 ? "양수" : "음수")
			} else {
				// 실패 reject
				reject("숫자를 입력하세요.");
			}
		}, 2000);
	};

	const asyncTask = new Promise(executeor); // executeor 함수가 바로 실행됨
	return asyncTask;
}

const res = isPositive(101);

res
	.then((res) => {
		console.log("성공 : ", res); // resolve를 실행했을 때의 결과값을 받아 출력
	}
	.catch((err) => {
		console.log("실패 : ", err); // reject를 실행했을 때의 결과값을 받아 출력
});
```

### Promise 객체를 사용해 콜백 지옥 탈출하기

```jsx
// 콜백 지옥 예시
function taskA(a, b, cb) {
	setTimeout(() => {
		const res = a + b;
		cb(res);
	}, 3000);
}

function taskB(a, cb) {
	setTimeout(() => {
		const res = a * 2;
		cb(res);
	}, 1000);
}

function taskC(a, cb) {
	setTimeout(() => {
		const res = a * -1;
		cb(res);
	}, 2000);
}

taskA(3, 4, (a_res) => {
	console.log("A RESULT : ", a_res);
	taskB(a_res, (b_res) => {
		console.log("B RESULT : ", b_res);
		taskC(b_res, (c_res) => {
			console.log("C RESULT : ", c_res);
		});
	});
});

console.log("끝");

// 끝 -> A -> B -> C 순으로 출력
```

```jsx
// Promise로 콜백 지옥 탈출하기
function taskA(a, b) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const res = a + b;
			resolve(res);
		}, 3000);
	});
}

function taskB(a) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const res = a * 2;
			resolve(res);
		}, 1000);
	});
}

function taskC(a) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const res = a * -1;
			resolve(res);
		}, 2000);
	});
}

const bPromiseResult = task(3, 4)
.then((a_res) => {
	console.log("A RESULT : ", a_res);
	return taskB(a_res);
})

// 다른 코드 넣기 가능

bPromiseResult
.then((b_res) => {
	console.log("B RESULT : ", b_res);
	return taskC(b_res);
})
.then((c_res) => {
	console.log("C RESULT : ", c_res);
});

console.log("끝");

// 끝 -> A -> B -> C 순으로 출력
```

## async & await - 직관적 비동기 처리 코드 작성하기

```jsx
// async

function hello() {
	return 'hello';
}

async function helloAsync() { // async를 붙이면 promise를 반환하는 비동기 처리 함수가 됨
	return 'hello Async';
}

hello(); // hello
helloAsync(); // Promise {<pending>}

helloAsync().then((res) => {
	console.log(res);
}); // hello Async
```

```jsx
// async만 이용한 경우
function delay(ms) {
	return new Promise((resolve) => {
		setTime(resolve, ms);
	});
}

async function helloAsync() {
	return delay(3000).then(() => {
		return 'hello Async';
	}); 
}

helloAsync().then((res) => {
	console.log(res);
}); // hello Async

/*
<await을 이용한 경우>
	await이 붙은 코드는 마치 동기 함수처럼 수행
	async가 붙은 함수 안에서만 사용 가능
*/ 
function delay(ms) {
	return new Promise((resolve) => {
		setTime(resolve, ms);
	});
}

async function helloAsync() {
	await delay(3000); // 이 코드가 끝날 때까지 다음 코드를 실행하지 않음
	return 'hello Async';
}

async function main() {
	const res = await helloAsync();
	console.log(res);
}

main();
```

 

## API 호출하기

### API (Application Programming Interface)

응용 프로그램 프로그래밍 인터페이스

응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻한다. 주로 파일 제어, 창 제어, 화상 처리, 문자 제어 등을 위한 인터페이스를 제공한다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/e75a722c-f18d-4b78-b087-ef26965c7ac0/Untitled.png)

### API 호출

Open API 사이트

[JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

```jsx
// fetch : promise 반환
// fetch로 API 호출 : API 성공 객체 자체를 반환(raw)
async function getData() {
	let rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
	let jsonResponse = await rawResponse.json();
	console.log(jsonResponse);
	);
}
```

# 3. Node.js 기초

## Node.js란?

### Node.js의 등장 이유

브라우저에 내장된 js 엔진을 사용해야 하기 때문에 js는 웹 브라우저에서만 실행 가능

브라우저는 HTML 문서를 기반으로 실행되기 때문에 js는 HTML 문서 안에서 사용

⇒ 편하고 좋은 js라는 언어를 브라우저 안에서만 쓰기 아깝다

⇒ 크롬의 V8 엔진(C++)을 브라우저에서 분리해 js를 어디에서나 쓸 수 있게 하자  : Node.js

### Node.js

자바스크립트의 실행 환경 = Javascript’s Runtime

브라우저 없이도 js를 실행할 수 있게 됨

서버 구현할 수 있게 됨

### 웹 서버

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/1fe9a534-bf8d-4ca7-b0c7-328ac852e8fb/Untitled.png)

### 리엑트

브라우저에서 동작하는 복잡하고 여러가지 기능을 가진 js 파일을 쉽게 만들어 내는 기능

리엑트를 통해 만들어낸 js 파일은 여러 가지의 복잡하지만 좋은 기능을 가지고 있기 때문에 웹 브라우저에 전달되어 고전적인 웹 사이트가 아니라 프로그램처럼 돌아감 

⇒ 웹 어플리케이션, 리엑트 어플리케이션

Node.js를 기반으로 사용할 수 있는 기술 ⇒ Node.js에 대해 알아야 함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/295ab505-c5e4-43a4-a95b-4d0915a5d3fb/Untitled.png)

## Node.js Hello World & Common JS

### Hello World

js 파일을 생성하고 VS code의 터미널에 `node 파일경로`를 입력하면 Node.js로 js 파일을 실행

```jsx
// hello.js
console.log("Hello Node.js");
```

### Common JS 모듈 시스템

`module.exports = { 객체 }`로 내보내고, `require( 경로 )`로 불러오는 모듈 시스템

Node.js가 기본적으로 제공

```jsx
// calc.js : 계산기

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

// 다른 파일에서 사용할 수 있도록 module을 형성하여 내보냄
module.exports = {
    moduleName: "calc module",
    add: add,
    sub: sub,
};
```

```jsx
// index.js
// require 키워드에 경로를 명시해서 calc module을 불러옴
const calc = require("./calc");

console.log(calc.add(1, 3));
console.log(calc.sub(8, 2));
```

## Node.js 패키지 생성 및 외부 패키지 사용하기

### npm

Node Package Manager : Node.js의 패키지 관리 도구

*Pakage : 누군가 만들어 놓은 Node.js 모듈

### Pakage 생성 및 외부 Pakage 사용

터미널에 npm init : name, version, … 등 설정 → Pakage.json 생성

- Pakage.json : 우리가 만들 패키지의 정보를 기록하는 환경설정 파일
    - main : 진입 파일, 이 패키지를 실행할 때 어떤 파일을 실행해야 하는지를 명시
    - script : 패키지를 개발하면서 자주 실행하는 명령어 등을 사전에 정의할 수 있음
        
        script를 실행할 때는 터미널에 `npm scriptname`와 같이 입력
        
    - dependencies : 설치한 패키지의 이름과 버전(^과 함께 있 range version)을 저장

다양한 종류의 패키지가 Open source로 제공

필요한 패키지 키워드를 검색하면 패키지 install 명령어와 사용까지 볼 수 있음

[npm | Home](https://www.npmjs.com/)

패키지를 설치하면 자동으로 Pakage.json의 dependencies에 추가 되고

- node_modules, package-lock.json이라는 파일이 생김
    - node_modules : 설치한 외부 패키지들의 코드가 실제로 저장, 외부 패키지 저장소
    - package-lock.json : 설치된 외부 패키지들이 정확히 어떤 버전으로 설치되었는지 기록
    

패키지를 사용할 때 마찬가지로 `require` 키워드를 사용 : `require(패키지이름)`

⇒ 경로를 명시할 필요 없이 패키지 이름을 문자열로 써주면 됨

# 4. React.js 기초

## Why React?

### Shotgun Surgey과 컴포넌트화 방식

원인 : 중복 코드 작성 → 대부분의 웹은 상당 부분이 동일하게 유지됨

하나의 문제가 수많은 파일을 동시에 수정하게 함 

### 해결 : 컴포넌트화 방식

중복되는 부분을 개별 컴포넌트 파일로 저장해두고 사

컴포넌트들을 가지고 있을 모듈 파일을 하나 이상 생성해 이름으로 컴포넌트 호출 가능

기존의 HTML 방식으로는 요소들을 컴포넌트화 하기 어려움

⇒ React는 Component 기반의 UI 라이브러리 : 모든 HTML 요소들을 컴포넌트로 만들어 재사용할 수 있음 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/1e26d349-1c9f-4261-b90c-e094e3dfb31f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/c110a807-ed29-4f81-b072-2169ca629ff9/Untitled.png)

### 명령형 프로그래밍과 선언형 프로그래밍

### 명령형 프로그래밍

절차를 하나하나 다 나열 : 코드가 너무 길어지고 이해가 어려움

대표적으로 jQuery

![156.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/72a859a1-f64f-4964-aa06-487d9f16c8c4/156.png)

### 선언형 프로그래밍

그냥 목적을 바로 말함

웹 서비스의 프론트엔드적 측면에서는 선언형 프로그래밍이 각광 받고 있음 

대표적으로 React

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/1fe4461d-ae15-4d01-bb9d-05f9f33136c4/Untitled.png)

### Virtual DOM

### DOM Document Object Model : 문서 객체 모델

웹 브라우저가 HTML을 편하게 해석할 수 있도록 tree 형태로 변환 객체

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/a47aec2f-8d7a-4522-b251-6691e50f7062/Untitled.png)

변환된 DOM을 아래와 같이 처리하여 사용자에게 보여줌

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/bc92fd40-fff9-44e1-bb1a-69f6915dfeae/Untitled.png)

웹 페이지가 변경될 때마다 위의 작업을 다시 반복함

작은 변경에서도 필요 이상으로 자주 작업을 수행 : 낭비, 성능에 문제

### 해결 : Virtual DOM

자바스크립트가 요소를 추가하는 과정에서 발생하는 변화를 실시간으로 실제 DOM에 반영하는 것이 아니라 가상의 DOM에 미리 업데이트 시켜두고 여러 개의 업데이트를 모아서 한 번에 실제 DOM에 업데이트하자.

React에서 제공

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/68d31d2a-0a9a-46c3-9211-1290cccb78f1/Untitled.png)

## Create React App

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/9661271c-a7d2-42c5-8d99-8032c3182e42/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/681f1d19-48d4-48fe-a78d-9723c7d7fb5a/Untitled.png)

npx : 설치되어 있지 않은 패키지를 한 번만 쓰고 싶을 때 사용

`npx crate-react-app 이름` : 보일러 패키지인 Create React App 설치 

설치 완료 후`npm start` : loaclhost로 React가 실행

ctrl + c를 누르면 종료할 건지 묻고 Y를 입력하면 종료

src/App.js에서 `App()`이 반환하는 HTML이 `id=root`인 `div`의 자식 요소로 들어가 화면에 표시

src/index.js에서 `ReactDOM.render` : App.js에서 `App()`을 불러와서 `APP()`이 반환하는 HTML을 `id=root`인 `div` 요소 밑에 render

public/index.html에 `id=root`인 `div` 요소가 있음

React 앱이 실행되면서 src/index.js가 실행이 되면서 public/index.html에 있는 `id=root`인 `div` 아래로 src/App.js에 있는 `App()`가 리턴하는 값들이 들어감

node_modules : node.js의 패키지 구성 요소 중 하나, 외부 모듈 저장, package-lock.json과 package.json에 어떤 모듈을 써야하는지가 저장되어 있기 때문에 없어져도 괜찮음, 만약 없을 경우 npm i를 입력하면 자동으로 다시 다운 받아짐 

pubic/

favicon.ico : 리엑트 아이콘 파일, 브라우저 상단에 표시

logo192.png, logo512.png, manifest.json : 모바일 환경에서 웹 브라우저를 틀어 웹을 볼 때 홈 화면 추가 등을 할 때 아이콘을 적용하거나 옵션을 줄 때  사용하는 옵션과 아이콘

robot.txt : 구글이나 네이버가 웹 사이트를 수집해갈 때 수집해갈지, 말지를 경로로 알려줌

src/

App.css : 스타일 파일

App.js : js와 HTML을 합한 것 같은 이상한 문법 → jsx 문법 

index.css : 스타일 파일

React는 함수를 만들고 return으로 jsx 문법의 HTML을 return 해주면서 컴포넌트 생성

export default App; → React가 주로 사용하는 ES module system

내보내기 `export default 이름;`

불러오기 `import 이름 from 경로;`

## JSX

HTML with Javascript

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/749e3013-a8d9-40e8-bcac-ee2db593f164/Untitled.png)

src/index.js : 최상위 컴포넌트 정의 가능 → root에 최상위 컴포넌트를 추가하는 방식으로 실행되기 때문

### JSX의 닫힘 규칙

여는 태그가 있으면 반드시 닫는 태그가 있어야 함

<div>와 같이 기존 html에서 닫는 태그가 없는 경우는 <div />와 같이 사용 : self-closing 태그

### JSX의 최상위 태그 규칙

최상위 태그 : return문에서 가장 바깥에 위치하는 태그

JSX로 컴포넌트를 만들어 return하려면

: 반드시 하나의 최상위 태그로 다른 모든 태그를 묶어야 함 

: 만약 최상위 태그를 추가하고 싶지 않은 경우에는 `<React.Fragment></React.Fragment>`를 이용 (단, 이때 `import React from ‘react’;` 선언 필수) → 아이디가 root인 div 아래에 다른 태그들이 아무것도 감싸지지 않고 들어가게 됨 

: `<React.Fragment></React.Fragment>`가 귀찮다면 `<></>`로 빈 태그를 만들어줘도 같은 효과

### JSX와 CSS

JSX에서는 `class`가 js 예약어이기 때문에 사용하지 못하고 `className`을 사용

ex) `<div className="App"></div>`

`import 경로;`를 이용하여 css를 적용 : App.css 파일을 수정

### JSX와 인라인 스타일링

css 파일을 쓰지 않고 스타일링

`const style = {}` : 스타일 객체 생성

태그마다 `style={style.객체이름}`으로 스타일 적용

### JSX에서 자바스크립트 값 사용하기

변수를 선언하고 {변수이름}을 통해 태그에 넣을 수 있음

{숫자}

{3항 연산자} : 조건부 랜더링

{문자열}

{함수호출}

등 사용 가능

## State

계속해서 변화하는 특정 상태

상태에 따라 각각 다른 동작을 함

### React에서의 State

계속 값이 바뀔 동적인 데이터

이 상태를 가진 컴포넌트가 관리

`import React, { useState } from "react";`를 통해 state를 사용할 준비

`const [count, setCount] = useState(0);`

`useState` : react의 메서드, 배열을 반환, 배열의 비구조 할당을 통해 0번째 idx는 `count`, 1번째 idx는 `setCount`라는 상수로 받아옴

`count` : 상태의 값으로 사용

`setCount` : `count`를 변화 시키는 상태 변화 함수로 사용

`useState`의 인자 0 : `count`의 초기값으로 사용

`setCount`를 활용해 각 버튼에 작동할 함수를 생성

```jsx
const onIncrease = () => {
        setCount(count + 1);
    }

    const ondecrease = () => {
        setCount(count - 1);
    }
```

`button`의 event는 `onClick={함수이름}`과 같이 설정

컴포넌트는 자신이 가진 상태가 변화하면 화면을 다시 그림(re-render) : 함수가 다시 호출

## Props

컴포넌트에 데이터를 전달하는 방법

부모 컴포넌트에서 자식 컴포넌트로 전달되는 값

부모 컴포넌트에서 자식 컴포넌트를 호출할 때 이름={값}과 같이 추가함 : 여러 개 전달 가능

⇒ 개수가 많아지면 하나하나 전달하기 보다는 스프레드 객체를 사용하면 좋음

⇒ 객체를 하나 생성하고 {… 객체이름}을 통해 한 번에 전달

```jsx
...

return (
    <div>
      <Myheader />
      <Counter initial={5} a={1} b = {2}/>
    </div>
  );

...

또는

...

const counterProps = {
	initial: 5,
	a: 1,
	b: 2,
};

return (
    <div>
      <Myheader />
      <Counter {...counterProps} />
    </div>
  );

...
```

이것을 자식 컴포넌트에서 사용하려면 props 객체에서 꺼내서 사용함

⇒ 비구조화 할당을 통해 { 이름 }과 같이 호출하여 사용할 수도 있음

```jsx
const Counter = (props) => {

    const [count, setCount] = useState(props.initial);
		
...
}

또는

const Counter = ({ initial }) => {

    const [count, setCount] = useState(initial);
```

만약 prop가 제대로 이루어지지 않고 호출하면 undefined로 간주됨

이때 아래와 같이 defaultProps를 설정하면 undefined로 처리되는 것을 방지할 수 있음

```jsx
Counter.defaultProps = {
	initial: 0,
};
```

prop로 정적인 값뿐만 아니라 동적인 값(ex. state)를 전달할 수도 있음

아래와 같이 동적인 값을 prop으로 전달하고 사용할 수 있음

```jsx
// 전달
...
<OddEven count={count} />
...
```

```jsx
// 사용
const OddEven = ({ count }) => { 
    return <>{count % 2 === 0 ? "짝수" : "홀수"}</>;
};

export default OddEven;
```

컴포넌트는 부모가 내려준 prop가 변화하면 화면을 다시 그림(re-render) : 함수가 다시 호출

컴포넌트를 prop으로 전달

```jsx
const Container = ({ children }) => {
    return (
        <div style={{margin:20, padding:20, border:"1px solid gray"}}>
            {children}
        </div>
    );
};

export default Container;
```

```jsx
...
return (
    <Container>
      <div>
        <Myheader />
        <Counter {...counterProps}/>
      </div>
    </Container>
  );
...
```

### re-render

1. 본인이 가지고 본인이 관리하는 상태가 변화할 때
2. 나에게 내려오는 props가 바뀔 때
3. 부모가 re-render될 때
