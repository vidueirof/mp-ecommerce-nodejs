// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
    integrator_id: process.env.MP_INTEGRATOR_ID
});

module.exports = {

    checkoutUrl: async (item, host) => {
        // Crea un objeto de preferencia
        let preference = {
            items: [
                {
                    title: item.title,
                    description: "Dispositivo móvil de Tienda e-commerce",
                    picture_url: host + '/' + item.img,
                    unit_price: parseInt(item.price),
                    quantity: parseInt(item.unit),
                }
            ],
            external_reference: process.env.EMAIL,
            payment_methods: {
                excluded_payment_methods: [{id:'amex'}],
                excluded_payment_types: [{payment_type_id:'atm'}],
                installments: 6
            },
            payer: {
                name: process.env.PAYER_NAME,
                surname: process.env.PAYER_SURNAME,
                email: process.env.PAYER_EMAIL,
                phone: {
                    area_code: process.env.PAYER_AREA_CODE,
                    number: parseInt(process.env.PAYER_PHONE)
                },
                address: {
                    zip_code: process.env.PAYER_ZIPCODE,
                    street_name: process.env.PAYER_ADDRESS_STREET,
                    street_number: parseInt(process.env.PAYER_ADDRESS_STREET_NUMBER)
                }
            },
            auto_return: "approved",
            back_urls: {
                success: host + "/success",
                pending: host + "/pending",
                failure: host + "/failure"
            },
            notification_url: host + "/notifications"
        };

        console.log(JSON.stringify(preference));
        var response = await mercadopago.preferences.create(preference)
        return response.body.init_point
    }

};