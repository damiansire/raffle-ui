#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// --- Helper para convertir PascalCase a kebab-case ---
function toKebabCase(str) {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
    .replace(/\\s+/g, '-') // replace spaces with dashes
    .toLowerCase(); // convert to lower case
}

// --- Obtener nombre del componente del argumento ---
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Por favor, proporciona un nombre para el componente.');
  console.log('💡 Ejemplo: npm run generate:component -- MiNuevoComponente');
  process.exit(1);
}

// Validar que sea PascalCase (simplificado)
if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
    console.error(`❌ Error: El nombre del componente "${componentName}" debe estar en PascalCase (ej. MiComponente).`);
    process.exit(1);
}


const tagName = toKebabCase(componentName);
const componentDir = path.join('src', 'components', componentName);
const componentFile = path.join(componentDir, `${componentName}.ts`);
const storyFile = path.join(componentDir, `${componentName}.stories.ts`);

// --- Plantilla para el Componente (.ts) ---
const componentTemplate = `import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Un componente de ejemplo: ${componentName}
 *
 * @slot - Este es el slot por defecto
 * @cssprop --${tagName}-text-color - Color del texto
 */
@customElement('${tagName}')
export class ${componentName} extends LitElement {
  static styles = css\`
    :host {
      display: block;
      padding: 16px;
      border: 1px solid #ccc;
      color: var(--${tagName}-text-color, #000);
      font-family: sans-serif;
    }
  \`;

  /**
   * El título a mostrar
   */
  @property({ type: String })
  title = '${componentName}';

  /**
   * Contador interno
   */
  @property({ type: Number })
  counter = 0;

  render() {
    return html\`
      <h2>\${this.title} Nr. \${this.counter}!</h2>
      <button @click=\${this._onClick} part="button">
        Click Me!
      </button>
      <slot></slot>
    \`;
  }

  private _onClick() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('count-changed', { detail: { count: this.counter } }));
  }
}

// Asegura que el tipo global esté disponible para plantillas TSX/JSX si se usan
declare global {
  interface HTMLElementTagNameMap {
    '${tagName}': ${componentName};
  }
}
`;

// --- Plantilla para las Historias (.stories.ts) ---
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './${componentName}'; // Importa el componente para registrar el custom element

// Importa la clase SOLO para type hints y controles automáticos de Storybook
import { ${componentName} } from './${componentName}';

const meta: Meta<${componentName}> = {
  title: 'Components/${componentName}', // Ruta en la barra lateral de Storybook
  component: '${tagName}', // La etiqueta del custom element
  tags: ['autodocs'], // Habilita la página de documentación automática
  argTypes: {
    // Ejemplo de cómo definir controles más específicos
    title: {
      control: 'text',
      description: 'El título principal del componente',
    },
    counter: {
      control: 'number',
      description: 'Valor inicial del contador',
    },
    // Los slots y CSS custom properties necesitan configuración manual si quieres controles
    // slot: { control: 'text', description: 'Contenido del slot por defecto' },
  },
  render: (args) => html\`
    <${tagName}
      .title=\${args.title}
      .counter=\${args.counter}
    >
     <!-- Ejemplo de contenido para el slot -->
     <p>Contenido del Slot</p>
    </${tagName}>\`
};

export default meta;
type Story = StoryObj<${componentName}>;

export const Default: Story = {
  args: {
    // Valores por defecto para la historia principal
    title: 'Componente ${componentName}',
    counter: 0,
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Este es un título diferente',
    counter: 5,
  },
};

export const SlottedContent: Story = {
    render: (args) => html\`
    <${tagName}
      .title=\${args.title}
      .counter=\${args.counter}
    >
     <img src="https://placehold.co/100x50/orange/white?text=Slotted" alt="Placeholder"/>
     <p>Más contenido aquí.</p>
    </${tagName}>\`,
    args: {
        title: 'Con Slot',
        counter: 10
    }
}
`;

// --- Lógica de Creación de Archivos ---
console.log(`⏳ Generando componente ${componentName}...`);

if (fs.existsSync(componentDir)) {
  console.error(`❌ Error: El directorio "${componentDir}" ya existe.`);
  process.exit(1);
}

try {
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`✅ Creado directorio: ${componentDir}`);

  fs.writeFileSync(componentFile, componentTemplate);
  console.log(`✅ Creado archivo de componente: ${componentFile}`);

  fs.writeFileSync(storyFile, storyTemplate);
  console.log(`✅ Creado archivo de historias: ${storyFile}`);

  console.log(`\n🎉 ¡Componente ${componentName} generado exitosamente!`);
  console.log(`\n🚀 Pasos siguientes:`);
  console.log(`   1. Revisa y ajusta el código en ${componentDir}`);
  console.log(`   2. Importa y exporta tu componente desde src/index.ts`);
  console.log(`   3. Ejecuta 'npm run storybook' para verlo en acción.`);

} catch (error) {
  console.error('❌ Error al generar los archivos:', error);
  // Intenta limpiar si falló
  if (fs.existsSync(componentFile)) fs.unlinkSync(componentFile);
  if (fs.existsSync(storyFile)) fs.unlinkSync(storyFile);
  if (fs.existsSync(componentDir) && fs.readdirSync(componentDir).length === 0) {
       fs.rmdirSync(componentDir);
  }
  process.exit(1);
} 