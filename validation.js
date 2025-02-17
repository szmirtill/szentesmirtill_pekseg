const Joi = require('joi');

const userValidation = (vevo) => {
    const schema = Joi.object({
        felhasznalonev: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        jelszo: Joi.string().min(6).required()
    });
    return schema.validate(vevo);
};

module.exports = {
    userValidation,
    companyValidation
};