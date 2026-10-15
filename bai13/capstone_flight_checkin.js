const tickets = [
  {
    pnr: "VN001",
    name: "Nguyen Van An",
    flight: "VN123",
    seat: "12A",
    classType: "ECONOMY",
    status: "BOOKED"
  },
  {
    pnr: "VN002",
    name: "Tran Thi Mai",
    flight: "VN456",
    seat: "5B",
    classType: "BUSINESS",
    status: "BOOKED"
  },
  {
    pnr: "VN003",
    name: "Le Van Nam",
    flight: "VN789",
    seat: "15C",
    classType: "ECONOMY",
    status: "BOOKED"
  }
];

const findTicketByPnr = (pnr) => {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].pnr === pnr) {
      return tickets[i];
    }
  }

  return null;
};

const calculateExcessBaggageFee = (classType, weight) => {
  let limit = 20;

  if (classType === "BUSINESS") {
    limit = 30;
  }

  if (weight > limit) {
    return (weight - limit) * 50000;
  }

  return 0;
};

const listTickets = () => {
  console.table(tickets);
};

const displayBoardingPass = (ticket, weight, fee) => {
  console.log("===== BOARDING PASS =====");
  console.log("Ma ve: " + ticket.pnr);
  console.log("Ten khach: " + ticket.name);
  console.log("Chuyen bay: " + ticket.flight);
  console.log("So ghe: " + ticket.seat);
  console.log("Hang ve: " + ticket.classType);
  console.log("Hanh ly: " + weight + " kg");
  console.log("Phi qua can: " + fee + " VND");
  console.log("Trang thai: " + ticket.status);
  console.log("=========================");
};

const checkIn = () => {
  let pnr = prompt("Nhap ma PNR:");
  if (pnr === null) {
    return;
  }
  pnr = pnr.trim().toUpperCase();
  if (pnr === "") {
    console.log("Ma PNR khong duoc de trong!");
    return;
  }
  const ticket = findTicketByPnr(pnr);
  if (ticket === null) {
    console.log("Khong tim thay ve!");
    return;
  }
  if (ticket.status !== "BOOKED") {
    console.log("Ve khong the check-in!");
    return;
  }
  let input = prompt("Nhap can nang hanh ly (kg):");
  if (input === null) {
    return;
  }
  input = input.trim();
  if (input === "") {
    console.log("Can nang khong duoc de trong!");
    return;
  }
  const weight = Number(input);


  if (isNaN(weight) || weight < 0 || weight === Infinity || weight === -Infinity) {
    console.log("Can nang khong hop le!");
    return;
  }
  const fee = calculateExcessBaggageFee(ticket.classType, weight);
  ticket.status = "CHECKED_IN";
  console.log("Check-in thanh cong!");
  displayBoardingPass(ticket, weight, fee);
};

const searchTicket = () => {
  let keyword = prompt("Nhap ma PNR hoac ten khach:");
  if (keyword === null) {
    return;
  }
  keyword = keyword.trim().toUpperCase();

  if (keyword === "") {
    console.log("Khong duoc de trong!");
    return;
  }

  let found = false;

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].pnr.toUpperCase() === keyword || tickets[i].name.toUpperCase() === keyword) {
      console.log(tickets[i]);
      found = true;
    }
  }

  if (found === false) {
    console.log("Khong tim thay ve!");
  }
};

const cancelTicket = () => {
  let pnr = prompt("Nhap ma PNR can huy:");
  if (pnr === null) {
    return;
  }

  pnr = pnr.trim().toUpperCase();
  if (pnr === "") {
    console.log("Ma PNR khong duoc de trong!");
    return;
  }

  const ticket = findTicketByPnr(pnr);
  if (ticket === null) {
    console.log("Khong tim thay ve!");
    return;
  }

  if (ticket.status === "CANCELLED") {
    console.log("Ve da duoc huy truoc do!");
    return;
  }

  ticket.status = "CANCELLED";
  console.log("Huy ve thanh cong!");
};

const main = () => {
  let menuChoice;

  do {
    menuChoice = prompt(
      "===== QUAN LY VE MAY BAY =====\n" +
      "1. Hien thi danh sach ve\n" +
      "2. Check-in va tinh phi hanh ly\n" +
      "3. Tra cuu ve\n" +
      "4. Huy ve\n" +
      "5. Thoat\n" +
      "Nhap lua chon:"
    );

    if (menuChoice === null) {
      menuChoice = "5";
    }
    switch (menuChoice) {
      case "1":
        listTickets();
        break;

      case "2":
        checkIn();
        break;

      case "3":
        searchTicket();
        break;

      case "4":
        cancelTicket();
        break;

      case "5":
        console.log("Thoat chuong trinh!");
        break;

      default:
        console.log("Lua chon khong hop le!");
        break;
    }

  } while (menuChoice !== "5");
};

main();
