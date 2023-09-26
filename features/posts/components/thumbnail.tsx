import { BiLinkExternal } from 'react-icons/bi';
import { HiOutlineLink } from 'react-icons/hi';
import { RiText } from 'react-icons/ri';
import { getLinkPreview } from 'link-preview-js';

import { fetchPostImagePreview } from '../api/fetch-post-image-preview';

import { fetchLinkThumbnail } from '../api/fetch-link-thumbnail';
import { Database } from '@/lib/database';

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

function TextPreviewThumnail() {
  return (
    <div className="w-full h-full rounded dark:bg-neutral-700">
      <RiText className="h-full mx-auto my-auto text-xl" />
    </div>
  );
}

type ThumbnailProps = {
  post: Database['public']['Views']['detailed_post']['Row'];
};

export async function Thumbnail({ post }: ThumbnailProps) {
  if (post.type === 'text') return <TextPreviewThumnail />;
  if (post.type === 'image') return <TextPreviewThumnail />;

  if (post.type === 'link' && post.content) {
    const linkThumbnail = await fetchLinkThumbnail(post.id);
    if (linkThumbnail) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={post.content}
          className="flex flex-col justify-between w-full h-full rounded "
          style={{
            backgroundImage: `url(${linkThumbnail.url})`,

            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex justify-end pt-0.5 pr-0.5">
            <BiLinkExternal />
          </div>

          <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
            {linkThumbnail.website}
          </div>
        </a>
      );
    }
    return (
      <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
        <HiOutlineLink />
      </div>
    );
  }

  if (post.type === 'link' && post.content) {
    try {
      const link: LinkPreview = await getLinkPreview(post.content);
      if (link.images && link.images[0]) {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={post.content}
            className="flex flex-col justify-between w-full h-full rounded "
            style={{
              // backgroundImage: `url(${link.images && link.images[0]})`,
              backgroundImage:
                'url(https://dims.apnews.com/dims4/default/9a6c86e/2147483647/strip/true/crop/5412x3044+0+543/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0b%2Fab%2F4a930117f7629379bc020c15e35e%2F9e010ee35b244e4aa5d72ab468b9abee)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex justify-end pt-0.5 pr-0.5">
              <BiLinkExternal />
            </div>

            <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
              {link.siteName}
            </div>
          </a>
        );
      }
      return (
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      );
    } catch (e) {
      return (
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      );
    }
  }

  if (post.type === 'image') {
    const image = await fetchPostImagePreview(post.id);

    if (image) {
      return (
        <div
          className="w-full h-full rounded"
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      );
    }
  }
}
