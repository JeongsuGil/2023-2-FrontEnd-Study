# Week7

---

# CSS-in-JS 라이브러리

출처 : https://wikidocs.net/197755

CSS-in-JS는 JavaScript와 React 생태계에서 인기있는 스타일링 기술로, JavaScript의 기능을 CSS에 적용할 수 있는 능력으로 인해 인기를 얻었습니다. CSS 파일을 별도로 작성하는 대신, CSS-in-JS를 사용하면 개발자는 JavaScript 코드 내에서 직접 CSS를 작성할 수 있습니다. 이 접근 방식은 JavaScript 변수와 함수를 스타일 내에서 사용할 수 있는 기능, 프롭에 따라 동적으로 스타일을 적용할 수 있는 기능 및 스타일을 컴포넌트로 한정하여 이름 충돌과 특정성 문제를 해결할 수 있는 기능 등 여러 가지 이점을 제공합니다.

CSS-in-JS의 가장 큰 장점 중 하나는 컴포넌트 기반 스타일링을 다룰 수 있는 능력입니다. 전통적인 CSS에서는 애플리케이션이 커짐에 따라 컴포넌트 간 스타일을 관리하기 어려워질 수 있습니다. 그러나 CSS-in-JS는 스타일을 컴포넌트에 직접 연결하여 이 프로세스를 간소화합니다.

## ****Styled-components****

다양한 CSS-in-JS 라이브러리 중에서 `styled-components`는 가장 인기 있고 널리 사용되는 라이브러리입니다. `styled-components`는 React 컴포넌트를 스타일링하는 데 사용되며, ES6와 CSS를 사용하여 컴포넌트에 스타일을 적용할 수 있습니다. 이 라이브러리는 컴포넌트와 스타일 간의 매핑을 제거하므로, 스타일을 정의할 때 실제로 스타일이 적용된 일반적인 React 컴포넌트를 생성합니다.

`styled-components`의 주요 기능 중 하나는 컴포넌트에 프롭을 전달하여 스타일을 동적으로 변경할 수 있는 능력입니다. 이는 매우 강력한 기능으로, 매우 재사용 가능한 컴포넌트를 만들 수 있게 해줍니다.

React 애플리케이션에서 `styled-components`를 설정하는 것은 간단합니다. 먼저 npm이나 yarn을 사용하여 설치합니다.

```bash
npm install styled-components
# 또는
yarn add styled-components
```

`styled-components`를 사용하려면 컴포넌트 파일에 먼저 import해야 합니다.

```jsx
import styledfrom 'styled-components';
```

`styled-components`를 사용하면 `styled` 객체를 사용하여 스타일이 적용된 새로운 컴포넌트를 생성합니다. 다음은 스타일이 적용된 버튼의 예입니다.

```jsx
const Button = styled.button`
  padding: 10px 20px;
  background-color: palevioletred;
  color: white;
  border-radius: 4px;
  border: none;
  font-size: 1em;
`;

functionApp() {
return <Button>Click me</Button>;
}
```

Props에 따라 컴포넌트의 스타일을 변경하려면, 컴포넌트의 Props을 사용하는 함수를 사용할 수 있습니다.

```jsx
constButton = styled.button`
  /* ... */
  background-color: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;

functionApp() {
return (
    <>
      <Button primary>Primary Button</Button>
      <Button>Default Button</Button>
    </>
  );
}
```

이 예제에서 `Button` 컴포넌트는 `primary` Props을 받아서 배경색과 텍스트 색상을 결정합니다.

앞으로 우리는 `styled-components`의 강력함을 더 자세히 탐구하고, 이를 활용하여 더 복잡하고 동적인 스타일을 만드는 방법에 대해 논의할 것입니다. 이는 현대적인 React 애플리케이션에서 스타일링에 대한 견고한 솔루션을 제공하며, React 개발 과정에서 마주칠 수 있는 모든 스타일링 요구 사항을 처리하는 데 필요한 기술을 제공할 것입니다.
