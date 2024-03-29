from urllib.request import urlopen
from bs4 import BeautifulSoup
import json

teams = {
        'LAA': 'Angels',
        'OAK': 'Athletics',
        'HOU': 'Astros',
        'TOR': 'Blue Jays',
        'ATL': 'Braves',
        'MIL': 'Brewers',
        'STL': 'Cardinals',
        'CHC': 'Cubs',
        'ARI': 'Diamondbacks',
        'LAD': 'Dodgers',
        'SF': 'Giants',
        'CLE': 'Guardians',
        'SEA': 'Mariners',
        'MIA': 'Marlins',
        'NYM': 'Mets',
        'WAS': 'Nationals',
        'BAL': 'Orioles',
        'SD': 'Padres',
        'PHI': 'Phillies',
        'PIT': 'Pirates',
        'TEX': 'Rangers',
        'TB': 'Rays',
        'BOS': 'Red Sox',
        'CIN': 'Reds',
        'COL': 'Rockies',
        'KAN': 'Royals',
        'DET': 'Tigers',
        'MIN': 'Twins',
        'CWS': 'White Sox',
        'NYY': 'Yankees'
         }

def parsePlayers(players, type):

    playersList = []

    for player in players[1:]:
        attributes = player.findAll("td")
        attributeList = []
        for attribute in attributes:
            attribute = attribute.get_text().strip()
            if "\n" in attribute:
                attribute = attribute.replace("\n", "")
            if "IL-" in attribute:
                attribute = attribute[:attribute.find("IL-")]

            attributeList.append(attribute)

        if type == "starters":
            attributeList = attributeList[1:]

        if attributeList[0] in corrections:
            attributeList[7] = corrections[attributeList[0]]["ba"]
            attributeList[8] = corrections[attributeList[0]]["obp"]
            attributeList[10] = corrections[attributeList[0]]["ops"]

        playersList.append(
            {
                "name": attributeList[0],
                "pos": attributeList[1],
                "ba": attributeList[7],
                "obp": attributeList[8],
                "ops": attributeList[10]
            })

    return playersList

totalPlayers = []

with open('updateDatabase/teamDatabase.json') as json_file:
    league = json.load(json_file)

with open('updateDatabase/playerCorrections.json') as json_file:
    corrections = json.load(json_file)

for abbr, team in teams.items():
    print(team)
    try:
        html = urlopen(f"https://rotochamp.com/Baseball/TeamPage.aspx?TeamID={abbr}")
        bsObj = BeautifulSoup(html.read(),"lxml")

        startingPlayersTable = bsObj.find("table", {"id": "MainContent_gridProjectedLineup"})
        startingPlayers = startingPlayersTable.findAll("tr")

        league[team]["starters"] = parsePlayers(players=startingPlayers, type="starters")

        html = urlopen(f"https://rotochamp.com/Baseball/TeamPageBench.aspx?TeamID={abbr}")
        bsObj = BeautifulSoup(html.read(), "lxml")

        benchPlayersTable = bsObj.find("table", {"id": "MainContent_gridBench"})
        benchPlayers = benchPlayersTable.findAll("tr")
        league[team]["bench"] = parsePlayers(players=benchPlayers, type="bench")

        while len(league[team]["starters"]) < 9:
            league[team]["starters"].append(league[team]["bench"].pop(0))

    except:
        print("LINK BROKEN, SKIPPING")
        continue

for key in league.keys():
    totalPlayers += league[key]["bench"] + league[key]["starters"]

totalPlayers.append({'name': '@Phillies_Muse', 'pos': 'SS', 'ba': '0.855', 'obp': '0.965', 'ops': '2.744'})

totalPlayers.sort(key=lambda x: x['name'], reverse=False)


with open("updateDatabase/teamDatabase.json", "w") as outfile:
    json.dump(league, outfile)


with open("updateDatabase/playerDatabase.json", "w") as outfile:
    outfile.write('{ \n "players": ')
    json.dump(totalPlayers, outfile)
    outfile.write('\n }')

with open("updateDatabase/teamDatabase.json") as outfile:
    league = json.load(outfile)

    ba = []
    obp = []
    ops = []

    for team, players in league.items():
        avg_ba = sum([float(player['ba']) for player in players['starters']])/len(players['starters'])
        ba.append(avg_ba)
        avg_obp = sum([float(player['obp']) for player in players['starters']])/len(players['starters'])
        obp.append(avg_obp)
        avg_ops = sum([float(player['ops']) for player in players['starters']])/len(players['starters'])
        ops.append(avg_ops)

    ba.sort(reverse=True), obp.sort(reverse=True), ops.sort(reverse=True)

    with open("updateDatabase/teamStats.json", "w") as outfile:
        outfile.write('{')

        outfile.write(' \n "teamOPSs": ')
        json.dump(ops, outfile)

        outfile.write(', \n "teamBAs": ')
        json.dump(ba, outfile)

        outfile.write(', \n "teamOBPs": ')
        json.dump(obp, outfile)

        outfile.write('\n }')


