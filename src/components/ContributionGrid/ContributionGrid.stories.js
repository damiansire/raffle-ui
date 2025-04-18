import { ContributionGrid } from './ContributionGrid.js';

// Función para generar participantes de ejemplo
function generateDemoParticipants(count = 200) {
    const names = ["Ana", "Luis", "Carlos", "Maria", "Juan", "Elena", "Pedro", "Sofia", "Miguel", "Lucia"];
    const participants = [];
    for (let i = 0; i < count; i++) {
        participants.push({
            id: i,
            name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
            avatar: `https://placehold.co/100x100/E0E7FF/4338CA?text=P${i + 1}`,
            contributionLevel: Math.floor(Math.random() * 5)
        });
    }
    return participants;
}

export default {
    title: 'Components/ContributionGrid',
    component: 'contribution-grid',
    argTypes: {
        participants: { control: 'object' },
        columns: { control: 'number' },
        illuminationDuration: { control: 'number' },
        illuminationInterval: { control: 'number' }
    }
};

const Template = (args) => {
    const grid = document.createElement('contribution-grid');
    grid.participants = args.participants;
    grid.columns = args.columns;
    grid.illuminationDuration = args.illuminationDuration;
    grid.illuminationInterval = args.illuminationInterval;
    return grid;
};

export const Default = Template.bind({});
Default.args = {
    participants: generateDemoParticipants(200),
    columns: 20,
    illuminationDuration: 3000,
    illuminationInterval: 100
};

export const SmallGrid = Template.bind({});
SmallGrid.args = {
    ...Default.args,
    participants: generateDemoParticipants(50),
    columns: 10
};

export const FastAnimation = Template.bind({});
FastAnimation.args = {
    ...Default.args,
    illuminationDuration: 1000,
    illuminationInterval: 50
};

// Historia interactiva con botón de inicio
const InteractiveTemplate = () => {
    const container = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = 'Iniciar Selección';
    button.style.marginBottom = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#10b981';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const grid = document.createElement('contribution-grid');
    grid.participants = generateDemoParticipants(200);
    grid.columns = 20;

    const winnerInfo = document.createElement('div');
    winnerInfo.style.marginTop = '20px';
    winnerInfo.style.padding = '15px';
    winnerInfo.style.backgroundColor = '#ecfdf5';
    winnerInfo.style.border = '1px solid #a7f3d0';
    winnerInfo.style.borderRadius = '8px';
    winnerInfo.style.textAlign = 'center';
    winnerInfo.style.minWidth = '300px';
    winnerInfo.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    winnerInfo.style.display = 'none';

    const winnerTitle = document.createElement('h3');
    winnerTitle.textContent = '¡Ganador Seleccionado!';
    winnerInfo.appendChild(winnerTitle);

    const winnerAvatar = document.createElement('img');
    winnerAvatar.style.width = '50px';
    winnerAvatar.style.height = '50px';
    winnerAvatar.style.borderRadius = '50%';
    winnerAvatar.style.margin = '10px auto 5px';
    winnerAvatar.style.display = 'block';
    winnerAvatar.style.border = '2px solid #6ee7b7';
    winnerInfo.appendChild(winnerAvatar);

    const winnerId = document.createElement('p');
    winnerId.innerHTML = 'ID: <strong></strong>';
    winnerInfo.appendChild(winnerId);

    const winnerName = document.createElement('p');
    winnerName.innerHTML = 'Nombre: <strong></strong>';
    winnerInfo.appendChild(winnerName);

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = 'Seleccionando...';
        winnerInfo.style.display = 'none';

        try {
            const winner = await grid.startSelectionAnimation();
            if (winner) {
                winnerAvatar.src = winner.avatar;
                winnerAvatar.onerror = () => winnerAvatar.src = 'https://placehold.co/50x50/cccccc/ffffff?text=Err';
                winnerId.querySelector('strong').textContent = winner.id;
                winnerName.querySelector('strong').textContent = winner.name;
                winnerInfo.style.display = 'block';
            }
        } catch (error) {
            console.error("Error durante la selección:", error);
        } finally {
            button.disabled = false;
            button.textContent = 'Iniciar Selección';
        }
    });

    container.appendChild(button);
    container.appendChild(grid);
    container.appendChild(winnerInfo);
    return container;
};

export const Interactive = InteractiveTemplate.bind({}); 