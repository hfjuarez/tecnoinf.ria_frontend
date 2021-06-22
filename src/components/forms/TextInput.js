import React from "react";
import {Control,  Errors} from "react-redux-form";
import "./index.css";

import {required, minLength, maxLength, validEmail} from "../../helpers/formValidator";

const TextInput = ({
                   style,
                   model = ".text",
                   id = "text",
                   name = "text",
                   placeholder = "",
                   className = "input",
                   validators = {
                       required,
                   },
                   messages = {
                       required: "Campo Requerido",
                   },
                   ...props
               }) => {
    return (
        <>
            <Control.text
                model={model}
                id={id}
                name={name}
                placeholder={placeholder}
                className={className}
                style={style}
                validators={validators}
                {...props}
            />
            <Errors
                className="text-danger"
                model={model}
                show="touched"
                messages={messages}
            />

        </>
    )
}
const FileInput = ({place ,style, name, value}) => {
    return(
        <>

            <Control.text
                model={"."+name}
                id={name}
                name={name}
                placeholder={place}
                type='file'
                className="text-input"
                style={style}

            />
            <Errors
                className="text-danger"
                model={"."+name}
                show="touched"
            />

        </>
    )
}

const EmailInput = ({style}) => {
    return (
        <>
            <TextInput
                model=".email"
                id="email"
                name="email"
                placeholder="Email"
                className="input"
                style={style}
                validators={{
                    required,
                    validEmail,
                }}
                messages={{
                    required: "Email requerido",
                }}
            />
            <Errors
                className="text-danger"
                model=".email"
                show="touched"
                messages={{
                    validEmail: "Email invalido",
                }}
            />
        </>
    )
}

const NameInput = ({style}) => {
    return (
        <TextInput
            model=".name"
            id="name"
            name="name"
            placeholder="Nombre"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Campo Requerido",
            }}
        />
    )
}

const SurnameInput = ({style}) => {
    return (
        <TextInput
            model=".surname"
            id="surname"
            name="surname"
            placeholder="Apellido"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Campo Requerido",
            }}
        />
    )
}

const PwdInput = ({style}) => {
    return (
        <TextInput
            model=".pwd"
            id="pwd"
            name="pwd"
            type="password"
            placeholder="Contraseña"
            className="input"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Contraseña requerida",
            }}
        />
    )
}

const DateInput = ({style}) => {
    return (
        <TextInput
            model=".date"
            id="date"
            name="date"
            placeholder="Fecha de nacimiento"
            className="input"
            type="date"
            style={style}
            validators={{
                required,
            }}
            messages={{
                required: "Requerido",

            }}
        />
    )
}

export {EmailInput, PwdInput, TextInput, DateInput, NameInput, SurnameInput, FileInput}