import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query {
    getData {
      id
      artist
      rate
      streams
      avgpayout
      status
    }
  }
`;

export const GET_PAYMENT_STATUS = gql`
  query GetPaymentStatus($paymentId: fetchPaymentStatusInput) {
    getPaymentStatus(paymentId: $paymentId) {
      value
    }
  }
`;
