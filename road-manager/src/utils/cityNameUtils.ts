export function isCityNameTaken(
    name: string,
    cities: { id: string | number; name: string }[],
    exceptId?: string | number
  ): boolean {
    return cities.some(
      (city) =>
        city.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        city.id.toString() !== exceptId?.toString()
    );
}
  