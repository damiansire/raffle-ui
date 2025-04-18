import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import './Button.css';

export class RaffleButton extends HTMLElement {
  static get observedAttributes() {
    return ['primary', 'size', 'label', 'background-color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.primary = false;
    this.size = 'medium';
    this.label = '';
    this.backgroundColor = null;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  render() {
    const mode = this.primary ? 'raffle-button--primary' : 'raffle-button--secondary';
    
    this.shadowRoot.innerHTML = html`
      <button
        type="button"
        class=${['raffle-button', `raffle-button--${this.size}`, mode].join(' ')}
        style=${styleMap({ backgroundColor: this.backgroundColor })}
      >
        ${this.label}
      </button>
    `;
  }
}

customElements.define('raffle-button', RaffleButton); 