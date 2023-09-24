# # 함수

## - 함수 정의

1. 함수 선언문
    
    ```jsx
    function square(x) { return x*x; }
    ```
    
    자바 스크립트 엔진은 함수 선언문을 프로그램의 첫머리 또는 함수의 첫머리로 끌어올림
    
    ⇒ 함수 선언문으로 정의한 함수는 호출문이 그보다 앞에 위치해도 호출 가능
    
2. 함수 리터럴
    
    ```jsx
    var square = function(x) { return x*x; };
    ```
    
3. Function 생성자
    
    ```jsx
    var square = new Function("x", "return x*x" };
    ```
    
4. 화살표 함수 표현식
    
    ```jsx
    var square = x => x*x;
    ```
    

함수 리터럴, Function 생성자, 화살표 함수 표현식으로 정의한 함수는 변수에 그 함수의 참조를 할당해야 비로소 사용 가능

⇒ 이 세 가지 방법으로 함수를 정의하는 코드는 호출하는 코드보다 앞에 위치해야 함

### 중첩 함수

특정 함수의 내부에 선언된 함수

자바스크립트에서는 외부 함수의 최상위 레벨에만 중첩 함수를 작성할 수 있음

⇒ 함수 안의 if문과 while문 등의 문장 블록 안에는 중첩 함수를 작성할 수 없음

중첩 함수의 참조는 그 중첩 함수를 둘러싼 외부 함수의 지역 변수에 저장

⇒ 외부 함수의 바깥에서는 읽거나 쓸 수 없음

중첩함수는 자신을 둘러싼 외부 함수의 인수와 지역 변수에 접근할 수 있음

⇒ 외부 함수의 변수 유효 범위가 그 함수의 중첩 함수까지 미친다

## - 함수 호출

1. 함수 호출
    
    ```jsx
    var s = square(5);
    ```
    
    함수의 참조가 저장된 변수 뒤에 그룹 연산자인 ( )를 붙여 함수 호출
    
2. 메서드 호출
    
    ```jsx
    obj.m = function() { . . . };
    obj.m();
    ```
    
    객체의 프로프티에 저장된 값이 함수 타입일 때 그 프로퍼티를 메서드라고 부름
    
    메서드를 호출할 때는 그룹 연산자인 ()를 붙여서 호출
    
    1. 함수 호출과 본질적으로 같은 방법
    
3. 생성자 호출
    
    ```jsx
    var pbj = new Object();
    ```
    
    함수 또는 메서드를 호출할 때 함수의 참조를 저장한 변수 앞에 new 키워드를 추가하면 함수가 생성자로 동작
    
4. call, apply를 사용한 간접 호출

### 즉시 실행 함수

자바스크립트에서 익명 함수를 정의하고 곧바로 실행하는 구문

전역 유효 범위를 오염시키지 않는 이름 공간을 생성할 때 사용

함수 정의식을 그룹 연산자인 ( )로 묶는다

⇒ 괄호 안의 함수 정의식이 평가되어 함수 값(함수 객체의 참조값)으로 바뀜

```jsx
// 일반적인 실행 : 익명 함수의 참조를 변수에 할당, 그룹 연산자 ()를 붙여 실행
var f = function() { . . . };
f();

// 즉시 실행 함수
(function() { . . .})();
```

## - 함수의 인수

인수를 생략하거나, 더 많은 개수의 인수를 넘기는 것 모두 가능

### 인수의 생략

생략한 인자는 undefined

논리합 연산자 || 을 활용하여 인수를 생략했을 때 사용할 초기값 설정

```jsx
function mul(a, b) {
	b = b || 1; //b의 초기값을 1로 설정
	return a*b;
}
mul(2, 3) // -> 6
mul(2) // -> 2
```

**논리합 연산자 ||**

왼쪽 피연산자가 true로 평가되면 왼쪽 피연산자 반환

왼쪽 피연산자가 false로 평가되면 오른쪽 피연산자 반환

인자를 넘기면 true, 인자를 넘기지 않으면 false로 평가

 

### 가변 길이 인수 목록(Arguments 객체)

**argument 변수**

모든 함수에서 사용할 수 있는 지역 변수

argument 변수의 값은 Arguments 객체

함수에 인수를 n개 넘겨서 호출하면 인수 값이 arguments에 저장

**Argument 객체**

유사 배열 객체

프로퍼티로 length와 callee를 가지고 있음

argument.length : 인수 개수

argument.callee : 현재 실행되고 있는 함수의 참조

## - 재귀 함수

유의 사항

1. 재귀 호출은 반드시 멈춰야 한다.
2. 재귀 호출로 문제를 간단하게 해결할 수 있을 때만 사용한다.

## - 객체로서의 함수

자바스크립트의 함수는 Function 객체, 따라서 다른 객체와 마찬가지로 아래와 같은 특징이 있음

- 함수는 변수나 프로퍼티나 배열 요소에 대입할 수 있다
- 함수는 함수의 인수로 사용활 수 있다.
- 함수는 함수의 반환값으로 사용할 수 있다.
- 함수는 프로퍼티와 메서드를 가질 수 있다.
- 함수는 이름 없는 리터럴로 표현할 수 있다(익명 함수).
- 함수는 동적으로 생성할 수 있다.

### 함수의 프로퍼티

![IMG_8614.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/1017fb9c-787e-4d11-80dc-5f82d04a3947/IMG_8614.jpeg)

함수는 Function 생성자의 prototype 객체(Function.prototype)의 프로퍼티를 상속받아 사용

![IMG_8615.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/26e345c7-79a8-4a2e-b95c-667ceb6d702e/IMG_8615.jpeg)

### applydhk call 메서드

this 값과 함수의 인수를 사용하여 함수를 실행하는 메서드

본질적으로 동일하나 함수에 인수를 넘기는 방법에 차이가 있음

apply의 인수는 배열, call의 인수는 쉼표로 구분한 값의 목록

첫 번째 인수 : 함수의 this 값

apply 메서드의 두 번째 인수 : 함수의 인수를 순서대로 담은 배열

call 메서드의 두 번째 이후 인수 : 함수의 인수 목록

```jsx
function say(greetings, honorifics) {
	console.log(greetings + " " + honorifics + this.name);
}
var tom = { name : "Tom" };
var becky = { name : "Becky" };
say.apply(tom, ["Hello!, "Mr."]);
say.call(becky, "hi!", "Ms.");
```

### bind 메서드

객체에 함수를 바인드

아래 코드에서 sayToTom 함수를 호출하면 항상 this 객체가 tom을 가리킴

say.bind(tom)은 tom 객체를 함수 say의 this로 설정한 새로운 함수로 만들어 반환

```jsx
function say(greetings, honorifics) {
	console.log(greetings + " " + honorifics + this.name);
}
var tom = { name : "Tom" };
var sayToTom = say.bind(tom);
sayToTom("Hello", "Mr");
```

### 함수에 프로퍼티 추가하기

Function 객체에 추가된 프로퍼티는 그 함수를 실행하지 않아도 읽거나 쓸 수 있음

일반적으로 그 함수의 작업과 관련된 데이터와 메서드를 저장

전역 변수에 저장해도 같은 작업을 할 수 있으나 그러면 전역 유효 범위를 오염시키므로 주의해야함

함수의 프로퍼티로 작성하면 함수 객체가 이름 공간의 역할을 하기 때문에 문제가 발생하지 않음

# # 객체

## - 객체 생성

자바스크립트의 객체는 이름과 값을 한 쌍으로 묶은 집합

이름(프로퍼티 이름, 키)과 값이 한 쌍을 이룬 것 = 프로퍼티

값으로는 모든 데이터 타입의 데이터 저장

함수의 참조를 값으로 가진 프로퍼티 = 메서드

1. 객체 리터럴로 생성
    
    ```jsx
    var card = { suit: "하트", rank: "A" };
    ```
    
2. 생성자로 생성
    
    ```jsx
    function Card(suit, rank) {
    		this.suit = suit;
    		this.rank = rank;
    }
    
    var card = new Card("하트", "A");
    ```
    
3. Object.create로 생성
    
    ```jsx
    var card = Object.create(Object.prototype, {
    		suit: {
    					value: "하트",
    					writeable: true,
    					enumerable: true,
    					configurable: true
    		},
    		rank: {
    					value : "A",
    					writeable: true,
    					enumerable: true,
    					configurable: true
    		}
    });
    ```
