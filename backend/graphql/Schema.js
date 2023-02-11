

const Schema =  `

type paymentInfo {
    value:Boolean
}

type ArtistData {
    id:ID!
    artist: String
    rate: Float
    streams:Int
    avgpayout:Int
    status:Boolean
    

}

input paymentStatus{
    id:ID!
    status:Boolean
}

input artistInput{
    artist:String!
    rate:Float
}


type Query {

    getData: [ArtistData]
}

type Mutation {

    updatePaymentStatus(paymentData:paymentStatus): paymentInfo

    addArtist(artistInfo:artistInput):ArtistData!


}




`;


module.exports = Schema;
