export default async function getCoordinates(address: string) {
    const urlEncodeAddress = encodeURIComponent(address);

    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodeAddress}`);
    const result = await response.json();

    return result;
}