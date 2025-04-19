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

### Generating New Components

To scaffold a new component (including its Lit element file and Storybook story file), use the `generate:component` script:

```bash
npm run generate:component -- ComponentName
```

Replace `ComponentName` with the desired name for your component.

*   **Naming Convention:** It's recommended to provide the name in **PascalCase** (e.g., `UserProfileCard`).
*   **Automatic Conversion:** If you provide a name in another format (like `lowercase` or `kebab-case`), the script will attempt to convert it to PascalCase automatically and show a warning (e.g., `user-profile-card` becomes `UserProfileCard`).
*   **Output:** This will create:
    *   `src/components/ComponentName/ComponentName.ts`
    *   `src/components/ComponentName/ComponentName.stories.ts`

*   **Next Steps (Manual):**
    1.  Edit the generated files in `src/components/ComponentName/` to implement your component's logic and stories.
    2.  Export the new component from the main entry point: `src/index.ts`.

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