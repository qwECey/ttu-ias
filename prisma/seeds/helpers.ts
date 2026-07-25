import {
  firstNames,
  surnames,
  departments,
  programmes,
  companyNames,
  locations,
} from "./data";

// =============================
// Random Item
// =============================

export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// =============================
// Full Name
// =============================

export function generateFullName() {
  return `${randomItem(firstNames)} ${randomItem(surnames)}`;
}

// =============================
// Email
// =============================

export function generateEmail(
  fullName: string,
  index: number
) {
  return (
    fullName
      .toLowerCase()
      .replace(/\s+/g, ".") +
    index +
    "@gmail.com"
  );
}

// =============================
// Ghana Phone Number
// =============================

export function generatePhoneNumber() {
  const prefixes = [
    "020",
    "024",
    "025",
    "026",
    "027",
    "028",
    "050",
    "053",
    "054",
    "055",
    "059",
  ];

  const prefix = randomItem(prefixes);

  const number = Math.floor(
    1000000 + Math.random() * 9000000
  );

  return `${prefix}${number}`;
}

// =============================
// Student ID
// =============================

export function generateStudentId(index: number) {
  return `TTU/2023/${String(index).padStart(4, "0")}`;
}

// =============================
// Login IDs
// =============================

export function generateCompanyLogin(index: number) {
  return `COMP${String(index).padStart(3, "0")}`;
}

export function generateSupervisorLogin(index: number) {
  return `SUP${String(index).padStart(3, "0")}`;
}

export function generateIndustrySupervisorLogin(
  index: number
) {
  return `IND${String(index).padStart(3, "0")}`;
}

export function generateLiaisonLogin(index: number) {
  return `LIA${String(index).padStart(3, "0")}`;
}

export function generateAdminLogin() {
  return "ADMIN001";
}

// =============================
// Random Academic Data
// =============================

export function randomDepartment() {
  return randomItem(departments);
}

export function randomProgramme() {
  return randomItem(programmes);
}

export function randomCompany() {
  return randomItem(companyNames);
}

export function randomLocation() {
  return randomItem(locations);
}

export function randomLevel() {
  return randomItem([200, 300, 400]);
}

export function generateDefaultPassword(
  loginId: string
) {
  return loginId;
}