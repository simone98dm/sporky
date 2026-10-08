// Cryptographically secure random hex string (Web Crypto, works in browser and Node).
export const generateRandomString = (length: number): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(Math.ceil(length / 2)));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length);
};
