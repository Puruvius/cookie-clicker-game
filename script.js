let cookies = 0;
let prestige = 0;

const upgrades = {
    1: { count: 0, baseCost: 10, currentCost: 10, name: 'Cursor', cps: 1 },
    2: { count: 0, baseCost: 50, currentCost: 50, name: 'Grandma', cps: 5 },
    3: { count: 0, baseCost: 150, currentCost: 150, name: 'Farm', cps: 10 },
    4: { count: 0, baseCost: 500, currentCost: 500, name: 'Factory', cps: 25 },
    5: { count: 0, baseCost: 1000, currentCost: 1000, name: 'Mine', cps: 50 }
};

const cookieElement = document.getElementById('cookie');
const cookiesCountElement = document.getElementById('cookiesCount');
const cpsCountElement = document.getElementById('cpsCount');
const upgradeButtons = document.querySelectorAll('.upgrade-button');
const prestigeButton = document.getElementById('prestigeButton');
const buyMaxButtons = document.querySelectorAll('.buy-max-button');

// Cookie click
cookieElement.addEventListener('click', function () {
    cookies += 1 * getPrestigeMultiplier();
    updateCookiesDisplay();
});

// Upgrade purchases
upgradeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const id = this.dataset.id;
        const upgrade = upgrades[id];

        if (cookies >= upgrade.currentCost) {
            cookies -= upgrade.currentCost;
            upgrade.count++;
            upgrade.currentCost = Math.floor(upgrade.currentCost * 1.1);
            updateUpgradeButtonText(id);
            updateCookiesDisplay();
            updateUpgradeButtonState();
        } else {
            alert("You need more cookies!");
        }
    });
});

// Buy Max logic
buyMaxButtons.forEach(button => {
    button.addEventListener('click', function () {
        const id = this.dataset.id;
        const upgrade = upgrades[id];

        while (cookies >= upgrade.currentCost) {
            cookies -= upgrade.currentCost;
            upgrade.count++;
            upgrade.currentCost = Math.floor(upgrade.currentCost * 1.1);
        }

        updateUpgradeButtonText(id);
        updateCookiesDisplay();
        updateUpgradeButtonState();
    });
});

// Prestige handler
prestigeButton.addEventListener('click', function () {
    if (cookies >= 100000) {
        prestige += cookies / 100000;
        cookies = 0;

        // Reset upgrades
        for (const id in upgrades) {
            upgrades[id].count = 0;
            upgrades[id].currentCost = upgrades[id].baseCost;
            updateUpgradeButtonText(id);
        }

        alert(`Prestiged! Your bonus multiplier is now x${getPrestigeMultiplier().toFixed(2)}`);
        updateCookiesDisplay();
        updateUpgradeButtonState();
    } else {
        alert("You need at least 100,000 cookies to prestige!");
    }
});

// Prestige multiplier function
function getPrestigeMultiplier() {
    return 1 + (prestige * 0.1); // Each prestige adds 10% bonus
}

// Display updates
function updateCookiesDisplay() {
    cookiesCountElement.innerText = `Cookies: ${Math.floor(cookies)}`;
    document.getElementById('cursorsCount').innerText = `Cursors: ${upgrades[1].count}`;
    updateCpsDisplay();
}

function updateCpsDisplay() {
    const baseCps = Object.values(upgrades).reduce((sum, upg) => sum + (upg.count * upg.cps), 0);
    const totalCps = baseCps * getPrestigeMultiplier();
    cpsCountElement.innerText = `Cookies per second: ${totalCps.toFixed(1)}`;

    document.getElementById('cursorCps').innerText = `Cursors: ${upgrades[1].count * upgrades[1].cps * getPrestigeMultiplier()} cookies/sec`;
    document.getElementById('grandmaCps').innerText = `Grandmas: ${upgrades[2].count * upgrades[2].cps * getPrestigeMultiplier()} cookies/sec`;
    document.getElementById('farmCps').innerText = `Farms: ${upgrades[3].count * upgrades[3].cps * getPrestigeMultiplier()} cookies/sec`;
    document.getElementById('factoryCps').innerText = `Factories: ${upgrades[4].count * upgrades[4].cps * getPrestigeMultiplier()} cookies/sec`;
    document.getElementById('mineCps').innerText = `Mines: ${upgrades[5].count * upgrades[5].cps * getPrestigeMultiplier()} cookies/sec`;
}

function updateUpgradeButtonState() {
    upgradeButtons.forEach(button => {
        const id = button.dataset.id;
        const upgrade = upgrades[id];
        button.disabled = cookies < upgrade.currentCost;
        button.style.opacity = cookies < upgrade.currentCost ? 0.5 : 1;
    });
}

function updateUpgradeButtonText(id) {
    const upgrade = upgrades[id];
    const button = document.querySelector(`.upgrade-button[data-id="${id}"]`);
    if (button) {
        button.innerText = `Buy ${upgrade.name} (Cost: ${upgrade.currentCost} Cookies)`;
        button.dataset.cost = upgrade.currentCost;
    }
}

// Game loop
function gameLoop() {
    const baseCps = Object.values(upgrades).reduce((sum, upg) => sum + (upg.count * upg.cps), 0);
    const totalCps = baseCps * getPrestigeMultiplier();
    cookies += totalCps / 60;
    updateCookiesDisplay();
}

// Initialize upgrade button labels
Object.keys(upgrades).forEach(id => updateUpgradeButtonText(id));

// Start game loop
setInterval(gameLoop, 1000 / 60);
setInterval(updateUpgradeButtonState, 100);
