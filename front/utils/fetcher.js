import { createHeaderXInfo } from './createXinfos'

/**
 * Crée une requête fetch avec des en-têtes personnalisés et retourne la réponse.
 *
 * @param {string} verb - Méthode HTTP de la requête (GET, POST, PUT, DELETE).
 * @param {AbortSignal} signal - Signal d'annulation pour la requête fetch.
 * @param {string} url - URL de la ressource à laquelle accéder.
 * @param {BodyInit} [body] - Corps de la requête pour les méthodes POST et PUT.
 * @returns {Promise<Response>} - Promesse qui résout la réponse de la requête fetch.
 */
async function _fetch(verb, signal, url, body) {
  const xInfo = createHeaderXInfo()
  return await fetch(url, {
    method: verb,
    signal,
    body: body ? JSON.stringify(body) : undefined,
    ...xInfo
  })
}

async function _postFile(signal, url, body) {
  const xInfo = createHeaderXInfo()
  return await fetch(url, {
    method: 'POST',
    signal,
    body,
    ...xInfo
  })
}

/**
 * Objet contenant des fonctions pour effectuer des requêtes fetch.
 */
export const fetcher = {
  async get(url, signal) {
    return await _fetch('GET', signal, url)
  },
  async post(url, signal, body) {
    return await _fetch('POST', signal, url, body)
  },
  async postFile(url, signal, body) {
    return await _postFile(signal, url, body)
  },
  async put(url, signal, body) {
    return await _fetch('PUT', signal, url, body)
  },
  async delete(url, signal) {
    return await _fetch('DELETE', signal, url)
  }
}
