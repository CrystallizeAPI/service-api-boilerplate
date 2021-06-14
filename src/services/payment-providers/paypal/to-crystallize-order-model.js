function toCrystallizeOrderModel(basket, capture) {
  const { payer, purchase_units } = capture?.result;
  const { shipping, payments } = purchase_units[0];
  const { address } = shipping;
  const captureID = payments.captures[0].id;

  return {
    cart: basket.cart,
    total: basket.total,
    customer: {
      identifier: payer?.email_address || captureID || "",
      firstName: payer?.name?.given_name || "",
      middleName: "",
      lastName: payer?.name?.surname || "",
      birthDate: Date,
      addresses: [
        {
          type: "billing",
          firstName: payer?.name?.given_name || "",
          middleName: "",
          lastName: payer?.name?.surname || "",
          street: address?.address_line_1,
          street2: "",
          postalCode: address?.postal_code || "",
          city: address?.admin_area_2 || "",
          state: address?.admin_area_1 || "",
          country: address?.country_code || "",
          phone: "",
          email: payer?.email_address || "",
        },
      ],
    },
  };
}

module.exports = toCrystallizeOrderModel;
