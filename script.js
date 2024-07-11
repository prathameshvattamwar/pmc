document.addEventListener("DOMContentLoaded", function () {
    const movies = [
        {
            title: "Movie 1",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 1",
        },
        {
            title: "Movie 2",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 2",
        },
        {
            title: "Movie 3",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 3",
        },
        {
            title: "Movie 4",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 4",
        },
        {
            title: "Movie 5",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 5",
        },
        {
            title: "Movie 6",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 6",
        },
        {
            title: "Movie 7",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 7",
        },
        {
            title: "Movie 8",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 8",
        },
        {
            title: "Movie 9",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 9",
        },
        {
            title: "Movie 10",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 10",
        },
        {
            title: "Movie 11",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 11",
        },
        {
            title: "Movie 12",
            image:
                "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg",
            description: "Description 12",
        },
    ];

    const movieGrid = document.getElementById("movie-grid");

    movies.forEach((movie) => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-3";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.width = "18rem";

        const img = document.createElement("img");
        img.src = movie.image;
        img.className = "card-img-top";
        img.alt = movie.title;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = movie.title;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = movie.description;

        const button = document.createElement("a");
        button.href = "#";
        button.className = "btn btn-primary";
        button.textContent = "Book Ticket";
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (loggedInUser) {
                showTimeSlots(movie.title);
            } else {
                $("#loginModal").modal("show");
            }
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(button);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        colDiv.appendChild(cardDiv);

        movieGrid.appendChild(colDiv);
    });

    function showTimeSlots(movieTitle) {
        $("#timeSlotModal").modal("show");
        document.querySelector("#timeSlotModal .modal-title").textContent = `Choose a Time Slot for ${movieTitle}`;

        const timeButtons = document.querySelectorAll("#timeSlotModal .btn");
        timeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                $("#timeSlotModal").modal("hide");
                const selectedTime = button.textContent;
                localStorage.setItem("selectedMovie", movieTitle);
                localStorage.setItem("selectedTime", selectedTime);
                showSeatSelection();
            });
        });
    }

    function showSeatSelection() {
        window.location.href = "seat-selection.html";
    }

    // User authentication
    const loginObjectArray = JSON.parse(localStorage.getItem('loginObjectArray')) || [
        { username: "prathamesh", email: "prathamesh@example.com", password: btoa("2405") }
    ];

    document.getElementById("login-btn").addEventListener("click", () => {
        $("#loginModal").modal("show");
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
        $("#signupModal").modal("show");
    });

    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("login-username").value.toLowerCase().trim();
        const password = btoa(document.getElementById("login-password").value);

        const user = loginObjectArray.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            if (username === "prathamesh" && password === btoa("2405")) {
                window.location.href = "admin.html";
            } else {
                document.getElementById("user-auth").classList.add("d-none");
                document.getElementById("user-info").classList.remove("d-none");
                document.getElementById("username-display").textContent = `Welcome, ${username}`;
                $("#loginModal").modal("hide");
            }
        } else {
            alert("User not found. Please sign up.");
            $("#loginModal").modal("hide");
            $("#signupModal").modal("show");
        }
    });

    document.getElementById("signup-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("signup-username").value.toLowerCase().trim();
        const email = document.getElementById("signup-email").value;
        const password = btoa(document.getElementById("signup-password").value);

        if (loginObjectArray.some(user => user.username === username || user.email === email)) {
            alert("Username or email already exists. Try another one.");
        } else {
            loginObjectArray.push({ username, email, password });
            localStorage.setItem('loginObjectArray', JSON.stringify(loginObjectArray));
            alert("Account created successfully. Please log in.");

            $("#signupModal").modal("hide");
            $("#loginModal").modal("show");
        }
    });

    document.getElementById("user-logout-btn").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        document.getElementById("user-info").classList.add("d-none");
        document.getElementById("user-auth").classList.remove("d-none");
    });

    // My booking button work
    document.getElementById("my-bookings-btn").addEventListener("click", () => {
        window.location.href = "bookings.html";
    });  

    // Seating Area Setup
    const seatingArea = document.querySelector(".seating-area");
    const selectedSeats = new Set();
    let totalCost = 0;

    function createSeat(row, col, section) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.id = `${section}${row}-${col}`;
        if (isSeatBooked(seat.id)) {
            seat.classList.add("booked");
        }
        seat.addEventListener("click", () => toggleSeatSelection(seat, row, col, section));
        return seat;
    }

    function toggleSeatSelection(seat, row, col, section) {
        const seatId = `${section.toUpperCase()}${row}${col}`;
        if (selectedSeats.has(seatId)) {
            selectedSeats.delete(seatId);
            seat.style.backgroundColor = "#666";
            updateTotalCost(-getSeatPrice(section));
        } else {
            if (!seat.classList.contains("booked")) {
                selectedSeats.add(seatId);
                seat.style.backgroundColor = "#079f07";
                updateTotalCost(getSeatPrice(section));
            }
        }
        updateDoneButtonVisibility();
    }

    function isSeatBooked(seatId) {
        const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
        return bookedSeats.includes(seatId);
    }

    function getSeatPrice(section) {
        switch (section) {
            case "r":
                return 200;
            case "s":
                return 250;
            case "p":
                return 400;
            default:
                return 0;
        }
    }

    function updateTotalCost(priceChange) {
        totalCost += priceChange;
    }

    function updateDoneButtonVisibility() {
        const doneButton = document.getElementById("done-button");
        if (selectedSeats.size > 0) {
            doneButton.style.display = "block";
        } else {
            doneButton.style.display = "none";
        }
    }

    function updateSeatSelection() {
        const seatCount = selectedSeats.size;
        const availableSeats = 118 - seatCount;
        const seatList = Array.from(selectedSeats).join(", ");
        return { seatCount, availableSeats, totalCost, seatList };
    }

    // Regular seats
    const regularSection = document.createElement("div");
    regularSection.className = "seats-section";
    for (let row = 1; row <= 4; row++) {
        const seatRow = document.createElement("div");
        seatRow.className = "row regular";
        for (let col = 1; col <= 6; col++) {
            seatRow.appendChild(createSeat(row, col, "r"));
        }
        const aisle = document.createElement("div");
        aisle.className = "aisle";
        seatRow.appendChild(aisle);
        for (let col = 1; col <= 6; col++) {
            seatRow.appendChild(createSeat(row, col, "r"));
        }
        const rowLabel = document.createElement("div");
        rowLabel.className = "row-label";
        rowLabel.textContent = row;
        seatRow.appendChild(rowLabel);
        regularSection.appendChild(seatRow);
    }
    seatingArea.appendChild(regularSection);

    // Standard seats
    const standardSection = document.createElement("div");
    standardSection.className = "seats-section";
    for (let row = 5; row <= 8; row++) {
        const seatRow = document.createElement("div");
        seatRow.className = "row standard";
        for (let col = 1; col <= 7; col++) {
            seatRow.appendChild(createSeat(row - 4, col, "s"));
        }
        const aisle = document.createElement("div");
        aisle.className = "aisle";
        seatRow.appendChild(aisle);
        for (let col = 1; col <= 7; col++) {
            seatRow.appendChild(createSeat(row - 4, col, "s"));
        }
        const rowLabel = document.createElement("div");
        rowLabel.className = "row-label";
        rowLabel.textContent = row;
        seatRow.appendChild(rowLabel);
        standardSection.appendChild(seatRow);
    }
    seatingArea.appendChild(standardSection);

    // Platinum seats
    const platinumSection = document.createElement("div");
    platinumSection.className = "seats-section";

    // Row of platinum seats
    const platinumRow = document.createElement("div");
    platinumRow.className = "row platinum";
    for (let col = 1; col <= 7; col++) {
        platinumRow.appendChild(createSeat(1, col, "p"));
    }
    const aisle = document.createElement("div");
    aisle.className = "aisle";
    platinumRow.appendChild(aisle);
    for (let col = 1; col <= 7; col++) {
        platinumRow.appendChild(createSeat(1, col, "p"));
    }
    const rowLabel = document.createElement("div");
    rowLabel.className = "row-label";
    rowLabel.textContent = "9";
    platinumRow.appendChild(rowLabel);
    platinumSection.appendChild(platinumRow);

    // Add seat numbers at the bottom
    const seatNumbersRow = document.createElement("div");
    seatNumbersRow.className = "row seat-numbers";
    for (let col = 1; col <= 7; col++) {
        const seatNumberLeft = document.createElement("div");
        seatNumberLeft.className = "seat-number";
        seatNumberLeft.textContent = col;
        seatNumbersRow.appendChild(seatNumberLeft);
    }
    const aisleSpace = document.createElement("div");
    aisleSpace.className = "aisle";
    seatNumbersRow.appendChild(aisleSpace);
    for (let col = 8; col <= 14; col++) {
        const seatNumberRight = document.createElement("div");
        seatNumberRight.className = "seat-number";
        seatNumberRight.textContent = col;
        seatNumbersRow.appendChild(seatNumberRight);
    }
    platinumSection.appendChild(seatNumbersRow);

    seatingArea.appendChild(platinumSection);

    const doneButton = document.createElement("button");
    doneButton.id = "done-button";
    doneButton.className = "btn btn-success mt-3";
    doneButton.style.display = "none";
    doneButton.textContent = "Done";
    doneButton.addEventListener("click", () => {
        const { seatCount, availableSeats, totalCost, seatList } = updateSeatSelection();
        const selectedMovie = localStorage.getItem("selectedMovie");
        const selectedTime = localStorage.getItem("selectedTime");
        localStorage.setItem("seatDetails", JSON.stringify({
            seatCount,
            availableSeats,
            totalCost,
            seatList,
            selectedMovie,
            selectedTime,
        }));
        window.location.href = "final-details.html";
    });

    document.body.appendChild(doneButton);
});

