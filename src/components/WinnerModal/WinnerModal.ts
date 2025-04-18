import { LitElement, html, css } from 'lit';

export class WinnerModal extends LitElement {
    static properties = {
        show: { type: Boolean, reflect: true },
        winnerName: { type: String, attribute: 'winner-name' },
        winnerAvatar: { type: String, attribute: 'winner-avatar' },
        titleText: { type: String, attribute: 'title-text' },
        winnerLabel: { type: String, attribute: 'winner-label' }
    };

    // Define property types
    show: boolean = false;
    winnerName: string = 'Desconocido';
    winnerAvatar: string = 'https://placehold.co/100x100/cccccc/ffffff?text=Avatar';
    titleText: string = '¡Felicidades!';
    winnerLabel: string = 'El ganador es:';

    static styles = css`
    :host {
      font-family: 'Inter', sans-serif;
      --modal-z-index: 100;
      --modal-background-color: rgba(0,0,0,0.6);
      --modal-content-background: #fefefe;
      --modal-content-border-color: #888;
      --modal-content-shadow: 0 5px 15px rgba(0,0,0,0.3);
      --modal-max-width: 400px;
      --modal-padding: 30px;
      --modal-border-radius: 10px;
      --avatar-size: 100px;
      --avatar-border-color: #ddd;
      --close-button-color: #aaa;
      --close-button-hover-color: #333;
      --title-color: #28a745;
      --text-color: #333;
      --label-color: #555;
    }

    .modal-overlay {
      display: none;
      position: fixed;
      z-index: var(--modal-z-index);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: var(--modal-background-color);
      align-items: center;
      justify-content: center;
    }

    :host([show]) .modal-overlay {
      display: flex;
    }

    .modal-content {
      position: relative;
      background-color: var(--modal-content-background);
      margin: auto;
      padding: var(--modal-padding);
      border: 1px solid var(--modal-content-border-color);
      width: 80%;
      max-width: var(--modal-max-width);
      border-radius: var(--modal-border-radius);
      text-align: center;
      box-shadow: var(--modal-content-shadow);
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-content img {
      display: block;
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 50%;
      margin: 0 auto 15px auto;
      border: 3px solid var(--avatar-border-color);
      object-fit: cover;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      color: var(--close-button-color);
      font-size: 28px;
      font-weight: bold;
      line-height: 1;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .close-button:hover,
    .close-button:focus {
      color: var(--close-button-hover-color);
      text-decoration: none;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: var(--title-color);
    }

    .winner-label {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--label-color);
    }

    .winner-name {
      font-size: 1.25rem;
      margin-bottom: 0;
      color: var(--text-color);
    }

    ::slotted(*) {
      margin-top: 1rem;
      color: var(--text-color);
    }
  `;

    constructor() {
        super();
        // Default values are already assigned with types above
    }

    render() {
        return html`
      <div class="modal-overlay" part="overlay">
        <div class="modal-content" part="content">
          <span class="close-button" part="close-button" aria-label="Cerrar modal" @click=${this.closeModal}>&times;</span>
          <h2 id="modal-title" part="title">${this.titleText}</h2>
          <img id="winner-avatar" src=${this.winnerAvatar} alt="Avatar de ${this.winnerName}" part="avatar" @error=${this._handleImageError}>
          <p class="winner-label" id="winner-label" part="winner-label">${this.winnerLabel}</p>
          <p class="winner-name" id="winner-name" part="winner-name">${this.winnerName}</p>
          <slot></slot>
        </div>
      </div>
    `;
    }

    _handleImageError(): void {
        this.winnerAvatar = 'https://placehold.co/100x100/cccccc/ffffff?text=Error';
    }

    openModal(): void {
        this.show = true;
        this.dispatchEvent(new CustomEvent('opened'));
    }

    closeModal(): void {
        this.show = false;
        this.dispatchEvent(new CustomEvent('closed'));
    }

    setWinnerInfo(name: string, avatarUrl: string, title: string = '¡Felicidades!', label: string = 'El ganador es:'): void {
        this.winnerName = name;
        this.winnerAvatar = avatarUrl;
        this.titleText = title;
        this.winnerLabel = label;
        this.requestUpdate();
    }
}

customElements.define('winner-modal', WinnerModal); 