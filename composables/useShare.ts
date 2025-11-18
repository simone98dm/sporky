/**
 * Composable for sharing functionality - PNG generation and social media sharing
 */
export const useShare = () => {
  const generatePNG = async (element: HTMLElement): Promise<string | null> => {
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to generate PNG:', error);
      return null;
    }
  };

  const downloadPNG = async (
    element: HTMLElement,
    filename: string = 'sporky-share.png',
  ) => {
    const dataUrl = await generatePNG(element);
    if (!dataUrl) return false;

    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (error) {
      console.error('Failed to download PNG:', error);
      return false;
    }
  };

  const shareToTwitter = (
    imageDataUrl: string,
    text: string = 'Check out my top artists on Sporky! 🎵',
  ) => {
    const url = new URL('https://twitter.com/intent/tweet');
    url.searchParams.set('text', text);
    url.searchParams.set('url', window.location.href);

    // Twitter doesn't support direct image sharing via URL params
    // We'll open Twitter and let user add the image manually
    window.open(url.toString(), '_blank');
  };

  const shareToFacebook = (
    imageDataUrl: string,
    text: string = 'Check out my top artists on Sporky! 🎵',
  ) => {
    const url = new URL('https://www.facebook.com/sharer/sharer.php');
    url.searchParams.set('u', window.location.href);
    url.searchParams.set('quote', text);

    window.open(url.toString(), '_blank');
  };

  const shareToInstagram = (imageDataUrl: string) => {
    // Instagram doesn't support direct web sharing
    // Copy to clipboard and open Instagram
    if (navigator.clipboard && imageDataUrl) {
      navigator.clipboard.writeText(
        `${window.location.href} - Check out my top artists! 🎵`,
      );
    }

    // Open Instagram (user will need to manually add the image)
    window.open('https://www.instagram.com/', '_blank');
  };

  const shareToWhatsApp = (
    imageDataUrl: string,
    text: string = 'Check out my top artists on Sporky! 🎵',
  ) => {
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
    window.open(url, '_blank');
  };

  const copyImageToClipboard = async (
    imageDataUrl: string,
  ): Promise<boolean> => {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);

      return true;
    } catch (error) {
      console.error('Failed to copy image to clipboard:', error);
      return false;
    }
  };

  return {
    generatePNG,
    downloadPNG,
    shareToTwitter,
    shareToFacebook,
    shareToInstagram,
    shareToWhatsApp,
    copyImageToClipboard,
  };
};
