const Joi = require('joi');

let blogschema = Joi.object({
    title : Joi.string().required(),
    img : Joi.string().required(),
    desc : Joi.string().required()

})

let reviewschema = Joi.object({
    comment : Joi.string().required()
})

module.exports = {blogschema , reviewschema};