let cookies = 0;
let cursors = 0;
let grandmas = 0;
let farms = 0;
let factories = 0;
let mines = 0;

const cookieElement = document.getElementById('cookie');
const cookiesCountElement = document.getElementById('cookiesCount');
const cpsCountElement = document.getElementById('cpsCount');
const upgradeButtons = document.querySelectorAll('.upgrade-button');

// Set up event listener for the cookie click
cookieElement.addEventListener('click', function() {
    cookies += 1; // Increment cookies by 1 for each click
    updateCookiesDisplay();
});

// Handle upgrade purchases
upgradeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cost = parseInt(this.dataset.cost); // Get the cost from the data attribute
        const id = this.dataset.id; // Get the upgrade ID

        if (cookies >= cost) {
            cookies -= cost; // Deduct cookies for upgrade
            switch (id) {
                case '1':
                    cursors++; // Increase cursor count
                    break;
                case '2':
                    grandmas++; // Increase grandma count
                    break;
                case '3':
                    farms++; // Increase farm count
                    break;
                case '4':
                    factories++; // Increase factory count
                    break;
                case '5':
                    mines++; // Increase mine count
                    break;
            }
            updateCookiesDisplay();
            updateUpgradeButtonState(); // Update the button state based on current cookies
        } else {
            alert("You need more cookies!");
        }
    });
});

// Function to update the displayed cookie count
function updateCookiesDisplay() {
    cookiesCountElement.innerText = `Cookies: ${cookies}`;
    document.getElementById('cursorsCount').innerText = `Cursors: ${cursors}`;
    updateCpsDisplay(); // Update CPS display every time cookies are updated
}

// Function to calculate and display Cookies per Second (CPS) and individual upgrade CPS
function updateCpsDisplay() {
    const cps = cursors + (grandmas * 5) + (farms * 10) + (factories * 25) + (mines * 50);
    cpsCountElement.innerText = `Cookies per second: ${cps}`;
    
    document.getElementById('cursorCps').innerText = `Cursors: ${cursors} cookies/sec`;
    document.getElementById('grandmaCps').innerText = `Grandmas: ${grandmas * 5} cookies/sec`;
    document.getElementById('farmCps').innerText = `Farms: ${farms * 10} cookies/sec`;
    document.getElementById('factoryCps').innerText = `Factories: ${factories * 25} cookies/sec`;
    document.getElementById('mineCps').innerText = `Mines: ${mines * 50} cookies/sec`;
}

// Function to generate cookies based on purchased upgrades every second
function generateCookies() {
    const cookiesPerSecond = cursors + (grandmas * 5) + (farms * 10) + (factories * 25) + (mines * 50);
    cookies += cookiesPerSecond; // Increment cookies based on upgrades
    updateCookiesDisplay(); // Update the display with new cookie count and CPS
}

// Function to manage upgrade button states
function updateUpgradeButtonState() {
    upgradeButtons.forEach(button => {
        const cost = parseInt(button.dataset.cost); // Get the cost from the button's data attribute
        button.disabled = cookies < cost; // Disable if not enough cookies
        button.style.opacity = cookies < cost ? 0.5 : 1; // Change opacity based on availability
    });
}

// Initial call to set upgrade button states based on starting cookie count
updateUpgradeButtonState();

// Automatically generate cookies every second
setInterval(generateCookies, 1000);
