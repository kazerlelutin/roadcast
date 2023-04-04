export function getResume(resume: string, numOfCaractere?: number): string {
  return resume.length > numOfCaractere ?? 20
    ? resume.slice(0, numOfCaractere) + '...'
    : resume
}
