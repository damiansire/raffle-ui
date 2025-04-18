import type { Meta, StoryObj } from '@storybook/web-components';
import { ContributionGrid } from './ContributionGrid';
// Import the function from the JS file (make sure your build setup allows this)
function generateDemoParticipants(count = 200) {
    const names = ["Ana", "Luis", "Carlos", "Maria", "Juan", "Elena", "Pedro", "Sofia", "Miguel", "Lucia"];
    const participants = [];
    for (let i = 0; i < count; i++) {
        participants.push({
            id: i.toString(),
            name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
            avatar: `https://placehold.co/100x100/E0E7FF/4338CA?text=P${i + 1}`,
            contributionLevel: Math.floor(Math.random() * 5)
        });
    }
    return participants;
}

// Register the custom element if it's not already registered globally
if (!customElements.get('contribution-grid')) {
    customElements.define('contribution-grid', ContributionGrid);
}

// Define the interface for the component's props based on its properties
// We extend the base class to get its types automatically
interface ContributionGridProps extends ContributionGrid { }

const meta: Meta<ContributionGridProps> = {
    title: 'Components/ContributionGrid',
    component: 'contribution-grid', // Use the tag name for web components
    argTypes: {
        participants: { control: 'object' },
        columns: { control: 'number' },
        illuminationDuration: { control: 'number' },
        illuminationInterval: { control: 'number' },
    },
    // Define how the component should be rendered
    render: (args) => {
        const grid = document.createElement('contribution-grid') as ContributionGrid;
        // Assign properties from args to the element
        grid.participants = args.participants ?? [];
        grid.columns = args.columns ?? 20;
        grid.illuminationDuration = args.illuminationDuration ?? 3000;
        grid.illuminationInterval = args.illuminationInterval ?? 100;
        return grid;
    },
};

export default meta;
type Story = StoryObj<ContributionGridProps>;

// Story using the imported demo data function
export const Default: Story = {
    args: {
        participants: generateDemoParticipants(200),
        columns: 20,
        illuminationDuration: 3000,
        illuminationInterval: 100,
    },
};

// Example of another story
export const SmallGrid: Story = {
    args: {
        ...Default.args, // Reuse args from Default
        participants: generateDemoParticipants(50),
        columns: 10,
    },
};

// Add the interactive story similar to the JS version
export const Interactive: Story = {
    render: () => {
        const container = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = 'Iniciar Selección';
        // Add some basic styling to the button
        button.style.marginBottom = '20px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#10b981'; // Emerald 500
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';

        const grid = document.createElement('contribution-grid') as ContributionGrid;
        grid.participants = generateDemoParticipants(200); // Use the fixed generator
        grid.columns = 20;

        const winnerInfo = document.createElement('div');
        winnerInfo.style.marginTop = '20px';
        winnerInfo.style.padding = '15px';
        winnerInfo.style.border = '1px solid #a7f3d0'; // Emerald 200
        winnerInfo.style.borderRadius = '8px';
        winnerInfo.style.display = 'none'; // Initially hidden

        button.addEventListener('click', async () => {
            button.disabled = true;
            button.textContent = 'Seleccionando...';
            winnerInfo.style.display = 'none';

            try {
                // The startSelectionAnimation method returns Promise<Participant | null>
                const winner = await grid.startSelectionAnimation();

                if (winner) {
                    // Access properties from the participant object. Assume name/avatar exist from generator.
                    const winnerName = (winner as any).name || 'N/A';
                    const winnerAvatar = (winner as any).avatar || '';

                    winnerInfo.innerHTML = `
            <h3>¡Ganador Seleccionado!</h3>
            <p>ID: <strong>${winner.id}</strong></p>
            <p>Name: <strong>${winnerName}</strong></p>
            <img src="${winnerAvatar}" alt="Winner Avatar" style="width:50px; height:50px; border-radius:50%; margin-top:10px;" onerror="this.src='https://placehold.co/50x50/cccccc/ffffff?text=Err'">
          `;
                    winnerInfo.style.display = 'block';
                } else {
                    winnerInfo.innerHTML = `<p>No winner selected (or no participants).</p>`;
                    winnerInfo.style.display = 'block';
                }
            } catch (error) {
                console.error("Error during selection:", error);
                winnerInfo.innerHTML = `<p style="color: red;">Error during selection.</p>`;
                winnerInfo.style.display = 'block';
            } finally {
                button.disabled = false;
                button.textContent = 'Iniciar Selección';
            }
        });

        container.appendChild(button);
        container.appendChild(grid);
        container.appendChild(winnerInfo);
        return container;
    },
    args: {
        // Set any default args needed for the component setup if render doesn't handle all
        // In this case, render handles participant/column setup directly.
    }
};

