import { handleBlobUpload, type HandleBlobUploadBody } from '@vercel/blob'
import type { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const body = (await request.json()) as HandleBlobUploadBody

  console.log('body', body)

  try {
    const jsonResponse = await handleBlobUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the browser to upload the file

        // ⚠️ Authenticate users before reaching this point.
        // Otherwise, you're allowing anonymous uploads.
        // const { user, userCanUpload } = await auth(request, pathname);
        // if (!userCanUpload) {
        //   throw new Error('not authenticated or bad pathname');
        // }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          metadata: JSON.stringify({
            // optional, sent to your server on upload completion
            userId: user.id,
          }),
        }
      },
      onUploadCompleted: async ({ blob, metadata }) => {
        // Get notified of browser upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log('blob upload completed', blob, metadata)

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(metadata);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user')
        }
      },
    })

    return response.status(200).json(jsonResponse)
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json({ error: (error as Error).message })
  }
}
