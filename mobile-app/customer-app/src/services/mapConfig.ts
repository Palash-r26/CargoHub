export const getMapTileUrl = async (themeMode: 'light' | 'dark'): Promise<string> => {
  const apiKey = (process.env.EXPO_PUBLIC_OLA_MAPS_API_KEY || '').replace(/"/g, '');
  if (!apiKey) {
    console.warn('OLA Maps API Key is missing. Using standard Google Maps.');
    return '';
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`https://api.olamaps.io/tiles/v1/styles/default-light-standard/1/0/0.png?api_key=${apiKey}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.status === 200) {
      return `https://api.olamaps.io/tiles/v1/styles/default-${themeMode}-standard/{z}/{x}/{y}.png?api_key=${apiKey}`;
    } else {
      console.warn(`Ola Maps returned status ${res.status}. Falling back to standard Google Maps.`);
      return '';
    }
  } catch (err) {
    console.warn('Failed to reach Ola Maps server. Falling back to standard Google Maps:', err);
    return '';
  }
};
