# Using Raffle UI in React

## Installation

```bash
npm install @raffle/ui
```

## Usage

1. Import the components in your main.js/tsx:

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import '@raffle/ui';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. Use the components in your React components:

```tsx
import React from 'react';

function App() {
  const user = {
    name: 'Jane Doe',
  };

  return (
    <div>
      <raffle-header user={user}></raffle-header>
      <raffle-page user={user}></raffle-page>
      <raffle-button primary size="medium" label="Click me"></raffle-button>
    </div>
  );
}

export default App;
```

## TypeScript Support

For TypeScript support, you can use the provided type definitions:

```typescript
import React from 'react';
import { RaffleButton, RaffleHeader, RafflePage } from '@raffle/ui';

function App() {
  const user = {
    name: 'Jane Doe',
  };

  return (
    <div>
      <raffle-header user={user}></raffle-header>
      <raffle-page user={user}></raffle-page>
      <raffle-button primary size="medium" label="Click me"></raffle-button>
    </div>
  );
}

export default App;
```

## Handling Events

To handle events from the components, you can use the standard DOM event listeners:

```tsx
import React, { useRef, useEffect } from 'react';

function App() {
  const buttonRef = useRef<HTMLRaffleButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', () => {
        console.log('Button clicked!');
      });
    }
  }, []);

  return (
    <div>
      <raffle-button
        ref={buttonRef}
        primary
        size="medium"
        label="Click me"
      ></raffle-button>
    </div>
  );
}

 