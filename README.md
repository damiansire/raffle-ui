# Raffle UI

A UI component library built with Web Components, compatible with Angular and React.

## Installation

```bash
npm install @raffle/ui
```

## Components

### Button

```html
<raffle-button
  primary
  size="medium"
  label="Click me"
></raffle-button>
```

### Header

```html
<raffle-header user="{user}"></raffle-header>
```

### Page

```html
<raffle-page user="{user}"></raffle-page>
```

## Usage with Angular

See [Angular Example](./src/examples/angular/README.md)

## Usage with React

See [React Example](./src/examples/react/README.md)

## Development

1. Install dependencies:

```bash
npm install
```

2. Start Storybook:

```bash
npm run storybook
```

3. Build the library:

```bash
npm run build
```

## Testing

```bash
npm test
```

## Publishing

1. Build the library:

```bash
npm run build
```

2. Publish to npm:

```bash
npm publish
```

## License

MIT 