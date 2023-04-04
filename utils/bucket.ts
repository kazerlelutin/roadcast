import {
  S3_BUCKET,
  S3_ENDPOINT,
  S3_KEY,
  S3_PRIVATE,
  S3_REGION,
} from './constants'
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  ListBucketsCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

export default class S3 {
  s3Client: S3Client
  bucketName: string

  constructor() {
    this.bucketName = S3_BUCKET
    this.s3Client = new S3Client({
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_KEY,
        secretAccessKey: S3_PRIVATE,
      },
      endpoint: S3_ENDPOINT,
    })
  }

  async sendMedia({
    folder,
    body,
    fileName,
    tag,
    ext,
  }: {
    folder: string
    body: any
    fileName: string
    tag: string
    ext: string
  }) {
    const link = `${folder}/${fileName}.${ext}`

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          ACL: 'public-read',
          Key: link,
          Body: body,
          Tagging: 'roadcast=' + tag,
        })
      )
      return `${process.env.S3_PUBLIC_ENDPOINT.replace(
        'BUCKETNAME',
        this.bucketName
      )}/${link}`
    } catch (e) {
      return e
    }
  }

  async deleteMedia(link: string) {
    const Key = link.replace(
      `${process.env.S3_PUBLIC_ENDPOINT.replace(
        'BUCKETNAME',
        this.bucketName
      )}/`,
      ''
    )
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key,
        })
      )
      return true
    } catch (e) {
      return e
    }
  }

  async findOrCreateBucket(): Promise<string> {
    const Name = this.bucketName
    try {
      const { Buckets } = await this.s3Client.send(new ListBucketsCommand({}))
      const bucketIsExist = Buckets.find((bucket) => bucket.Name === Name)
      if (!bucketIsExist) {
        await this.s3Client.send(new CreateBucketCommand({ Bucket: Name }))
      }
    } catch (e) {
      throw new Error(e)
    }
    return Name
  }
}
