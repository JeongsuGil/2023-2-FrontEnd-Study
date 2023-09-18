# Week1

---

# # 토큰

토큰(어휘) : 프로그램을 구성하는 최소 단위, 의미를 가지는 최소한의 문자 덩어리를 지칭

보통 토큰과 토큰 사이에 공백 문자를 넣어서 구분

다만 산술 연산자, 괄호, 세미콜론, 쉼표, 콜론, 마침표 앞뒤의 공백 문자는 생략 가능

### 자바스크립트 인터프리터의 처리 절차

1. 프로그램을 토큰으로 분해 : 어휘 분석
2. 토큰을 나열, 구문 규약에 올바른 프로그램인지 판정 : 구문 분석(파싱)
3. 그 결과 프로그램에 문제가 없다고 판단하면 프로그램 실행

# # 문장

토큰을 나열하여 한 문장을 만들고 이를 이용해 컴퓨터에 명령을 내림

자바스크립트 문장은 세미콜론(;)으로 끝남

문장 여러 개를 중괄호({ })로 감싼 복합문(블록문) 끝에는 세미콜론을 붙이지 않음

빈 문장은 세미콜론으로 작성

세미콜론이 붙어 있지 않은 문장에 개행을 삽입하면 경우에 따라 그 위치에 자동으로 추가됨

return문, break문, continue문을 사용할 때는 줄 바꿈을 하지 말고 모두 한 줄로 작성

# # 변수

변수 선언자 : var

쉼표를 사용하면 변수 여러 개를 한 문장에 선언 가능

변수를 선언하기만 하면 변수 안에는 정의되지 않았음을 뜻하는 undefined 값이 들어감

**변수 선언의 끌어올림(호이스팅, hoisting)**

프로그램 중간에서 변수를 선언하더라도 변수가 프로그램 첫 머리에 선언된 것처럼 하는 것. 

단, 선언과 동시에 대입하는 코드는 끌어올리지 않음

# # 데이터 타입

정적 타입 언어 static typed language : 변수에 타입이 있는 언어 Ex) C, Java 등

**동적 타입 언어 dynamic typed language** : 변수의 데이터 타입을 동적으로 바꿀 수 있는 언어

## 자바스크립트 데이터 타입

1. 원시 타입 primitive type
    
    숫자, 문자열, 논리값, 특수한 값(undefined, null), 심벌
    
    원시 타입 데이터는 데이터를 구성하는 가장 기본적인 요소로 불변 값으로 정의되어 있음
    
    원시 값을 변수에 대입하면 변수에 그 값이 저장
    
2. 객체 타입
    
    원시 타입에 속하지 않는 값으로 배열, 함수, 정규 표현식 등
    
    변수 여러 개가 모여서 만들어진 복합 데이터 타입
    
    객체 안에 저장된 값은 바꿀 수 있음
    
    객체 타입의 값을 변수에 대입하면 그 객체에 대한 참조(메모리에서의 위치 정보)가 할당
    

## 숫자

자바스크립트에는 타입이 없으므로 숫자를 모두 64비트 부동소수점으로 표현

리터럴 : 프로그램에 직접 작성할 수 있는 상수 값, 정수 리터럴과 부동소수점 리터럴이 있음

![IMG_8578.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/c005bce6-a139-4b25-b18e-34478f3772b1/IMG_8578.jpeg)

특수한 값을 표현하기 위한 문자열이 정의되어 있음

![IMG_8578.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/f8d1f5ed-f5d7-40f6-a89e-9f8262f4534e/IMG_8578.jpeg)

![IMG_8580.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/f0e831fb-da81-4a64-bafb-8b417a9263fa/IMG_8580.jpeg)

## 문자열

문자열 리터럴 : 작은 따옴표. 큰 따옴표

자바스크립트를 HTML 요소에 끼워 넣을 때는 자바스크립트 프로그램을 문자열로 작성

이때 HTML코드에는 큰 따옴표, 자바스크립트 코드에는 작은 따옴표를 사용하여 구분하는 것이 좋음

일부 문자는 이스케이프 시퀀스를 이용해 문자열에 추가

![IMG_8581.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/74142d6b-2ef7-439e-938a-9045caca11d4/IMG_8581.jpeg)

## 논리값

 : true, false

## 특수한 값

 : null, undefined

## 심벌

자기 자신을 제외한 그 어떤 값과도 다른 유일무이한 값

Symbol( )을 이용해 생성

호출할 때마다 새로운 값을 생성

Symbol.for( ) : 문자열과 연결된 심벌 생성

Symbol.keyFor( ) : 심벌과 연결된 문자열을 출력

## 템플릿 리터럴

문자열 표현 구문

표현식의 값을 문자열에 추가하거나 여러 줄의 문자열을 표현할 수 있음

역따옴표( ` )로 묶은 문자열

문자열 리터럴에서 줄 바꿈 문자를 표현할 때는 이스케이프 시퀀스를 사용했지만 템플릿 리터럴을 사용하면 일반적인 줄 바꿈 문자를 사용할 수 있음

String.raw : 태그 함수, 이스케이프 시퀀스 문자를 그대로 출력할 때 사용

**보간 표현식**

템플릿 리터럴 안에는 플레이스 홀더 ${ … }를 넣을 수 있음

자바스크립트 엔진은 플레이스 홀더 안에 든 … 부분을 표현식으로 간주하여 평가

이를 활용하여 문자열 안에 변수나 표현식의 결과값을 삽입할 수 있음

# # 객체

이름과 값을 한 쌍으로 묶은 데이터를 여러 개 모은 것

데이터 여러개를 하나로 모은 복합 데이터

**프로퍼티** : 객체에 포함된 데이터 하나(이름과 값의 쌍)

프로퍼티의 이름 부분을 **프로퍼티 이름** 또는 **키**라고 부름

객체 생성

1. 객체 리터럴
2. 생성자

## - 객체 리터럴

Ex) var card = { suit : “하트”, rank : “A” };

{ . . . } 부분이 객체 리터럴

프로퍼티 이름과 프로퍼티 값은 콜론을 이용하여 구분

중괄호 안에 있는 프로퍼티들은 쉼표로 구분

객체 리터럴 안에 아무 프로퍼티도 작성하지 않으면 빈 객체 생성

프로퍼티 이름 : 모든 식별자와 문자열 리터럴(빈 문자열 포함) 사용

프로퍼티 값 : 모든 데이터 타입의 값과 표현식 사용

### 프로퍼티 값 읽기

: 마침표 연산자, 대괄호 연산자

마침표 연산자는 프로퍼티 이름(식별자)를 사용하여 값을 읽고 씀

대괄호 연산자는 프로퍼티 이름 또는 문자열을 반환하는 표현식을 사용하여 값을 읽고 씀

객체에 없는 프로퍼티를 읽으려고 시도하면 udefined를 반환

Ex) card.suit

Ex) card[”rank”]

### 프로퍼티 추가와 삭제

추가 : 없는 프로퍼티 이름에 값을 대입

삭제 : delete 연산자를 사용

Ex) card.value = 14;

Ex) delete card.rank;

### in 연산자

객체에 특정 프로퍼티가 있는지 확인 가능, 있으면 true 없으면 false 반환

프로퍼티 이름을 뜻하는 문자열 in 객체명

객체가 가진 프로퍼티와 상속 받은 모든 프로퍼티를 조사

Ex) console.log(”suit” in card);

### 객체는 참조 타입

객체 타입의 값을 변수에 대입하면 그 변수는 객체의 참조가 저장

## - 생성자

생성자로 객체를 생성할 때는 new 연산자를 사용

인스턴스 : 생성자와 new 연산자로 생성한 객체

생성자를 사용하면 이름은 같지만 프로퍼티 값이 다른 객체 여러 개 생성 가능

생성자는 함수이므로 프로퍼티에 값을 대입할 수  있음

생성자에서 this.프로퍼티 이름에 함수의 참조를 대입하면 매서드를 정의할 수 있음

```jsx
function Particle(x, y, vx, vy) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.velocity = Math.sqrt(vx * vx + vy * vy);
		this.mul = function() {
				return this.x * this.y;
		}; 
}
var p = new Particle(0, 0, 3, 4);
```

## - 내장 객체

### 내장 생성자

이미 유용한 프로퍼티와 매서드가 마련되어 있으므로 이를 이용하여 객체를 생성하면 좋음

### Date 생성자

날짜와 시간을 표현하는 객체를 생성

Ex) var now = new Date( );

실행한 시점의 날짜와 시간 정보를 담은 객체를 생성하여 변수에 대입

인수로 날짜와 시간을 전달하면 그 날짜와 시간을 가리키는 객체가 생성

### Function 생성자

함수를 생성하는 내장 생성자

var 변수 이름 = new Function (인수1, 인수2, . . . , 인수n, 함수);

단점 : 생성된 함수는 전역 변수와 자신의 지역 변수만 읽고 쓸 수 있음

함수를 생성하는 기능보다는 함수 리터럴에 래퍼 객체를 제공한다는 점에서 유의미

### 전역 객체

프로그램의 어느 위치에서나 사용 가능

자바스크립트 인터프리터가 시작될 때 혹은 웹 브라우저가 새로운 페이지를 읽어 들일 때마다 새로운 전역 객체가 생성

### 자바스크립트 객체의 분류

![IMG_8582.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/c08967d9-2dae-4c55-875e-083939b9eb55/IMG_8582.jpeg)

# # 함수

일련의 처리를 하나로 모아 언제든 호출할 수 있도록 만들어 둔 것

입력 값을 인수, 출력 값을 반환값이라고 부름

선언 : function 키워드 사용

호출 : 함수 이름 뒤에 소괄호로 인수를 묶어 입력

Ex) function squre(x) { return x * x; }

Ex) squre(3)

**함수 선언문의 끌어올림**

자바스크립트 엔진은 함수 선언문을 프로그램의 첫머리로 끌어올림

## - 함수의 실행 흐름

1. 호출한 코드에 있는 인수가 함수 정의문의 인자에 대입
2. 함수 정의문의 중괄호 안에 작성된 프로그램이 순차적으로 실행
3. return문이 실행되면 호출한 코드로 돌아감 return문의 값은 함수의 반환값이 됨
4. return문이 실행되지 않은 상태로 마지막 문장이 실행되면 호출한 코드로 돌아간 후 undefined가 함수의 반환값이 됨

## - 자바스크립트에서는 함수가 객체

함수 선언문으로 함수를 선언하면 내부적으로는 그 함수 이름을 변수 이름으로 한 변수와 함수 객체가 만들어지고 그 변수에 함수 객체의 참조가 저장

따라서 이 변수 값을 다른 변수에 할당하면 그 변수 이름으로 함수를 실행할 수 있음

## - 참조에 의한 호출 Call by reference

인수로 객체를 넘겼을 때 전달되는 값은 참조 값

이때 인자와 변수는 같은 개체를 참조하고 있으므로 인자를 변경하면 원래 객체가 바뀜

## - 값에 의한 호출 Call by value

함수가 호출될 때 변수의 복사본이 인자에 할당

인수에 원시 값을 넘기면 그 값 자체가 인자에 전달

인자의 값을 바꾸더라도 변수의 값은 바뀌지 않음

## - 유효범위

**어휘적 범위** : 프로그램의 구문 만으로 유효 범위를 결정

동적 범위 : 프로그램 실행 중에 유효 범위를 결정

### 전역변수

함수 바깥에서 선언된 변수

유효 범위가 전체 프로그램

### 지역변수

함수 안에서 선언된 변수와 함수 인자

유효 범위가 함수 내부

자바스크립트 엔진은 함수 안의 변수 선언부를 함수 첫머리로 끌어올림

함수 내에서도 변수를 선언하지 않은 상태로 값을 대입하면 전역 변수로 선언

## - let

‘블록 유효 범위’를 갖는 지역 변수를 선언

let 문으로 동일한 이름을 가진 변수를 같은 범위에 선언하면 문법 오류 발생

## - const

‘블록 유효 범위’를 가지면서 한 번만 할당할 수 있는 변수(상수)를 선언

반드시 초기화 해야함

const 문으로 선언한 변수에 다시 대입을 시도하면 타입 오류 발생

const 문으로 선언한 상수 값은 수정할 수 없지만, 상수 값이 객체이거나 배열일 경우에는 프로퍼티, 프로퍼티 값을 수정할 수 있음

## - 함수 리터럴

Ex) var square = function(x) { return x * x; };

function(x) { . . . } 부분이 함수 리터럴

함수 리터럴을 사용할 때는 끝에 반드시 세미콜론을 붙여야 함

자바스크립트 엔진이 함수 리터럴로 정의한 함수는 끌어올리지 않음

익명 함수에도 이름을 붙일 수 있지만 함수 안에서만 유효함

Ex) var square = function sq(x) { return x * x; };

## - 매서드

객체의 프로퍼티 중 함수 객체의 참조를 값으로 담고 있는 프로퍼티

매서드를 정의할 때는 프로퍼티 값으로 함수 리터럴을 대입

일반 함수와 마찬가지로 소괄호를 붙여 실행

## - 함수의 장점

1. 재사용 가능
2. 이해가 쉬움
3. 수정이 간단

# # 배열

## - 배열 리터럴

쉼표로 구분한 값을 대괄호로 묶어서 표현

Ex) var evens = [ 2, 4, 6, 8 ];

[ . . . ] 부분이 배열 리터럴이며 배열 값 하나를 배열 요소라고 부름

배열 요소에는 왼쪽부터 0, 1, 2, . . .의 인덱스(요소 번호)가 매겨짐

자바스크립트의 배열은 객체 타입이므로 배열을 변수에 대입하면 배열의 참조가 변수에 저장

자바스크립트의 배열은 Array 객체이며 객체로 배열의 기능을 가상으로 흉내 낸 것 : 인덱스를 문자열로 변환하여 그것을 프로퍼티로 이용

**TypedArray**

C, Java 등의 배열과 같이 메모리의 연속된 공간에 차례대로 배치

## - length 프로퍼티

배열 요소의 최대 인덱스 값 + 1

length 프로퍼티에 현재의 배열 요소 개수보다 작고 0보다 큰 정수 값을 대입하면 배열 길이가 줄어 들고, 그 배열 길이를 넘는 인덱스 번호에 할당된 배열 요소는 삭제됨

length 프로퍼티에 현재의 배열 요소 개수보다 큰 정수 값을 대입하면 length 프로퍼티 값만 바뀜

## - Array 생성자

Ex) var evens = new Array(2, 4, 6, 8);

Array 생성자의 인수가 한 개이고 그 값이 양의 정수이면 그 길이의 배열이 생성됨

## - 추가와 삭제

없는 배열 요소에 값을 대입하면 새로운 요소 추가

push 매서드를 사용해 배열 끝에 추가 가능

delete 연산자를 사용하여 특정 배열 요소 삭제 : 단, length 프로퍼티 값은 바뀌지 않고 그 요소만 지워지고 undefined이라 표시됨

## - 희소배열

배열에 요소를 추가하거나 제거하여 인덱스가 0부터 시작하지 않는 배열

희소 배열의 길이는 배열 요소의 개수보다 크다.

# # 연산자

부수 효과가 있는 표현식 : 변수의 값을 바꾸는 표현식

Ex) 대입 연산자, 증가 연산자, 감소 연산자, delete

## - 산술 연산자

산술 이항 연산자, 산술 단항 연산자, 산술 대입 연산자

 

산술 이항 연산자 사용시 주의점

1. 정수끼리 나누어도 결과가 부동소수점이 된다.
2. 나머지 연산자 %의 피연산자는 부동소수점이다.
3. + 연산자는 피연산자 중 하나가 문자열이면 나머지 피연산자를 문자열로 만든다.
4. 계산할 수 없는 경우에는 NaN으로 평가한다.
5. 산술 연산자의 피연산자가 true이면 1, false와 null이면 0으로 평가한다.
6. undefinded이면 NaN으로 평가한다.

## - Math 객체의 프로퍼티

![IMG_8583.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/3436b141-67a3-4e82-9cad-48ccf64596b3/IMG_8583.jpeg)

![IMG_8584.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/0870cfd8-9366-497e-b123-ecd41f8a6f81/IMG_8584.jpeg)

## - 부동소수점과 정확도 문제

산술 연산을 할 때는 숫자에 유효한 자릿수가 있으므로 계산할 때 오차가 발생한다는 점을 항상 염두에 두어야 함

## - 문자열 제어

### String 객체

문자열을 처리하기 위한 객체

String 생성자를 사용하여 문자열을 String 객체로 변환

래핑(wrapping) : 원시 값을 객체로 변환하는 행위

문자열에서 프로퍼티를 사용하려고 하면 일시적으로 String 객체로 변환하여 실행 : 이떄 생성되었다가 사라지는 객체를 래퍼 객체라고 함

자바스크립트에서는 원시 값을 처리할 때 원시 값을 래퍼 객체로 자동 변환 : 문자열은 String 객체, 숫자는 Number 객체, 논리값은 Boolean 객체

자바스크립트의 문자열은 불변

특정 매서드를 사용하여 값이 변경된 것처럼 보여도 새로운 문자열을 반환했을 뿐 문자열이 수정된 것은 아님 

```jsx
var msg = new String("example");
console.log(msg.length);
```

![IMG_8585.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/771371ff-e090-4983-850d-192fb37a1933/IMG_8585.jpeg)

![IMG_8586.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/989112dd-c651-4711-910f-a6e067449104/IMG_8586.jpeg)

### 배열로 읽고 쓰기

대괄호 연산자를 이용하여 읽을 수 있음

단, 배열처럼 값을 대입해서 수정할 수는 없음

## - 관계 연산자

부등호 및 동일 연산자, 일치 연산자

### 동일 연산자

== : 값이 같음

!= : 값이 다름

### 일치 연산자

=== : 값과 타입이 같음

!== : 값과 타입이 다름

NaN은 NaN을 포함한 모든 값과 같지 않다고 판정

## - 논리 연산자

관계 연산자의 우선순위가 논리 연산자보다 높음

### 단락평가

첫 번째 피연산자 값이 표현식을 결정하면 두 번째 피연산자를 평가하지 않는 것

논리곱 연산자와 논리합 연산자는 논리값 대신에 마지막으로 평가한 피연산자 값을 반환

## - 비트 연산

비트 논리 연산자, 비트 시프트 연산자, 비트 연산의 대입 연산자

## - 기타 연산자

![IMG_8587.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/6ece4c88-ab98-48ab-8e34-68d9caacc8d7/IMG_8587.jpeg)

# # 명시적 타입 변환

## - 숫자 → 문자열

### 숫자 + 문자열

숫자와 문자열을 + 연산자로 연결하면 숫자의 타입이 문자열로 바뀜

### Number 객체의 매서드

![IMG_8588.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/20d7d603-c211-4ef4-a147-3f52ebf784a9/IMG_8588.jpeg)

### String 함수

String 생성자 앞에 new 연산자를 붙이지 않으면 일반적인 함수로 활용할 수 있음

이때 String 함수의 반환값은 String 객체가 아닌 문자열이다.

즉, String 함수에 값을 전달하면 그 값을 문자열로 바꿈

## - 문자열 → 숫자

### 수식 안에서 묵시적으로 변환

1. 문자열 - 0
2. +문자열

### parseInt와 parseFloat 함수

문자열을 해석(parse)하여 숫자로 바꾸는 함수

parseInt 함수는 문자열을 정수로 바꿈

parseFloat 함수는 문자열을 부동소수점으로 바꿈

문자열의 첫 번째 문자를 숫자로 바꾼 값을 반환하고 이후 문자열은 무시

첫 번째 문자를 숫자로 해석할 수 없는 경우 NaN을 반환

문자열 앞부분이 ‘0x’, ‘0X’로 시작할 때는 16진수로 해석

문자열 앞부분에 있는 공백 문자는 무시

parseInt 함수의 두 번째 인수로 기수를 설정할 수 있음

### Number 함수

Number 생성자 앞에 new 연산자를 붙이지 않으면 일반 함수로 활용 가능

이때 Number 함수의 반환값은 Number 객체가 아닌 숫자

Number 함수의 인수로 문자열을 넘기면 정수 또는 부동소수점을 뜻하는 문자열을 숫자로 바꿈

10진수만 처리할 수 있음

## - 논리값으로 변환하기

1. !!값
2. Boolean(값)

# # 대화상자

모달 창 : 이 창이 떠있는 중에는 부모 창의 작업이 정지 상태가 되어 조작할 수 없게 됨

일반 텍스트만 표시할 수 있으면 줄 바꿈 문자 등은 이스케이프 시퀀스로 표시

## - alert 메서드 : 경고 대화상자

인수로 경고 문자열을 받음

Ex) alert(문자열);

## - prompt 메서드 : 입력 대화상자

인수로 입력을 보조하는 문자열을 받음

사용자로부터 입력받은 문자열은 prompt 메서드의 반환값이 됨

두 번째 인수로는 초기 입력 값을 지정할 수 있음(옵션)

Ex) var name = prompt(문자열);

## - confirm 메서드 : 확인 대화상자

확인 버튼과 취소 버튼이 있음

인수로는 메세지를 뜻하는 문자열을 받음

확인 버튼을 누르면 true를 취소 버튼을 누르면 false를 반환 

Ex) var ret = confirm(문자열);

# # Console 콘솔

## - Console 객체의 메서드

Console 객체는 콘솔 출력을 돕는 다양한 기능을 제공

alert에 비해 사용이 간단하고 부모 창의 동작을 간섭하지 않기 때문에 프로그램의 동작을 확인하거나 디버깅하는 데 자주 사용

![IMG_8589.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/2bf99041-2983-4511-87e5-1e096ad250a7/IMG_8589.jpeg)

## - 콘솔에 텍스트 출력하기

문자열이나 변수 값을 콘솔에 로그로 출력하려면 console.log, console.info, console.warn, console.error 메서드를 사용

이들 메서드가 받는 인수와 표시하는 문자열은 같지만 로그 스타일이 다름

출력 방식

1. 인수 여러 개를 쉽표로 구분해서 넘기면 각 값을 문자열로 표시한 후 공백 문자로 구분해서 출력
2. + 연산자를 활용하여 한 문자열로 넘기면 공백 문자를 빼고 출력할 수 있음
3. 서식 문자열을 사용하여 값을 지정된 서식으로 변환해서 출력
    
    ![IMG_8590.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/31c111ba-a5ef-42ee-9cf0-7e3b8ea33f47/IMG_8590.jpeg)
    

## - 객체의 프로퍼티를 목록으로 표시하기

console.dir 메서드는 객체의 프로퍼티를 나열함

인수로는 객체 하나를 받음

## - 타이머

console.time과 console.timeEnd 메서드를 사용해서 특정 코드의 실행 시간을 측정

1. console.time 메서드에 타이머 이름을 뜻하는 문자열을 인자로 넘겨 호출
2. 실행 시간을 측정하는 작업이 끝난 후에 console.timeEnd 메서드에 타이머 이름을 넘겨서 호출
3. 처리에 소요된 시간이 밀리초 단위로 표

# # 이벤트 처리기

웹 브라우저에서 동작하는 프로그램은 기본적으로 이벤트 주도형 프로그램(event driven program)

이벤트 : 버튼 클릭처럼 단말기와 애플리케이션이 처리할 수 있는 동작이나 사건

이벤트 주도형 프로그램 : 이벤트가 발생할 때까지 기다렸다가 이벤트가 발생했을 때 미리 등록해둔 작업을 수행하는 프로그램

이벤트 처리기 : 이벤트가 발생했을 때 실행되는 함수

‘함수를 이벤트의 이벤트 처리기로 등록’ : 함수를 이벤트가 발생했을 때 동작할 이벤트 처리기로 설정하는 행위

함수를 이벤트 처리기로 등록하는 방법(3가지)

1. HTML 요소의 속성으로 등록하는 방법
2. DOM 요소의 프로퍼티로 등록하는 방법
3. addEventListener 메서드를 사용하는 방법

## - HTML 요소의 속성에 이벤트 처리기 등록하기

HTML 요소에 이벤트 처리기 속성을 설정하면 그 요소에 이벤트가 발생했을 때 동작하는 이벤트 처리기를 등록할 수 있음

<예제1> click 버튼을 클릭하면 콘솔에 현재 시각을 표시하는 프로그램

```jsx
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>시각을 콘솔에 표시하기</title>
	<script>
		function displayTime() {
			var d = new Date();
			console.log("현재 시각은 " + d.toLocaleString() + " 입니다.") ;
		}
	</script>
</head>
<body>
	<input type="button" value="click" onclick="displayTime()"> // 여기
</body>
</html>
```

이벤트 처리기는 ‘여기’의 HTML 요소에 등록되어 있음

밑줄친 부분이 이벤트 처리기 속성

input 요소를 클릭했을 때 함수 displayTime이 실행

‘여기’서 onclick 부분을 이벤트 처리기 이름이라고 하며 이는 곧 이벤트 유형을 뜻함

이벤트 처리기 속성에는 이벤트가 발생했을 때 실행할 자바스크립트 문장을 문자열로 만들어 대입

속성에 문장을 여러 개 작성하고자 할 때는 문장과 문장을 세미콜론으로 구분한 문자열을 대입

단점 : HTML 코드와 자바스크립트 코드가 뒤섞임

![IMG_8591.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/97848a23-f7fc-47a7-a121-337d12a34a5c/IMG_8591.jpeg)

## - DOM에서 가져온 HTML 요소에 이벤트 처리기 지정하기

DOM(Document Object Model) : 자바스크립트 등의 프로그램이 HTML 요소를 조작할 수 있게 하는 인터페이스

### DOM 객체

HTML 문서나 HTML 요소를 가리키는 객체로 자바스크립트를 사용하여 HTML 문서를 조작

DOM 주요 객체

- window : Window 객체라고 부르며 웹 브라우저 윈도우 하나 또는 탭 하나를 가리킵니다.
- document : Document 객체라고 부르며 HTML 문서 전체를 가리킵니다. HTML 문서에서 HTML 요소 객체를 가져오거나 HTML 요소를 새로 만드는 등 HTML 문서 전반에 걸친 기능을 제공
- 요소 객체 : HTML 문서의 요소를 가리키는 객체입니다.

이들 객체에는 HTMIL 문서를 조작하기 위한 다양한 메서드가 정의되어 있음

### DOM을 사용해서 이벤트 처리기 등록하기

1. window.onload를 사용하여 HTML 문서를 다 읽어 들인 후에 2와 3을 실행한다.
2. document,getElementById 메서드를 사용하여 특정 id 속성 값을 가진 HTML 요소의 요소 객체를가져온다.
3. 요소 객체의 이벤트 처리기 프로퍼티에 이벤트 처리기로 동착할 함수를 등록한다.

<예제2> 예제1을 DOM을 사용하게 수정

```jsx
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>시각을 콘솔에 표시하기</title>
	<script>
		function displayTime() {
			var d = new Date();
			console.log("현재 시각은 " + d.toLocaleString() + " 입니다.") ;
		}
		// 1. Window 객체의 onload 프로퍼티에 함수를 저장한다
		// 이 함수는 웹 브라우저가 문서를 모두 읽어 들인 후에 실행된다
		window.onload = function() {
			// 2. input 요소의 객체 가져오기
			var button = document.getElementById("button");
			// 3. input 요소를 클릭했을 때 동작하는 이벤트 처리기를 등록한다
			button.onclick = displayTime;
		};
	</script>
</head>
<body>
	<input type="button" value="click" id="button">
</body>
</html>
```

DOM에서 이벤트 처리기를 등록하는 가장 큰 목적 : HTML 코드와 자바스크립트 코드의 분리

⇒ script 요소를 head 요소의 자식 요소로 배치

⇒ DOM을 사용하면 body 요소의 바깥에서 body 요소 안에 있는 HTML 요소룰 조작할 수 있음

그러나, script 요소가 실행되는 시점은 body 요소를 읽어들이지 않은 시점임

⇒ 조작하고자 하는 요소(버튼)이 없으므로 이벤트 처리기를 등록할 수 없음

⇒ 이벤트 처리기를 등록하는 작업의 실행 시점을 HTML 문서 전체를 읽은 후로 미룸

⇒ window.onload 사용 : window 객체의 onload 이벤트에 반응하는 이벤트 처리기 등록

document.getElementById는 전달 받은 인수를 id 속성으로 가지고 있는 HTML 요소의 요소 객체를 반환, 찾지 못하면 null을 반환

⇒ id 속성 값이 “button”인 요소의 요소 객체를 가져와 변수 button에 저장

### 이벤트 처리기 제거

null을 대입

# # 타이머

## 지정된 시간이 흐른 후에 함수 실행하기 : setTimeout

첫 번째 인수로는 ‘실행하고자 하는 함수의 참조’, 두 번째 인수로는 ‘지연 시간’을 ms 단위로 지정

setTimeout( )이 반환한 값을 clearTimeout( )의 인수로 넘겨서 실행하면 함수 실행이 취소

지연 시간을 0ms로? 현재 실행 중인 이벤트 처리기의 작업이 끝나기를 기다렸다가 가능한 빨리 실행

```jsx
setTimeout(function() {
		console.log(new Date());
}, 2000);
```

## 지정된 시간마다 반복해서 실행하기 : setInterval

첫 번째 인수로는 ‘실행하고자 하는 함수의 참조’, 두 번째 인수로는 ‘시간 간격’을 ms 단위로 지정

setInterval( )이 반환한 값을 clearInterval( )의 인수로 넘겨서 실행하면 함수 실행이 취소

setInterval( )과 clearInterval( )의 첫 번째 인수로 문자열을 넘길 수도 있음 : 지정한 문자열은 내부적으로 eval( )로 평가된 후에 실행

```jsx
setInterval(function() {
		console.log(new Date());
}, 1000);
```

# # HTML 요소를 동적으로 읽고 쓰기

## - HTML 요소의 innerHTML 프로퍼티로 읽고 쓰기

요소 객체의 innerHTML 프로퍼티는 그 HTML 요소의 내용을 가리키며, 이를 통해 HTML 요소의 내용을 읽거나 쓸 수 있음

<예제3> start 버튼을 누르면 setInterval 메서드를 활용해서 누른 시점부터 경과한 시간을 0.01초마다 HTML 요소의 innerHTML 프로퍼티로 기록, stop 버튼을 누르면 이러한 동작을 멈추는 프로그램

```jsx
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>스톱워치</title>
	<script>
		window.onload = function() {
			var startButton = document.getElementById("start");	// start 버튼 요소
			var stopButton = document.getElementById("stop");	// stop 버튼 요소
			var display = document.getElementById("display");	// 결과를 표시하는 요소
			var startTime,timer;
			startButton.onclick = start;	// strat 버튼 활성화
			function start() {
				startButton.onclick = null;	// start 버튼 비활성화
				stopButton.onclick = stop;	// stop 버튼 활성화
				startTime = new Date();
				// 0.01 초마다 경과한 시간을 표시
				timer = setInterval(function() {
					var now = new Date();
					// #display에 경과한 시간 쓰기
					display.innerHTML = ((now - startTime)/1000).toFixed(2);
				},10);
			}
			function stop() {
				clearInterval(timer);			// 타이머 해제
				startButton.onclick = start;	// strat 버튼 활성화
			}
		};
	</script>
</head>
<body>
	<p id="display">0.00</p>
	<input id="start" type="button" value="start">
	<input id="stop" type="button" value="stop">
</body>
</html>
```

요소 객체 display의 innerHTML 프로퍼티에 경과 시간을 대입하여 id 속성 값이 display인 HTML 요소의 내용을 갱신

## - 폼 컨트롤의 입력 값 읽기

input 요소 등의 폼 컨트롤 요소를 사용, 사용자의 입력 값을 자바스크립트 프로그램에서 사용 가능

![IMG_8594.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/b37dc1c0-6fed-4a6c-a9bf-3673da77f78d/IMG_8594.jpeg)

<예제4> 키와 몸무게를 입력하면 BMI 지수를 계산해서 표시하는 프로그램

```jsx
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>체질량지수 계산하기</title>
	<script>
        window.onload = function() {
            document.getElementById("button").onclick = function() {
                // input 요소에 입력된 몸무게 데이터와 키 데이터를 가져온다
                var h = parseFloat(document.getElementById("height").value);
                var w = parseFloat(document.getElementById("weight").value);
                // 체질량지수를 bmi라는 id를 가진 요소(output 요소)에 기록한다
                var bmi = document.getElementById("bmi");
                bmi.innerHTML = (w/h/h).toFixed(1);
            };
        };
	</script>
</head>
<body>
	<p>키: <input type="number" id="height"> m</p>
	<p>몸무게: <input type="number" id="weight"> kg</p>
	<p>당신의 체질량지수는 <output id="bmi">?</output> 입니다</p>
	<input type="button" id="button" value="계산">
</body>
</html>
```

input 요소 객체의 value 프로퍼티로 input 요소의 입력 값을 구함

## - document.write

document.write 메서드는 인수로 받은 문자열을 HTML 문서의 body 요소 안에 출력함

이를 통해 HTML 문서의 내용이 바뀌게 되고 웹 브라우저는 수정된 HTML 문서를 표시

```jsx
<body>
		<script>
				var now = new Date();
				var month = now.getMonth() + 1;
				var day = now.getDate();
				document.write("<p>오늘은 " + month + "월 " + day + "일 입니다. </p>");
		</script>
</body>
```

웹 브라우저가 script 요소를 만나 script 요소 안의 코드를 실행해서 HTML 문서 내용이 바뀜

이때 웹 브라우저가 HTML 문서를 해석하는 도중에 document.wirte를 실행한다는 점에 유의

<body> 부분이 해석된 후에 script 요소가 해석되어 실행, document.write는 이 시점에 실행

document.write의 출력 값은 script 요소 바로 앞의 HTML 요소에 추가

웹 브라우저는 script 요소 안의 작업이 끝난 후에 </body> 다음 부분을 해석해서 추가

이벤트 처리기로 등록한 함수 안에서 document.write를 사용하면 안 됨

document.write를 사용한 다음에 호출한 함수에서는 HTML 문서를 동적으로 수정할 수 없음

동적으로 HTML 문서를 변경하려면 DOM을 사용해야 함

# # Canvas를 활용한 컴퓨터 그래픽스

## - Canvas

웹 브라우저에서 그래픽을 처리하기 위해 추가된 HTML5 구성 요소

2차원 그래픽과 WebGL을 사용한 3차원 그래픽을 구현할 수 있음

즉시 실행형 저수준 API

기본적인 그리기 기능만 제공 → 그리는 속도가 빠름

기본적인 기능만 제공하는 API → 더욱 복잡한 그림은 저수준 API를 활용한 애플리케이션을 사용

Canvas의 그리기 명령은 호출하는 즉시 실행, 그림 상태를 저장하는 중간 데이터 계층이 없음

### 좌표계

왼쪽 윗부분이 원점 (0, 0)

캔버스 오른쪽이 x축 정방향, 캔버스 아래쪽이 y축 정방향

좌표축의 길이를 세는 단위는 픽셀

## - Canvas 기본 사용법

```jsx
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Canvas의 기본</title>
	<script>
		window.onload = function() {
			// canvas 요소 가져오기
			var canvas = document.getElementById("mycanvas"); // 2번
			// canvas 랜더링 컨텍스트 가져오기
			var ctx = canvas.getContext("2d"); //3번
			// 좌표(10,10)에 가로 200, 높이 50인 사각형 테두리를 그린다
			ctx.strokeRect(10,10,200,150); //4번
			// 좌표(50,40)에 가로 120, 높이 90인 사각형을 채운다
			ctx.fillRect(50,40,120,90);
			// 좌표(90,65)에 가로 40, 높이 40인 사각형 영역을 삭제한다
			ctx.clearRect(90,65,40,40);
		}
	</script>
</head>
<body>
	<canvas id="mycanvas" width="640" height="400"></canvas> // 1번
</body>
</html>
```

1. canvas 요소를 배치 : HTML 속성 또는 DOM 속성으로 설정하는 것을 권고
2. canvas 요소의 객체 가져오기 : 2D는 “2d”, WebGL은 “webgl”
3. ‘랜더링 컨텍스트’라는 객체 가져오기
4. 그림 그리기

## - 사각형 그리기

Canvas에 내장된 그리기 기능은 사각형 그리기 하나뿐임

나머지 도형은 패스로 정의해 그림

사각형 왼쪽 위 끝점 좌표인 (x, y), 사각형 너비인 width, 사각형 높이인 height를 인수로 지정

1. 사각형 테두리 그리기 : strokeRect(x, y, width, height)
2. 사각형 채우기 : fillRect(s, y, width, height)
3. 사각형 영역을 지우고 투명하게 만들기 : clearRect(x, y, width, height)

## - 패스로 그리기

1. beginPath 메서드 호출하기
    
    beginPath 메서드를 호출하면 랜더링 컨텍스트 패스를 기록하기 시작
    
    지금까지 정의한 패스가 초기화되어 새로운 도형을 그릴 수 있음
    
2. 패스를 정의하는 메서드 호출하기
    
    패스를 정의하는 메서드를 호출하면 렌더링 컨텍스트에 패스가 추가되어 하나씩 연결
    
    ![IMG_8599.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/d92c543d-14e1-4e82-80af-ebc8edba7ced/IMG_8599.jpeg)
    
3. closePath 메서드 호출하기
    
    closePath 메서드를 호출하면 패스의 마지막 점과 시작점을 직선으로 연결하고 패스를 닫음
    
    이미 패스가 닫혀 있거나 패스 위의 점이 하나일 때는 아무 작업도 하지 않음
    
4. 패스를 Canvas에 그리기
    
    stroke나 fill 메서드로 렌더링 컨텍스트에 기록한 패스를 Canvas 위에 그림
    
    stroke 메서드는 패스를 그리고 fill 메서드는 패스로 둘러싼 영역을 채움
    

```jsx
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Canvas의 기본</title>
	<script>
		window.onload = function() {
			// canvas 요소 가져오기
			var canvas = document.getElementById("mycanvas");
			// canvas 랜더링 컨텍스트 가져오기
			var ctx = canvas.getContext("2d");
			// 그리기
			ctx.beginPath();
			ctx.moveTo(60,10);
			ctx.lineTo(110,100);
			ctx.lineTo(10,100);
			ctx.closePath();
			ctx.stroke();
			// 삼각형 채우기
			ctx.beginPath();
			ctx.moveTo(60,120);
			ctx.lineTo(110,210);
			ctx.lineTo(10, 210);
			ctx.fill();
		}
	</script>
</head>
<body>
	<canvas id="mycanvas" width="640" height="400"></canvas>
</body>
</html>
```

### 펜 이동시키기 : moveTo(x, y)

패스릃 그리는 펜만 좌표 점 (x, y)로 이동

Canvas가 초기화 되거나 beginPath 메서드가 호출되면 패스의 시작점은 (0, 0)으로 설정

### 선으로 연결하기 : lineTo(x, y)

현재 점과 지정된 점 (x, y) 사이를 잇는 선을 그림

### 원호 그리기 : arc(x, y, radius, startAngle, endAndle, anticlockwise)

(x, y) : 원의 중심 좌표

radius : 원의 반지름

startAngle : 원호의 시작 각도 (라디안 단위)

endAngle : 원호의 끝 각도 (라디안 단위)

anticlockwise : true면 반시계 방향, false면 시계 방향

```jsx
var radians = degree * Math.PI / 180
```

### 원호를 사용하여 둥근 모서리 그리기 : arcTo(x1, y1, x2, y2, radius)

![IMG_8600.jpeg](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/87345bba-8bd0-4fc4-adde-dc2f2d611d74/IMG_8600.jpeg)

현재 좌표 (x0, y0)을 시작점으로 삼아 (x1, y1)에서 반지름이 radius인 원호를 그림

(x2, y2)까지 선을 현재 좌표에서 원호의 마지막 점까지 그림

## - 그래픽스 속성 설정하기

사각형이나 패스를 그리기 전 stroke와 fill 메서드로 패스를 그리기 전에 설정하면 그림에 반영

패스 자체에는 프로퍼티가 없으므로 패스를 정의할 때 선 색상 등을 설정할 수 없음

### 색상 설정 : strokeStyle, fillStyle

```jsx
ctx.strokeStyle = "red";
ctx.fillStyle = "blue";
```

### 투명도 설정 : globalAlpha

0 ~ 1의 값, 0은 완전 투명, 1은 완전 불투명, 초기값은 1

모든 도형에 투명도를 동일하게 설정하려면 globalAlpha 프로퍼티 사용

도형마다 다르게 설정하려면 strokeStyle, fillStyle 프로퍼티 값에 CSS의 rgba 함수를 문자열로 입력

```jsx
ctx.globalAlpha = "0.6"
```

### 선의 두께 설정 : lineWidth

양의 정수를 대입, 초기값은 1

1 미만인 소수도 설정할 수 있지만 이때는 두께는 비율에 따라 1픽셀씩 반투명으로 그림

```jsx
ctx.lineWidth = 2;
ctx.strokeRect(10,10,100,80);
ctx.lineWidth = 10;
ctx.fillRect(150,10,100,80);
```

### 패스 종단점 모양의 설정 : lineCap

열린 패스의 종단점 모양을 설정

“butt” “square” “round”

![IMG_8601.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/f103cfaa-ca46-47ed-a452-8afb70888d47/IMG_8601.png)

### 패스 정점의 설정 : lineJoin

패스의 정점 모양을 설정

“bevel” “round” “miner” 

![IMG_8602.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/85ca843e-bc26-46e3-badb-44c972265477/fb947a85-5068-4c89-b720-0a6e66c1706c/IMG_8602.png)

## - 그림 읽어 들이기

URL이 가리키는 이미지 파일

Canvas로 그린 컴퓨터 그래픽스

img 요소 객체

video 요소 객체 등

# # 조건문

## - if/else문

조건의 만족 여부에 따라 처리할 작업을 선택

1. if ( 조건식 ) 문장
    
    조건식이 true로 평가되면 문장을 실행
    
2. if ( 조건식 ) 문장1  else { 문장2 }
    
    조건식이 true로 평가되면 문장1 실행, false로 평가되면 문장2 실행
    
3. if ( 조건식 ) 문장1  else if ( 조건식2 ) { 문장2 }  . . .  else { 문장n }

<예제> 고혈압 여부 확인하기

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>고혈압 여부 확인하기</title>
    <script>
        window.onload = function() {
            document.getElementById("button").onclick = function() {
                // 수축기 혈압 (최고 혈압)을 구한다
                var hp = parseFloat(document.getElementById("highpressure").value);
                // 이완기 혈압 (최저 혈압)을 구한다
                var lp = parseFloat(document.getElementById("lowpressure").value);
                // 판정 결과를 내보낼 HTML 요소
                var judgement = document.getElementById("judgement");
                // 고혈압 여부를 판정하여 HTML 요소에 출력한다
                if( hp<120 && lp<80 ) {
                    judgement.innerHTML = "당신의 혈압은 정상입니다";
                } else if( hp<139 && lp<89 ) {
                    judgement.innerHTML = "당신의 혈압은 다소 높습니다";
                } else {
                    judgement.innerHTML = "당신은 고혈압입니다";
                }
            };
        };
    </script>
</head>
<body>
    <p>수축기 혈압 (최고 혈압) : <input type="number" id="highpressure"></p>
    <p>이완기 혈압 (최저 혈압) : <input type="number" id="lowpressure"></p>
    <p id="judgement">이곳에 판정 결과가 표시됩니다 </p>
    <input type="button" id="button" value="확인하기">
    </body>
</html>
```

## - switch문

분기점을 여러 개 만들면 복잡해지는 if문의 문제를 해결

분기점 여러 개를 간결하게 표현할 수 있음

case 라벨은 분기의 시작을 명시할 뿐 끝을 명시하지는 않음

⇒ break문이나 return문을 사용하지 않으면 bradk문, return문, switch 블록의 끝을 만날 때까지 발견한 모든 문장을 실행 : 폴 스루 fall through

default 라벨의 실행문

switch문의 표현식이 평가된 값이 어떠한 case 라벨과도 일치하지 않을 때 마지막으로 실행되는 문장

switch ( 표현식 ) {

case 표현식1 : 실행문1 ( 문장 여러 개 )

case 표현식2 : 실행문2 ( 문장 여러 개 )

. . .

case 표현식n : 실행문n ( 문장 여러 개 )

default : 실행문 n + 1 ( 문장 여러 개 )

}

<예제> 이항 연산

```jsx
function binaryOperation(a, b, operator) {
	switch(operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
      case "%": return a % b;
      case "^": return Math.pow(a, b);
      default: return NaN;
	}
}
console.log(binaryOperation(2,3,"+"));
console.log(binaryOperation(2,3,"-"));
console.log(binaryOperation(2,3,"*"));
console.log(binaryOperation(2,3,"^"));
console.log(binaryOperation(2,3,"A"));
```

# # 반복문

## - while문

조건만 맞아 떨어지면 일정한 처리를 반복해서 실행

while ( 조건문 ) 문장

조건식을 평가한 결과가 false면 while문을 빠져 나와 다음 처리로 이동

조건식을 평가한 결과가 true면 문장을 실행하고 다시 한번 조건식을 평가

while문 안에서 break를 실행하면 while문을 빠져나옴

while문 안에서 continue를 실행하면 while문의 시작 부분으로 되돌아감

<예제> 팩토리얼

```jsx
function fact(n) {
    var k = 1, i = 1;
    while( i < n ) {
        console.log("i = " + i + ", k = " + k );
        k *= (++i);

    }
    console.log("i = " + i + ", k = " + k );
    return k;
}

fact(5);
```

## - do/while문

반복해서 실행할지 여부를 마지막 부분에서 판단

끝에 반드시 세미콜론이 붙음

문장이 반드시 한 번 이상 실행

do 문장 while ( 조건식 );

먼저 문장을 실행하고 조건식을 평가

조건식을 평가한 결과가 false면 do/while문을 빠져 나와 다음 처리로 이동

조건식을 평가한 결과가 true면 문장을 실행하고 다시 한번 조건식을 평가

<예제> 팩토리얼

```jsx
function fact(n) {
	var k = 1, i = n;
	do {
		k *= i--;
	} while( i>0 );
	return k;
}
fact(5); // -> 120
```

## - for문

반복문의 공통점

1. 반복 조건의 초기화 작업
2. 반복문 조건식
3. 반복 작업이 하나 끝났을 때 반복 조건을 갱신하는 작업

for문은 이 세가지 작업을 명시적으로 한 곳에 모아 표기

⇒ 어떤 반복 처리를 하는지 이해하기 쉽고 반복 조건의 초기화 작업과 갱신 작업을 빠뜨리는 등의 실수를 미연에 방지할 수 있음

for(  초기화 식;  조건식;  반복식 )  문장

반복문을 실행하기 전에 초기화 식을 단 한 번 실행

조건식을 평가한 결과가 false이면 for문을 빠져 나와 다음 처리로 이동

조건식을 평가한 결과가 true이면 문장을 실행한 후에 반복식을 실행, 다시 for문의 시작 부분으로

<예제> 배열 요소의 합계 구하기

```jsx
function sumArray(a) {
	var sum = 0;
	for(var i=0; i < a.length; i++) {
		sum += a[i];
	}
	return sum;
}
var a = [3,5,1,2,6,7];
console.log(sumArray(a)); // -> 24

// i < a.length 부분을 아래 코드로 대체해도 동일한 값이 나옴
// i <= a.length -1
```

<예제> 피타고라스의 수 구하기 : 중첩반복문

```jsx
var n = 20;
for(var a = 1; a <= n; a++) {
   for(var b = 1; b <= n; b++) {
      for(var c = 1; c <= n; c++) {
         if( a*a + b*b == c*c ) {
            console.log(a + "^2 + " + b + "^2 = " + c + "^2");
         }
      }
   }
}
```

## - for/in문

객체 안의 프로퍼티를 순회하는 반복문

for ( 변수 in 객체 표현식 ) 문장

객체 표현식이 null 또는 undefined로 평가되면 for/in문을 빠져나와 다음 작업으로 이동

객체 표현식이 객체로 평가되면 객체의 프로퍼티 이름이 차례대로 변수에 할당, 각각의 프로퍼티에 대해 문장이 한 번씩 실행

# # 점프문

## - 라벨문

자바스크립트에서는 모든 문장에 라벨을 붙일 수 있음

라벨이름에는 모든 식별자 사용 가능

라벨로 점프할 수 있는 문장은 break문과 continue문뿐임

라벨이름 : 문장

## - break문

switch문과 반복문 안에서만 사용 가능

break  라벨이름(옵션);

## - continue문

반복문 안에서만 사용 가능

continue  라벨이름(옵션);
