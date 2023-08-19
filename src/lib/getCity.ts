const FALLBACK_CITY = "Warsaw";

export const getCity = () => {
  const city = localStorage.getItem('city');

  if (city && city.trim().length > 0) {
    return city
  }

  return FALLBACK_CITY;
}
