import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

export class ContributionGrid extends LitElement {
    static properties = {
        participants: { type: Array },
        columns: { type: Number },
        illuminationDuration: { type: Number, attribute: 'illumination-duration' },
        illuminationInterval: { type: Number, attribute: 'illumination-interval' },
        _litSquareId: { state: true },
        _winnerSquareId: { state: true },
        _isSelecting: { state: true },
        _litColorIndex: { state: true },
        _gridColumnsStyle: { state: true }
    };

    static styles = css`
        :host {
            display: block;
            width: 100%;
            font-family: 'Inter', sans-serif;
            --grid-square-size: 20px;
            --grid-gap: 1px;
            --grid-border-radius: 3px;
            --grid-border-color: rgba(27, 31, 35, 0.06);
            --color-level-0: #ebedf0;
            --color-level-1: #9be9a8;
            --color-level-2: #40c463;
            --color-level-3: #30a14e;
            --color-level-4: #216e39;
            --color-lit-1: #fcd34d;
            --color-lit-2: #93c5fd;
            --color-lit-3: #fca5a5;
            --color-lit-4: #d8b4fe;
            --color-winner: #facc15;
            --winner-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }

        .grid-container {
            display: grid;
            gap: var(--grid-gap);
            padding: 5px;
            background-color: #ffffff;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .contribution-square {
            width: 100%;
            padding-bottom: 100%;
            height: 0;
            position: relative;
            background-color: var(--color-level-0);
            border: 1px solid var(--grid-border-color);
            border-radius: var(--grid-border-radius);
            transition: background-color 0.3s ease, transform 0.3s ease;
            cursor: default;
            box-sizing: border-box;
        }

        .level-1 { background-color: var(--color-level-1); }
        .level-2 { background-color: var(--color-level-2); }
        .level-3 { background-color: var(--color-level-3); }
        .level-4 { background-color: var(--color-level-4); }

        .lit {
            animation: pulse 0.5s infinite alternate;
        }
        .lit-color-1 { background-color: var(--color-lit-1) !important; }
        .lit-color-2 { background-color: var(--color-lit-2) !important; }
        .lit-color-3 { background-color: var(--color-lit-3) !important; }
        .lit-color-4 { background-color: var(--color-lit-4) !important; }

        @keyframes pulse {
            from { opacity: 1; }
            to { opacity: 0.6; }
        }

        .winner-square {
            transform: scale(1.5);
            z-index: 10;
            box-shadow: var(--winner-shadow);
            background-color: var(--color-winner) !important;
            border-color: rgba(0,0,0,0.2);
        }
    `;

    constructor() {
        super();
        this.participants = [];
        this.columns = 20;
        this.illuminationDuration = 3000;
        this.illuminationInterval = 100;
        this._litSquareId = null;
        this._winnerSquareId = null;
        this._isSelecting = false;
        this._litColorIndex = 0;
        this._animationIntervalId = null;
        this._animationTimeoutId = null;
        this._updateGridColumnsStyle();
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('columns')) {
            this._updateGridColumnsStyle();
        }
    }

    render() {
        return html`
            <div class="grid-container" style="${this._gridColumnsStyle}">
                ${repeat(this.participants, (participant) => participant.id, (participant) => html`
                    <div class="${this._getSquareClasses(participant)}"></div>
                `)}
            </div>
        `;
    }

    async startSelectionAnimation() {
        if (this._isSelecting || this.participants.length === 0) {
            console.warn("Selección ya en curso o no hay participantes.");
            return null;
        }

        return new Promise((resolve) => {
            this._isSelecting = true;
            this._resetSelectionState();
            this.requestUpdate();

            const totalSteps = Math.floor(this.illuminationDuration / this.illuminationInterval);
            let currentStep = 0;

            clearInterval(this._animationIntervalId);
            clearTimeout(this._animationTimeoutId);

            this._animationIntervalId = setInterval(() => {
                if (currentStep >= totalSteps) {
                    this._selectFinalWinner(resolve);
                    return;
                }
                this._illuminateRandomSquare();
                currentStep++;
            }, this.illuminationInterval);

            this._animationTimeoutId = setTimeout(() => {
                this._selectFinalWinner(resolve);
            }, this.illuminationDuration);

            this.dispatchEvent(new CustomEvent('selection-started'));
        });
    }

    _updateGridColumnsStyle() {
        this._gridColumnsStyle = `grid-template-columns: repeat(${this.columns}, minmax(0, 1fr));`;
    }

    _illuminateRandomSquare() {
        if (this.participants.length === 0) return;
        this._litSquareId = this.participants[Math.floor(Math.random() * this.participants.length)].id;
        this._litColorIndex = Math.floor(Math.random() * 4);
        this.requestUpdate();
    }

    _selectFinalWinner(resolvePromise) {
        clearInterval(this._animationIntervalId);
        clearTimeout(this._animationTimeoutId);
        this._animationIntervalId = null;
        this._animationTimeoutId = null;

        this._litSquareId = null;

        if (this.participants.length === 0) {
            this._isSelecting = false;
            this.requestUpdate();
            this.dispatchEvent(new CustomEvent('selection-complete', { detail: { winner: null } }));
            resolvePromise(null);
            return;
        }

        const winnerIndex = Math.floor(Math.random() * this.participants.length);
        const winner = this.participants[winnerIndex];
        this._winnerSquareId = winner.id;
        this._isSelecting = false;

        this.requestUpdate();

        this.dispatchEvent(new CustomEvent('selection-complete', {
            detail: { winner: winner },
            bubbles: true,
            composed: true
        }));
        resolvePromise(winner);
    }

    _resetSelectionState() {
        this._litSquareId = null;
        this._winnerSquareId = null;
    }

    _getSquareClasses(participant) {
        const isLit = participant.id === this._litSquareId;
        const isWinner = participant.id === this._winnerSquareId;
        let contributionClass = 'level-0';
        if (participant.contributionLevel !== undefined && participant.contributionLevel >= 0 && participant.contributionLevel <= 4) {
            contributionClass = `level-${participant.contributionLevel}`;
        }

        let litColorClass = '';
        if (isLit) {
            litColorClass = `lit-color-${this._litColorIndex + 1}`;
        }

        return classMap({
            'contribution-square': true,
            [contributionClass]: !isLit && !isWinner,
            'lit': isLit && !isWinner,
            [litColorClass]: isLit && !isWinner,
            'winner-square': isWinner,
        });
    }
}

customElements.define('contribution-grid', ContributionGrid); 