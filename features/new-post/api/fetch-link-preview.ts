'use server';

import { getLinkPreview } from 'link-preview-js';

type LinkPreview = {
  url: string;
  title?: string;
  siteName?: string;
  description?: string;
  mediaType: string;
  contentType?: string;
  images?: string[];
  videos?: {
    /* specify the video properties here */
  }[];
  favicons: string[];
};

export async function fetchLinkPreview(url: string) {
  try {
    const link: LinkPreview = await getLinkPreview(url);
    if (link) {
      return link;
    }
    // if (link.images && link.images[0]) {
    //   const previewImage = link.images[0];
    //   return previewImage;
    // }
  } catch (e) {
    return null;
  }
  return null;
}
