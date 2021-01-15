const gql = require("graphql-tag");

module.exports = gql`
  scalar JSON

  type Query {
    cart(cartModel: CartModelInput!): Cart!
    user: UserQueries!
    paymentProviders: PaymentProvidersQueries!
    vouchers: VoucherQueries!
    orders: OrderQueries!
  }

  type Cart {
    items: [CartItem!]!
    vouchers: [Voucher!]!
    total: Price!
  }

  type CartItem {
    id: String!
    name: String
    path: String!
    quantity: Int!
    sku: String!
    vatType: VatType
    stock: Int
    price: Price
    priceVariants: [PriceVariant!]!
    attributes: [Attribute!]
    images: [Image!]!
  }

  type PriceVariant {
    price: Float
    identifier: String!
    currency: String!
  }

  type Attribute {
    attribute: String!
    value: String
  }

  type Image {
    url: String!
    variants: [ImageVariant!]
  }

  type ImageVariant {
    url: String!
    width: Int
    height: Int
  }

  type Price {
    gross: Float!
    net: Float!
    currency: String
    tax: Tax
    taxAmount: Float
  }

  type Tax {
    name: String
    percent: Float
  }

  type VatType {
    name: String!
    percent: Int!
  }

  type UserQueries {
    logoutLink: String!
    isLoggedIn: Boolean!
    email: String
  }

  type PaymentProvidersQueries {
    stripe: PaymentProvider!
    klarna: PaymentProvider!
    vipps: PaymentProvider!
    mollie: PaymentProvider!
  }

  type PaymentProvider {
    enabled: Boolean!
    config: JSON
  }

  type OrderQueries {
    get(id: String!): JSON
  }

  type VoucherQueries {
    get(code: String!): Voucher
  }

  type Voucher {
    code: String!
    discountAmount: Int
    discountPercent: Float
  }

  type Mutation {
    user: UserMutations
    paymentProviders: PaymentProvidersMutations!
  }

  type MutationResponse {
    success: Boolean!
    error: String
  }

  input CartModelInput {
    language: String!
    items: [SimpleCartItem!]!
    voucherCodes: [String!]
  }

  input SimpleCartItem {
    sku: String!
    path: String!
    quantity: Int
    priceVariantIdentifier: String!
  }

  type UserMutations {
    sendMagicLink(
      email: String!
      redirectURLAfterLogin: String!
    ): MutationResponse!
  }

  input CheckoutModelInput {
    cartModel: CartModelInput!
    metadata: JSON
    customer: CustomerInput
  }

  input CustomerInput {
    firstName: String
    lastName: String
    addresses: [AddressInput!]
  }

  input AddressInput {
    type: String
    email: String
  }

  type PaymentProvidersMutations {
    stripe: StripeMutations!
  }

  type StripeMutations {
    createPaymentIntent(cartModel: CartModelInput!): JSON
    confirmOrder(
      checkoutModel: CheckoutModelInput!
      paymentIntentId: String!
    ): StripeConfirmOrderResponse!
  }

  type StripeConfirmOrderResponse {
    success: Boolean!
    orderId: String
  }
`;
