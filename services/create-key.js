const { v4: uuidv4 } = require('uuid')

function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789€£¥_-'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function createKey() {
  // Génère un UUID
  let uuid = uuidv4()

  // Remplace chaque trait d'union par une chaîne de caractères aléatoires de 5 caractères
  uuid = uuid.replace(/-/g, () => generateRandomString(5))

  return uuid
}

module.exports = {
  createKey
}
