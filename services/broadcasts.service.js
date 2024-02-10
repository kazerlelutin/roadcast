const { createKey } = require('./create-key.js')
const { knex } = require('./db.service.js')
const { v4: uuidv4 } = require('uuid')

const tableName = 'broadcasts'

function getBroadcastWithDetails(broadcast) {
  const broadcastsWithDetails = broadcast.reduce((acc, row) => {
    // Utilisez l'ID du broadcast pour regrouper les chroniques

    if (!acc[row.id]) {
      // Broadcast ----
      acc[row.id] = {
        id: row.broadcast_id,
        name: row.broadcast_name,
        editor: row.editor,
        reader: row.reader,
        started_at: row.broadcast_started_at,
        finished_at: row.broadcast_finished_at,
        created_at: row.broadcast_created_at,
        updated_at: row.broadcast_updated_at,
        chronicles: []
      }
    }

    // Si une chronique existe pour cette ligne, traitez-la
    if (
      row.chronicle_id &&
      !acc[row.id].chronicles.find((c) => c.id === row.chronicle_id)
    ) {
      const chronicle = {
        id: row.chronicle_id,
        editorDetails: {
          name: row.editor_name,
          id: row.editor_id
        },
        title: row.chronicle_title,
        content: row.chronicle_content,
        source: row.chronicle_source,
        position: row.chronicle_position,
        medias: []
      }

      // Ajoutez la chronique au broadcast
      acc[row.id].chronicles.push(chronicle)
    }

    // Ajouter des médias à la chronique si disponibles
    if (row.media_id) {
      const mediaItem = {
        id: row.media_id,
        source: row.media_source,
        name: row.media_name,
        type: row.media_type,
        url: row.media_url,
        cover: row.media_cover,
        size: row.media_size,
        createdAt: row.media_createdAt
      }

      const chronicle = acc?.[row.id]?.chronicles.find(
        (c) => c.id === row.chronicle_id
      )
      if (
        row.media_id &&
        !chronicle.medias.find((media) => media.id === row.media_id)
      ) {
        chronicle.medias.push(mediaItem)
      }
    }

    return acc
  }, {})

  return Object.values(broadcastsWithDetails)[0]
}
module.exports = {
  async createBroadcast(broadcast) {
    const id = uuidv4()

    try {
      await knex(tableName).insert({
        id,
        ...broadcast,
        editor: createKey(),
        reader: createKey()
      })
      return id
    } catch (err) {
      console.error('Erreur lors de l’enregistrement de l’utilisateur:', err)
      throw err
    }
  },
  async getBroadcastById(id) {
    try {
      return await knex(tableName).where({ id }).first()
    } catch (err) {
      console.error('Erreur lors de la récupération du broadcast:', err)
      throw err
    }
  },
  async getBroadcastByEditor(editor) {
    try {
      const broadcast = await knex('broadcasts')
        .where('broadcasts.editor', editor)
        .leftJoin('chronicles', 'broadcasts.id', '=', 'chronicles.broadcast_id')
        .leftJoin('medias', 'chronicles.id', '=', 'medias.chronicle_id')
        .leftJoin('editors', 'chronicles.editor_id', '=', 'editors.id')
        .select([
          // Alias pour les champs de broadcast
          'broadcasts.id as broadcast_id',
          'broadcasts.editor',
          'broadcasts.reader',
          'broadcasts.name as broadcast_name',
          'broadcasts.started_at as broadcast_started_at',
          'broadcasts.finished_at as broadcast_finished_at',
          'broadcasts.created_at as broadcast_createdAt',
          'broadcasts.updated_at as broadcast_updatedAt',
          // ... autres champs de broadcasts ...

          // Alias pour les champs de chronicle
          'chronicles.id as chronicle_id',
          'chronicles.title as chronicle_title',
          'chronicles.content as chronicle_content',
          'chronicles.created_at as chronicle_createdAt',
          'chronicles.updated_at as chronicle_updatedAt',
          'chronicles.position as chronicle_position',
          'chronicles.editor_id as chronicle_editor_id',
          'chronicles.source as chronicle_source',
          // ... autres champs de chronicles ...

          // Alias pour les champs de media
          'medias.id as media_id',
          'medias.name as media_name',
          'medias.type as media_type',
          'medias.url as media_url',
          'medias.cover as media_cover',
          'medias.size as media_size',
          'medias.created_at as media_createdAt',
          'medias.updated_at as media_updatedAt',
          'medias.source as media_source',

          // ... autres champs de medias ...

          // Alias pour les champs de editor
          'editors.id as editor_id',
          'editors.name as editor_name'
        ])

      return getBroadcastWithDetails(broadcast)
    } catch (err) {
      console.error('Erreur lors de la récupération du broadcast:', err)
      throw err
    }
  },
  async getBroadcastByReader(reader) {
    try {
      return await knex(tableName)
        .where({ reader })
        .join('chronicles', 'broadcasts.id', '=', 'chronicles.broadcast_id')
        .first()
    } catch (err) {
      console.error('Erreur lors de la récupération du broadcast:', err)
      throw err
    }
  },
  async updateBroadcast(broadcast, editor) {
    try {
      return await knex(tableName)
        .where({ editor })
        .update({
          ...broadcast,
          updated_at: knex.fn.now()
        })
    } catch (err) {
      console.error('Erreur lors de la mise à jour du broadcast:', err)
      throw err
    }
  }
}
