export const pokeDressings = [
  "스리라차마요",
  "로스트참깨",
  "홀그레인요거트",
  "오리엔탈",
  "청량갈릭마요",
] as const;

export const pokeToppings = [
  { id: "chicken", name: "닭가슴살", price: 3000 },
  { id: "shrimp", name: "새우", price: 3000 },
  { id: "bulgogi", name: "불고기", price: 3000 },
  { id: "pork-neck", name: "목살", price: 3000 },
  { id: "salmon", name: "연어", price: 4000 },
] as const;

export const advanceReservationMenuIds = [
  "reservation-fajita",
  "reservation-vietnamese-wrap",
  "reservation-la-gimbap",
] as const;

export function isPokeMenu(menuItemId: string) {
  return menuItemId.startsWith("poke-");
}

export function requiresAdvanceReservation(menuItemId: string) {
  return advanceReservationMenuIds.includes(
    menuItemId as (typeof advanceReservationMenuIds)[number],
  );
}

export function getKoreaDateValue(offsetDays = 0) {
  const koreaTime = new Date(Date.now() + 9 * 60 * 60 * 1000);
  koreaTime.setUTCDate(koreaTime.getUTCDate() + offsetDays);

  return koreaTime.toISOString().slice(0, 10);
}
