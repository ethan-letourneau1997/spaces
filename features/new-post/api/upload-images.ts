import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

// Define a global variable to keep track of the priority
let currentPriority = 1;

const supabase = createClientComponentClient();

async function uploadFile(file: File, priority: number, postId: number) {
  try {
    if (!file) {
      return;
    }

    const filename = uuidv4();

    // Upload image to bucket and get url
    const { data } = await supabase.storage.from('images').upload(`/public/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (data) {
      const { data: publicUrl } = await supabase.storage
        .from('images')
        .getPublicUrl(`${data.path}`);

      if (publicUrl) {
        await supabase
          .from('post_image')
          .insert([
            {
              post_id: postId,
              url: publicUrl.publicUrl,
              filename,
              priority, // Set the priority for the image
            },
          ])
          .select();
      }
    }
  } catch (error) {
    /* empty */
  }
}

// Handle post and upload for each image
export async function uploadImages(files: File[], postId: number) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      uploadFile(file, currentPriority, postId);
      // eslint-disable-next-line no-plusplus
      currentPriority++; // Increment priority for the next image
    }
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
}
