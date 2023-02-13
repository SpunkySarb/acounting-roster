const Schema = `

type paymentInfo {
    value:Boolean
}


type deleteStatus {
    value:Boolean
}

type editStatus {
    errorValue:Boolean
}

type ArtistData {
    id:ID!
    artist: String
    rate: Float
    streams:Int
    avgpayout:Int
    status:Boolean
    errorMessage:String
    errorStatus:Boolean
    

}

input paymentStatus{
    id:ID!
    status:Boolean
}

input artistInput{
    artist:String!
    rate:Float
}

input fetchPaymentStatusInput {
    id:ID!
}

type Query {

    getData: [ArtistData]
    
}

input deleteInput{
    id:ID!
}

input editArtistInput {
    id:ID!
    artist:String
    rate:Float
}



type Mutation {

    updatePaymentStatus(paymentData:paymentStatus): paymentInfo

    addArtist(artistInfo:artistInput):ArtistData

    deleteArtist(artistId:deleteInput):deleteStatus

    editArtist(artistData:editArtistInput): editStatus


}




`;

module.exports = Schema;
