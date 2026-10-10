
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
    document.querySelector(".title-screen").innerHTML = `
        <p class="royal-label">ROYAL RAILWAY AUTHORITY</p>

        <h1>Your First<br>Day on the Job</h1>

        <div class="station-scene">
            <div class="station-sign">BELLWEATHER CENTRAL</div>
            <div class="train">
                <div class="engine-window"></div>
                <div class="engine-face">◕‿◕</div>
                <div class="train-wheel wheel-one"></div>
                <div class="train-wheel wheel-two"></div>
            </div>
            <p class="platform-label">PLATFORM ROYAL · SHIFT 001</p>
        </div>

        <div class="dialogue-box">
            <p class="speaker">BEATRICE BELL · STATION ANNOUNCER</p>
            <p class="dialogue">
                "Welcome aboard, Inspector. Your predecessor
                has requested a transfer to a lighthouse.
                We wish you better luck."
            </p>
            <p class="dialogue">
                Your job is simple: inspect every ticket,
                follow the royal decrees, and try not to
                cause an international incident.
            </p>
        </div>

        <button id="continue-button">SHOW ME THE RULES →</button>

        <p class="footer-note">
            The king has already made three complaints.
        </p>
    `;

    document
        .getElementById("continue-button")
        .addEventListener("click", showRules);
});

function showRules() {
    document.querySelector(".title-screen").innerHTML = `
        <p class="royal-label">YOUR OFFICIAL RULEBOOK</p>
        <h1>Know Your<br>Royal Duties</h1>

        <div class="rule-card">
            <span class="rule-number">LAW 01</span>
            <h2>Mind Your Destination</h2>
            <p>
                Passengers may travel only to official
                railway stations.
            </p>
            <p class="example">
                Northwick: VALID<br>
                The Moon: ABSOLUTELY NOT
            </p>
        </div>

        <div class="rule-card">
            <span class="rule-number">LAW 02</span>
            <h2>Respect the Crown Stamp</h2>
            <p>
                Passengers who require a Royal Crown stamp
                must have one on their ticket.
            </p>
        </div>

        <div class="rule-card">
            <span class="rule-number">LAW 03</span>
            <h2>Three Words for Royalty</h2>
            <p>
                Passengers subject to the royal-title decree
                must have exactly three words in their ticket name.
            </p>
            <p class="example">
                Lady Lute: INVALID<br>
                Lady Amelia Lute: VALID
            </p>
        </div>

        <div class="rule-card">
            <span class="rule-number">A WORD FROM BEATRICE</span>
            <p>
                "It's a railway, Inspector. Not a teleportation service."
            </p>
        </div>

        <button id="begin-inspection">
            INSPECT FIRST PASSENGER →
        </button>

        <p class="footer-note">
            Remember: ignorance of the law is not a defence.
        </p>
    `;

    document
        .getElementById("begin-inspection")
        .addEventListener("click", showFirstPassenger);
}

const passengers = [
    {
        name: "Lady Lute",
        destination: "Northwick",
        stamp: "Royal Crown",
        ticketName: "Lady Lute",
        excuse: "Two words is quite enough for a lady of my standing.",
        validDestination: true,
        needsCrown: true,
        titleRule: true
    },
    {
        name: "Lady Amelia Lute",
        destination: "Northwick",
        stamp: "Royal Crown",
        ticketName: "Lady Amelia Lute",
        excuse: "I have three words, a crown stamp, and absolutely no patience.",
        validDestination: true,
        needsCrown: true,
        titleRule: true
    },
    {
        name: "Pip Turnip",
        destination: "Northwick",
        stamp: "None",
        ticketName: "Pip Turnip",
        excuse: "Morning! I brought snacks for the journey. They're mostly turnips.",
        validDestination: true,
        needsCrown: false,
        titleRule: false
    },
    {
        name: "Mister Moonboots",
        destination: "The Moon",
        stamp: "Royal Crown",
        ticketName: "Mister Moonboots",
        excuse: "One small step for a passenger. One enormous fare for the railway.",
        validDestination: false,
        needsCrown: true,
        titleRule: false
    },
    {
        name: "Captain Crumpet",
        destination: "Bellweather",
        stamp: "Royal Crown",
        ticketName: "Captain Crumpet",
        excuse: "I have inspected this ticket myself. I found myself extremely trustworthy.",
        validDestination: true,
        needsCrown: true,
        titleRule: false
    }
];

let currentPassengerIndex = 0;
let score = 0;
let inspectionHistory = [];
let currentDecree = 0;

const royalDecrees = [
    {
        title: "The Moon Is Not a Station",
        message: "The King insists that the Moon is not an official railway station.",
        effect: "normal"
    },
    {
        title: "A Stamp for Everyone!",
        message: "By royal order, EVERY passenger must carry a Royal Crown stamp.",
        effect: "all_need_stamp"
    },
    {
        title: "The Three-Word Decree",
        message: "Every passenger must now have exactly three words in their ticket name. The King has three words in his own name and considers this fair.",
        effect: "all_need_three_words"
    }
];
function showFirstPassenger() {
    currentPassengerIndex = 0;
    score = 0;
    inspectionHistory = [];
    currentDecree = 0;
    showPassenger();
}

function showPassenger() {

    if (currentPassengerIndex === 2 && currentDecree === 0) {
    currentDecree = 1;
    alert(
        "ROYAL DECREE!\n\n" +
        "The King has changed the law!\n\n" +
        "From this moment onward, EVERY passenger must have a Royal Crown stamp."
    );
}
    const passenger = passengers[currentPassengerIndex];

    document.querySelector(".title-screen").innerHTML = `
        <p class="royal-label">
            PASSENGER INSPECTION · ${currentPassengerIndex + 1} OF ${passengers.length}
        </p>

        <h1>Ticket<br>Inspection</h1>

        <div class="rule-card">
            <span class="rule-number">
                PASSENGER ${String(currentPassengerIndex + 1).padStart(3, "0")}
            </span>

            <h2>${passenger.name}</h2>
            <p>${passenger.excuse}</p>

            <p class="example">
                DESTINATION: ${passenger.destination}<br>
                STAMP: ${passenger.stamp}<br>
                TICKET NAME: ${passenger.ticketName}
            </p>

            <p>
                <strong>CURRENT ROYAL DECREES</strong><br>
                LAW 01: Destination must be an official station.<br>
                LAW 02: A Royal Crown stamp is required when specified.<br>
                LAW 03: Royal-title ticket names must have exactly three words.
            </p>
        </div>

        <div class="decision-buttons">
            <button id="board-button">LET THEM BOARD</button>
            <button id="reject-button">REJECT PASSENGER</button>
        </div>

        <p id="feedback" class="footer-note"></p>
        <p id="score-display">Inspection score: ${score}</p>
    `;

    document
        .getElementById("board-button")
        .addEventListener("click", () => resolvePassenger(true));

    document
        .getElementById("reject-button")
        .addEventListener("click", () => resolvePassenger(false));
}

function resolvePassenger(accepted) {
    const passenger = passengers[currentPassengerIndex];

    const destinationIsValid = passenger.validDestination;

    const stampIsValid =
    currentDecree === 1
        ? passenger.stamp === "Royal Crown"
        : (!passenger.needsCrown ||
           passenger.stamp === "Royal Crown");

    const nameHasThreeWords =
        passenger.ticketName.trim().split(/\s+/).length === 3;

    const titleIsValid =
        !passenger.titleRule || nameHasThreeWords;

    const shouldBoard =
        destinationIsValid &&
        stampIsValid &&
        titleIsValid;

    const correct = accepted === shouldBoard;
    inspectionHistory.push({
    passenger: passenger.name,
    accepted: accepted,
    correct: correct,
    shouldBoard: shouldBoard
});
    if (correct) {
        score++;
    }




    const feedback = document.getElementById("feedback");

let reason = "";

if (!destinationIsValid) {
    reason = "Their destination is not an official station.";
} else if (!stampIsValid) {
    reason = "Their ticket is missing the required Royal Crown stamp.";
} else if (!titleIsValid) {
    reason = "Royal decree violation: the ticket name must contain exactly three words.";
} else {
    reason = "All applicable royal decrees have been satisfied.";
}

feedback.textContent = correct
    ? `CORRECT! ${passenger.name} ${
        accepted ? "boards the train." : "is refused entry."
    } ${reason}`
    : `WRONG DECISION! ${passenger.name} should have been ${
        shouldBoard ? "allowed to board." : "rejected."
    } ${reason}`;

document.getElementById("score-display").textContent =
    `Inspection score: ${score} / ${currentPassengerIndex + 1}`;


    document
        .querySelectorAll(".decision-buttons button")
        .forEach(button => {
            button.disabled = true;
        });

    const nextButton = document.createElement("button");

    nextButton.textContent =
        currentPassengerIndex === passengers.length - 1
            ? "FINISH INSPECTION →"
            : "NEXT PASSENGER →";

    nextButton.addEventListener("click", () => {
        currentPassengerIndex++;

        if (currentPassengerIndex < passengers.length) {
            showPassenger();
        } else {
            showSummary();
        }
    });

    feedback.insertAdjacentElement("afterend", nextButton);
}


function showSummary() {
    let resultMessage = "";
    let resultTitle = "";

    if (score === passengers.length) {
        resultTitle = "The Perfect Inspector";
        resultMessage =
            "Every decision was correct. The king is delighted. " +
            "This is generally considered a worrying development.";
    } else if (score >= 3) {
        resultTitle = "A Respectable Disaster";
        resultMessage =
            "You have demonstrated some understanding of railway law. " +
            "Beatrice has stopped updating your resignation letter.";
    } else {
        resultTitle = "A Public Incident";
        resultMessage =
            "The railway has suffered several preventable incidents. " +
            "Beatrice recommends a long holiday. For herself.";
    }

    document.querySelector(".title-screen").innerHTML = `
        <p class="royal-label">ROYAL RAILWAY AUTHORITY</p>

        <h1>Shift<br>Report</h1>

        <div class="rule-card">
            <span class="rule-number">END OF SHIFT</span>

            <h2>${resultTitle}</h2>

            <p>${resultMessage}</p>

            <p class="example">
                PASSENGERS INSPECTED: ${passengers.length}<br>
                CORRECT DECISIONS: ${score}<br>
                INCORRECT DECISIONS: ${passengers.length - score}<br>
                ACCURACY: ${Math.round(
                    (score / passengers.length) * 100
                )}%
            </p>
        </div>

        <button id="restart-button">REPLAY SHIFT</button>

        <p class="footer-note">
            The Crown Railway Authority accepts no responsibility
            for emotional damage caused by its regulations.
        </p>
    `;

    document
        .getElementById("restart-button")
        .addEventListener("click", showFirstPassenger);
}
