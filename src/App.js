import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

//const pickSound = new Audio("/sounds/pick.mp3");
//const banSound = new Audio("/sounds/ban.mp3");

const getChampImg = (champion) =>
  champion
    ? `https://ddragon.leagueoflegends.com/cdn/15.18.1/img/champion/${champion}.png`
    : "https://via.placeholder.com/64x64?text=?";

const getRoleIcon = (index) => {
  const roles = ["top", "jungle", "mid", "bot", "support"];
  return `/roles/${roles[index]}.png`;
};

const DraftUI = () => {
  const [teamA, setTeamA] = useState({ picks: [], bans: [], players: [] });
  const [teamB, setTeamB] = useState({ picks: [], bans: [], players: [] });
  const [lastData, setLastData] = useState({ teamA: { picks: [], bans: [] }, teamB: { picks: [], bans: [] } });

  const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/draft");
    const data = res.data;

    const champMap = {
  1: "Annie",
  2: "Olaf",
  3: "Galio",
  4: "TwistedFate",
  5: "XinZhao",
  6: "Urgot",
  7: "Leblanc",
  8: "Vladimir",
  9: "Fiddlesticks",
  10: "Kayle",
  11: "MasterYi",
  12: "Alistar",
  13: "Ryze",
  14: "Sion",
  15: "Sivir",
  16: "Soraka",
  17: "Teemo",
  18: "Tristana",
  19: "Warwick",
  20: "Nunu",
  21: "MissFortune",
  22: "Ashe",
  23: "Tryndamere",
  24: "Jax",
  25: "Morgana",
  26: "Zilean",
  27: "Singed",
  28: "Evelynn",
  29: "Twitch",
  30: "Karthus",
  31: "Chogath",
  32: "Amumu",
  33: "Rammus",
  34: "Anivia",
  35: "Shaco",
  36: "DrMundo",
  37: "Sona",
  38: "Kassadin",
  39: "Irelia",
  40: "Janna",
  41: "Gangplank",
  42: "Corki",
  43: "Karma",
  44: "Taric",
  45: "Veigar",
  48: "Trundle",
  50: "Swain",
  51: "Caitlyn",
  53: "Blitzcrank",
  54: "Malphite",
  55: "Katarina",
  56: "Nocturne",
  57: "Maokai",
  58: "Renekton",
  59: "JarvanIV",
  60: "Elise",
  61: "Orianna",
  62: "Wukong",
  63: "Brand",
  64: "LeeSin",
  67: "Vayne",
  68: "Rumble",
  69: "Cassiopeia",
  72: "Skarner",
  74: "Heimerdinger",
  75: "Nasus",
  76: "Nidalee",
  77: "Udyr",
  78: "Poppy",
  79: "Gragas",
  80: "Pantheon",
  81: "Ezreal",
  82: "Mordekaiser",
  83: "Yorick",
  84: "Akali",
  85: "Kennen",
  86: "Garen",
  89: "Leona",
  90: "Malzahar",
  91: "Talon",
  92: "Riven",
  96: "KogMaw",
  98: "Shen",
  99: "Lux",
  101: "Xerath",
  102: "Shyvana",
  103: "Ahri",
  104: "Graves",
  105: "Fizz",
  106: "Volibear",
  107: "Rengar",
  110: "Varus",
  111: "Nautilus",
  112: "Viktor",
  113: "Sejuani",
  114: "Fiora",
  115: "Ziggs",
  117: "Lulu",
  119: "Draven",
  120: "Hecarim",
  121: "Khazix",
  122: "Darius",
  126: "Jayce",
  127: "Lissandra",
  131: "Diana",
  133: "Quinn",
  134: "Syndra",
  136: "AurelionSol",
  141: "Kayn",
  142: "Zoe",
  143: "Zyra",
  145: "Kaisa",
  147: "Seraphine",
  150: "Gnar",
  154: "Zac",
  157: "Yasuo",
  161: "Velkoz",
  163: "Taliyah",
  164: "Camille",
  166: "Akshan",
  901: "Smolder",
  201: "Braum",
  202: "Jhin",
  203: "Kindred",
  221: "Zeri",
  222: "Jinx",
  223: "TahmKench",
  234: "Viego",
  235: "Senna",
  236: "Lucian",
  238: "Zed",
  240: "Kled",
  245: "Ekko",
  246: "Qiyana",
  254: "Vi",
  266: "Aatrox",
  267: "Nami",
  268: "Azir",
  350: "Yuumi",
  360: "Samira",
  412: "Thresh",
  420: "Illaoi",
  421: "RekSai",
  427: "Ivern",
  429: "Kalista",
  432: "Bard",
  497: "Rakan",
  498: "Xayah",
  516: "Ornn",
  517: "Sylas",
  518: "Neeko",
  523: "Aphelios",
  526: "Rell",
  555: "Pyke",
  711: "Vex",
  777: "Yone",
  875: "Sett",
  876: "Lillia",
  887: "Gwen",
  888: "Renata",
  895: "Nilah",
  897: "KSante",
  902: "Milio",
  910: "Naafiri",
  233: "Briar",
  912: "Hwei",
  200: "Belveth",
  800: "Mel",
  799: "Ambessa",
  893: "Aurora",
  804: "Yunara",
  }

  const mapChamp = (id) => {
    const champName = champMap[id];
    if (!champName) console.warn("Unknown champ ID:", id);
      return champName || null;
    };

    const newTeamA = {
      picks: (data.myTeam || []).map((p) => mapChamp(p.championId)),
      bans: (data.bans?.myTeamBans || []).map(mapChamp),
      players: (data.myTeam || []).map((p, i) => p.summonerName || `P${i + 1}`),
    };

    const newTeamB = {
      picks: (data.theirTeam || []).map((p) => mapChamp(p.championId)),
      bans: (data.bans?.theirTeamBans || []).map(mapChamp),
      players: (data.myTeam || []).map((p, i) => p.summonerName || `P${i + 1}`),
    };

    setLastData({ teamA: newTeamA, teamB: newTeamB });
    setTeamA(newTeamA);
    setTeamB(newTeamB);
  } catch (error) {
    console.error("Error fetching champ select data", error);
  }
};

  useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 1000); // 1 sec
  return () => clearInterval(interval);
}, []);

  //  5 slots per team for picks
  const emptySlots = 5;

  const teamAPicks = [...teamA.picks];
  while (teamAPicks.length < emptySlots) teamAPicks.push(null);

  const teamBPicks = [...teamB.picks];
  while (teamBPicks.length < emptySlots) teamBPicks.push(null);

  return (
    <div className="draft-ui">
      <div className="draft-box">
      <div className="team team-left">
        <div className="bans">
          {teamA.bans.map((ban, i) => (
            <div key={ban + i} className="ban-img-wrapper">
            <img src={getChampImg(ban)} alt={ban} className="ban-img slide-down"
            onError={(e) => {
    e.target.onerror = null;

    if (ban === "Wukong") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MonkeyKing.png";
    } else if (ban === "Smolder") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Smolder.png";
    } else if (ban === "LeBlanc") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Leblanc.png";
    } else {
      e.target.src = "https://via.placeholder.com/64x64?text=?";
    }}} />
           </div>
        ))}
        </div>
        <div className="picks">
        {teamAPicks.map((champ, i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="pick-slot">
              {champ ? (
                <img
                  key={champ + i}
                    src={getChampImg(champ)} alt={champ}
                      className="champ-img slide-down"  onError={(e) => {
    e.target.onerror = null;

    if (champ === "Wukong") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MonkeyKing.png";
    } else if (champ === "Smolder") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Smolder.png";
    } else if (champ === "Leblanc") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Leblanc.png";
    } else {
      e.target.src = "https://via.placeholder.com/64x64?text=?";
    }}}
    />
              ) : (
             <div className="champ-placeholder"></div>
              )}

              {champ && (
                <img src={getRoleIcon(i)} alt="role" className="role-icon" />
              )}
            </div>
            <span className="player-name">{teamA.players[i] || "-"}</span>
          </div>
        ))}
        </div>
      </div>

      <div className="center">
        <div className="logos">
          <div className="logo">BLUE</div>
          <span className="vs" style={{color:"white"}}>vs</span>
          <div className="logo">RED</div>
        </div>
        <div className="patch" style={{color:"white"}}>PATCH 25.14</div>
      </div>

      <div className="team team-right">
        <div className="bans">
          {teamB.bans.map((ban, i) => (
            <div key={ban + i} className="ban-img-wrapper">
            <img src={getChampImg(ban)} alt={ban} className="ban-img slide-down"
            onError={(e) => {
    e.target.onerror = null;

    e.target.onerror = null;

    if (ban === "Wukong") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MonkeyKing.png";
    } else if (ban === "Smolder") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Smolder.png";
    } else if (ban === "LeBlanc") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Leblanc.png";
    } else {
      e.target.src = "https://via.placeholder.com/64x64?text=?";
    }}} />
           </div>
        ))}
        </div>

        <div className="picks">
          {teamBPicks.map((champ, i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className="pick-slot">
              {champ ? (
                <img
                  key={champ + i}
                    src={getChampImg(champ)} alt={champ}
                      className="champ-img slide-down"
                      onError={(e) => {
    e.target.onerror = null;

    if (champ === "Wukong") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/MonkeyKing.png";
    } else if (champ === "Smolder") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Smolder.png";
    } else if (champ === "Leblanc") {
      e.target.src = "https://ddragon.leagueoflegends.com/cdn/15.14.1/img/champion/Leblanc.png";
    } else {
      e.target.src = "https://via.placeholder.com/64x64?text=?";
    }}}/>
              ) : (
             <div className="champ-placeholder"></div>
              )}
              {champ && (
                <img src={getRoleIcon(i)} alt="role" className="role-icon" />
              )}
            </div>
            <span className="player-name">{teamB.players[i] || "-"}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DraftUI;
