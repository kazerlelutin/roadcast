export function getObjectToBase64(obj: any) {
  return Buffer.from(JSON.stringify(obj)).toString('base64')
}

export function getBase64toObject(base64: string) {
  return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
}
