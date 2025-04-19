import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Un componente de ejemplo: Constellation
 *
 * @slot - Este es el slot por defecto
 * @cssprop --constellation-text-color - Color del texto
 */
@customElement('constellation')
export class Constellation extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 1px solid #ccc;
      color: var(--constellation-text-color, #000);
      font-family: sans-serif;
    }
  `;

  /**
   * El título a mostrar
   */
  @property({ type: String })
  title = 'Constellation';

  /**
   * Contador interno
   */
  @property({ type: Number })
  counter = 0;

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this._onClick} part="button">
        Click Me!
      </button>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('count-changed', { detail: { count: this.counter } }));
  }
}

// Asegura que el tipo global esté disponible para plantillas TSX/JSX si se usan
declare global {
  interface HTMLElementTagNameMap {
    'constellation': Constellation;
  }
}
