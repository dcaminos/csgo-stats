/**
 * @typedef {Object} ServerEvent
 * @property {string} type
 * @property {ServerAddress} [server]
 * @property {ServerEventData} data
 */

/**
 * @typedef {Object} ServerAddress
 * @property {string} ip
 * @property {string | number} port
 */

/**
 * @typedef {Object} ServerEventData
 * @property {string} date
 * @property {string} time
 * @property {ServerEventDataPlayer | string} [source]
 * @property {ServerEventDataPlayer} [target]
 * @property {string} [weapon]
 * @property {ServerEventDataHealth} [health]
 * @property {ServerEventDataHealth} [armour]
 * @property {string} [hitgroup] - 'generic' | 'head' | 'neck' | 'chest' | 'stomach' | 'left arm' | 'right arm' | 'left leg' | 'right leg' | 'gear'
 * @property {boolean} [headshot]
 * @property {boolean} [penetrated]
 * @property {boolean} [noscope]
 * @property {boolean} [attackerblind]
 * @property {boolean} [throughsmoke]
 * @property {string} [duration]
 * @property {string} [entindex]
 * @property {ServerEventDataGrenade} [grenade]
 * @property {ServerEventDataProjectile} [projectile]
 * @property {string} [item]
 * @property {string[]} [items]
 * @property {string} [map]
 * @property {ServerEventDataTeam | string} [team]
 * @property {ServerEventDataScore | number} [score]
 * @property {string} [message]
 * @property {Get5Event} [get5]
 * @property {number} [alive]
 * @property {string} [action]
 * @property {string} [reason]
 * @property {string} [accolade]
 * @property {number} [value]
 * @property {number} [pos]
 */

/**
 * @typedef {Object} ServerEventDataPlayer
 * @property {string} [name]
 * @property {string} [steam]
 * @property {string} [team]
 * @property {string} [coord]
 */

/**
 * @typedef {Object} ServerEventDataHealth
 * @property {number} dealt
 * @property {number} left
 */

/**
 * @typedef {Object} ServerEventDataGrenade
 * @property {string} type - 'flashbang' | 'smokegrenade' | 'molotov' | 'hegrenade' | 'decoy'
 * @property {string} coord
 */

/**
 * @typedef {Object} ServerEventDataProjectile
 * @property {string} coord
 * @property {string} velocity
 */

/**
 * @typedef {Object} ServerEventDataTeam
 * @property {string} name
 * @property {string} side - 'TERRORIST' | 'CT' | 'Spectator'
 */

/**
 * @typedef {Object} ServerEventDataScore
 * @property {number} ct
 * @property {number} t
 */

/**
 * @typedef {Object} Get5Event
 * @property {string} match_id
 * @property {Get5Params} params
 * @property {string} event
 */

/**
 * @typedef {Object} Get5Params
 * @property {number} map_number
 * @property {string} map_name
 * @property {string} [message] - if a chat is sent, what they said
 * @property {string} [team] - team that performed the action team1|team2
 * @property {string} [winner] - team that won team1|team2
 * @property {string} [side] - T|CT
 * @property {string} [selected_side] - T|CT
 * @property {string} [winner_side] - T|CT
 * @property {ServerEventDataPlayer} [client] - player
 * @property {ServerEventDataPlayer} [attacker] - player that got the kill
 * @property {ServerEventDataPlayer} [victim] - player that died
 * @property {ServerEventDataPlayer} [assister] - assisting player
 * @property {ServerEventDataPlayer} [flash_assister] - flash assisting player
 * @property {number} [headshot] - headshot 1|0
 * @property {string} [weapon] - weapon used
 * @property {number} [site] - site bomb planted on
 * @property {number} [reason] - enum reason for a round ending
 * @property {string} [team1_name]
 * @property {string} [team2_name]
 * @property {number} [team1_score]
 * @property {number} [team2_score]
 * @property {number} [team1_series_score]
 * @property {number} [team2_series_score]
 */

module.exports = {};
