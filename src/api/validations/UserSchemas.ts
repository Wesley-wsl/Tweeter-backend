import { Joi } from "celebrate";

export const createUserSchema = Joi.object().keys({
    name: Joi.string().min(4).max(36).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(18).required(),
});

export const editUserSchema = Joi.object().keys({
    name: Joi.string().min(4).max(36).optional(),
    email: Joi.string().email().optional(),
    about_me: Joi.string().max(200).optional(),
});
