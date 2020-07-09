//Base regular expressions, common parts used to make up full regexs
const timestampRgx = /^L\s(\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}:\d{2}:\d{2}):\s?/;
const playerRgx = /"(.+)<\d+><(STEAM.+)>\s?/;
const playerteamRgx = /"(.+)<\d+><(STEAM.+)><([A-Z]+)>"\s?/;
const coordRgx = /\[(-?\d+\s-?\d+\s-?\d+)\]\s?/;
const weapRgx = /with\s"(\w+)"\s?/;
const damageRgx = /\(damage\s"(\d+)"\)\s\(damage_armor\s"(\d+)"\)\s\(health\s"(\d+)"\)\s\(armor\s"(\d+)"\)\s\(hitgroup\s"([a-z]+)"\)$/;
const pistolRgx = /^(glock|usp_silencer|hkp2000|elite|p250|tec9|fiveseven|cz75a|deagle|revolver)$/;

/**
 * Object containing regular expressions for every log line
 * @type {Object<string, RegExp>}
 */
let rgx = {};

rgx.attacked = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    coordRgx.source +
    "attacked " +
    playerteamRgx.source +
    coordRgx.source +
    weapRgx.source +
    damageRgx.source
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Attacking Player Coords
  7: Receiving Player Name
  8: Receiving Player SteamID
  9: Receiving Player Team
  10: Receiving Player Coords
  11: Weapon used
  12: Damage dealt
  13: Armour damage dealt
  14: Health remaining
  15: Armour remaining
  16: Hitgroup
*/
rgx.killed = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    coordRgx.source +
    "killed " +
    playerteamRgx.source +
    coordRgx.source +
    weapRgx.source +
    "(?:\\(([\\w\\s]+)\\))?"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Attacking Player Coords
  7: Receiving Player Name
  8: Receiving Player SteamID
  9: Receiving Player Team
  10: Receiving Player Coords
  11: Weapon used
  12: Flags (headshot penetrated noscope attackerblind throughsmoke)
*/
rgx.assist = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    "assisted killing " +
    playerteamRgx.source
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Receiving Player Name
  7: Receiving Player SteamID
  8: Receiving Player Team
*/
rgx.flashAssist = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    "flash-assisted killing " +
    playerteamRgx.source
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Flash Throwing Player Name
  4: Flash Throwing Player SteamID
  5: Flash Throwing Player Team
  6: Receiving Player Name
  7: Receiving Player SteamID
  8: Receiving Player Team
*/
rgx.flashed = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    "blinded for (\\d+\\.\\d+) by " +
    playerteamRgx.source +
    "from flashbang entindex (\\d+)"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Blinded Player Name
  4: Blinded Player SteamID
  5: Blinded Player Team
  6: Blind duration
  7: Flash throwing Player Name
  8: Flash throwing Player SteamID
  9: Flash throwing Player Team
  10: entindex
*/
rgx.threw = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    "threw (\\w+) " +
    coordRgx.source +
    "(?:flashbang entindex (\\d+)\\))?"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Thing thrown
  7: Thing Coords
  8: OPTIONAL: entindex (if flashbang)
*/
rgx.projectile = new RegExp(
  timestampRgx.source +
    "Molotov projectile spawned at (-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}), velocity (-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6})"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Coord Vector
  4: Velocity Vector
*/
rgx.buy = new RegExp(
  timestampRgx.source + playerteamRgx.source + 'purchased "(\\w+)"$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Item
*/
rgx.leftbuy = new RegExp(
  timestampRgx.source + playerteamRgx.source + "left buyzone with \\[ (.*) \\]"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Array of items (space separated)
*/
rgx.roundstart = new RegExp(
  timestampRgx.source + 'World triggered "Round_Start"'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.roundend = new RegExp(timestampRgx.source + 'World triggered "Round_End"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.freezetime = new RegExp(timestampRgx.source + "Starting Freeze period");
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.playertriggered = new RegExp(
  timestampRgx.source + playerteamRgx.source + 'triggered "(\\w+)"'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Action
*/
rgx.teamtriggered = new RegExp(
  timestampRgx.source +
    'Team "([A-Z]+)" triggered "(\\w+)" \\(CT "(\\d+)"\\) \\(T "(\\d+)"\\)$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team
  4: Action
  5: CT Score
  6: T Score
*/
rgx.teamscored = new RegExp(
  timestampRgx.source + 'Team "([A-Z]+)" scored "(\\d+)" with "(\\d)" players$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team
  4: Score
  5: Players alive
*/
rgx.switchedteam = new RegExp(
  timestampRgx.source +
    playerRgx.source +
    '" switched from team <(\\w+)> to <(\\w+)>$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Source team
  6: Destination team
*/
rgx.say = new RegExp(
  timestampRgx.source + playerteamRgx.source + 'say "(.+)"$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Message
*/
rgx.sayteam = new RegExp(
  timestampRgx.source + playerteamRgx.source + 'say_team "(.+)"$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Message
*/
rgx.killedother = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    coordRgx.source +
    'killed other "(\\w+)<\\d+>" ' +
    coordRgx.source +
    weapRgx.source
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Player Coords
  7: Thing killed
  8: Thing Coords
  9: Weapon used
*/
rgx.get5event = new RegExp(timestampRgx.source + "get5_event: (\\{.*\\})$");
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: get5 event JSON
*/
rgx.connect = new RegExp(
  timestampRgx.source + playerRgx.source + '<>" connected, address ""$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.enteredgame = new RegExp(
  timestampRgx.source + playerRgx.source + '<>" entered the game$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.steamvalidated = new RegExp(
  timestampRgx.source + playerRgx.source + '<>" STEAM USERID validated$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.disconnect = new RegExp(
  timestampRgx.source +
    playerteamRgx.source +
    'disconnected \\(reason "(\\w+)"\\)$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Disconnect reason
*/
rgx.matchstart = new RegExp(
  timestampRgx.source + 'World triggered "Match_Start" on "(\\w+)"'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Map name
*/
rgx.teamplaying = new RegExp(
  timestampRgx.source + 'Team playing "([A-Z]+)": (.*)'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team (side)
  4: Team name
*/
rgx.gameover = new RegExp(
  timestampRgx.source +
    "Game Over: [a-z]+ \\w+ (\\w+) score (\\d+):(\\d+) after (\\d+) min$"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Map name
  4: CT Score
  5: T Score
  6: Duration (mins)
*/
rgx.rcon = new RegExp(
  timestampRgx.source +
    'rcon from "(\\d+\\.\\d+\\.\\d+\\.\\d+:\\d+)": command "(.+)"'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: IP:Port of rcon origin
  4: Command
  5: Argument
*/
rgx.sayconsole = new RegExp(
  timestampRgx.source + '"Console<0><Console><Console>" say "(.+)"$'
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Message
*/
rgx.smpause = new RegExp(
  timestampRgx.source + "Match pause is enabled - mp_pause_match$"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.smunpause = new RegExp(
  timestampRgx.source + "Match pause is disabled - mp_unpause_pause_match$"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.accolade = new RegExp(
  timestampRgx.source +
    "ACCOLADE,\\sFINAL:\\s\\{(\\w+)\\},\\s(.+)<\\d+>,\\sVALUE:\\s(\\d+\\.\\d+),\\sPOS:\\s(\\d+),\\sSCORE:\\s(\\d+\\.\\d+)\\s?"
);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Accolate Type
  4: Player Name
  5: Accolade Value
  6: Position
  7: Score
*/
rgx.get5player = /^(.+)<\d+><(STEAM.+)><\w*>$/;

module.exports = rgx;
