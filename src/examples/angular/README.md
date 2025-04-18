# Using Raffle UI in Angular

## Installation

```bash
npm install @raffle/ui
```

## Usage

1. Import the CUSTOM_ELEMENTS_SCHEMA in your app.module.ts:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Import the components in your main.ts:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@raffle/ui';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

3. Use the components in your templates:

```html
<raffle-button [primary]="true" size="medium" label="Click me"></raffle-button>

<raffle-header [user]="user"></raffle-header>

<raffle-page [user]="user"></raffle-page>
```

## Example Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <raffle-header [user]="user"></raffle-header>
    <raffle-page [user]="user"></raffle-page>
    <raffle-button [primary]="true" size="medium" label="Click me"></raffle-button>
  `,
})
export class AppComponent {
  user = {
    name: 'Jane Doe',
  };
}
``` 