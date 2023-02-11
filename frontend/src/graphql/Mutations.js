import { gql } from "@apollo/client";

export const UPDATE_PAYMENT_STATUS = gql`
  mutation UpdatePaymentStatus($paymentData: paymentStatus) {
    updatePaymentStatus(paymentData: $paymentData) {
      value
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation AddArtist($artistInfo: artistInput) {
    addArtist(artistInfo: $artistInfo) {
      id
      artist
      rate
      streams
      avgpayout
      status
      errorMessage
      errorStatus
    }
  }
`;

export const DELETE_ARTIST = gql`
  mutation DeleteArtist($artistId: deleteInput) {
    deleteArtist(artistId: $artistId) {
      value
    }
  }
`;


export const EDIT_ARTIST = gql`
mutation EditArtist($artistData:editArtistInput){
    editArtist(artistData: $artistData){
        errorValue
    }
}
`;