declare class RaffleButton extends HTMLElement {
    primary: boolean;
    size: 'small' | 'medium' | 'large';
    label: string;
    backgroundColor: string | null;
}

declare class RaffleHeader extends HTMLElement {
    user: { name: string } | null;
}

declare class RafflePage extends HTMLElement {
    user: { name: string } | null;
}

declare global {
    interface HTMLElementTagNameMap {
        'raffle-button': RaffleButton;
        'raffle-header': RaffleHeader;
        'raffle-page': RafflePage;
    }
} 