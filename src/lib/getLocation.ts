// utils/getLocation.ts
export async function getLocationByIP() {
  const res = await fetch(
    `https://us1.locationiq.com/v1/ipinfo?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&format=json`
  );
  if (!res.ok) throw new Error("Failed to fetch location");
  return res.json();
}
