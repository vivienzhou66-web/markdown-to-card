import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportToPng = async (element: HTMLElement, filename: string = 'card.png'): Promise<void> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};

export const exportAllPages = async (
  pages: { id: number; element: HTMLElement }[],
  basename: string = 'card'
): Promise<void> => {
  try {
    const zip = new JSZip();
    
    for (const page of pages) {
      const dataUrl = await toPng(page.element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: page.element.scrollWidth,
        height: page.element.scrollHeight,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
        },
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      zip.file(`${basename}-page-${page.id + 1}.png`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `${basename}-all-pages.zip`);
  } catch (error) {
    console.error('Export all pages failed:', error);
    throw error;
  }
};

export const copyToClipboard = async (element: HTMLElement): Promise<void> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      style: {
        transform: 'none',
        transformOrigin: 'top left',
      },
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
  } catch (error) {
    console.error('Copy failed:', error);
    throw error;
  }
};
