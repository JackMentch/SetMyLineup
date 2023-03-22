import data from "./databaseFiles/teamStats.json"

const teamOPSs: number[] = data['teamOPSs']
const teamBAs: number[] = data['teamBAs']
const teamOBPs: number[] = data['teamOBPs']



export const statRankings = (ba: number, obp: number, ops: number) => {

    let baRanking: number = 1;
    while (ba < teamBAs[baRanking]){
        baRanking += 1;
    }

    let obpRanking: number = 1;
    while (obp < teamOBPs[obpRanking]){
        obpRanking += 1;
    }

    let opsRanking: number = 1;
    while (ops < teamOPSs[opsRanking]){
        opsRanking += 1;
    }

    return [baRanking, obpRanking, opsRanking] as const
}








































































