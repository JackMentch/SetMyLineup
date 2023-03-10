const teamOPSs: number[] = [
    0.787, 0.785, 0.784, 0.783, 0.771, 0.768, 0.766, 0.760, 0.759, 0.752, 
    0.751, 0.748, 0.746, 0.746, 0.742, 0.738, 0.735, 0.733, 0.733, 0.732, 
    0.729, 0.725, 0.723, 0.720, 0.720, 0.719, 0.707, 0.707, 0.677, 0.650
]


const teamOBPs: number[] = [
    0.339, 0.337, 0.336, 0.335, 0.333, 0.330, 0.328, 0.328, 0.327, 0.327, 
    0.326, 0.323, 0.322, 0.321, 0.320, 0.318, 0.316, 0.315, 0.314, 0.313,
    0.312, 0.311, 0.310, 0.309, 0.308, 0.307, 0.306, 0.305, 0.298, 0.279
]



const teamBAs: number[] = [
    0.262, 0.261, 0.260, 0.259, 0.258, 0.256, 0.256, 0.255, 0.255, 0.254,
    0.254, 0.253, 0.253, 0.252, 0.251, 0.251, 0.250, 0.248, 0.248, 0.248, 
    0.247, 0.247, 0.245, 0.244, 0.243, 0.242, 0.238, 0.234, 0.232, 0.221
]



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








































































