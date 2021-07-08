import React, {useState, useEffect} from "react";
import {MessIcon} from "../icon/Icon";
import './index.css'
import {Link} from "react-router-dom";
import {Button} from "../button/Button";
import {EmailInput, TextInput} from "../forms/TextInput";
import {SelectCountry} from "../forms/Select";
import {Control, LocalForm, Errors} from "react-redux-form";
import {required} from "../../helpers/formValidator";
import TextArea from "../forms/TextArea";
import {getFormatDate} from "../../helpers/formatDate";

const MessageItem = ({msg, to}) => {
    const cuerpo = msg.Cuerpo.length > 60 ? msg.Cuerpo.substring(0, 65) + '...' : msg.Cuerpo

    return (
        <Link
            to={to}
        >
            <div className={'message-item'}>
                <div className={'m-icon'}>
                    <MessIcon
                        open={msg.Visto}
                    />
                </div>
                <div className={'m-mess'}>
                    <strong style={{marginBottom: 10}}>{msg.Emisor}</strong>
                    <p>{cuerpo}</p>
                </div>
            </div>
        </Link>
    )
}

const ShowMessage = ({actions, loggedUser, msg, backButton}) => {

    if (loggedUser.Email === msg.Emisor) {
        return (
            <>
                <h2 className={'sm-subject'}>{msg.Remitente}</h2>
                <p className={'sm-data'}>Enviado el dia <strong>{getFormatDate(msg.Fecha)}</strong></p>
                <div className={'show-message'}>
                    <p className={'sm-text'}>{msg.Cuerpo}</p>
                </div>
                {backButton}
            </>
        )
    } else {
        const handleSubmit = (values) => {
            const message = {
                Cuerpo: values.Cuerpo,
                Emisor: loggedUser.Email,
                Remitente: msg.Emisor,
            }
            actions.messages.sendMessage({message: message})
        }
        return (
            <>
                <h2 className={'sm-subject'}>{msg.Remitente}</h2>
                <p className={'sm-data'}>Enviado por <strong>{msg.Remitente}</strong>, el
                    dia <strong>{getFormatDate(msg.Fecha)}</strong></p>
                <div className={'show-message'}>
                    <p className={'sm-text'}>{msg.Cuerpo}</p>
                </div>
                <p><strong>Responder:</strong></p>
                <LocalForm
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <TextArea
                        model={".Cuerpo"}
                        id={"Cuerpo"}
                        name={"Curpo"}
                        placeholder={"Escriba se respuesta aqui..."}
                    ></TextArea>
                    <div
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                        {backButton}
                        <Button
                            styleType={'primary'}
                            style={{
                                width: 180
                            }}
                        >Enviar respuesta</Button>
                    </div>
                </LocalForm>
            </>
        )
    }
}

const WriteMessage = ({backButton}) => {
    const handleSubmit = (values) => {

    }
    return (
        <LocalForm
            onSubmit={(values) => handleSubmit(values)}
        >
            <p><strong>Para:</strong></p>
            {/*<SelectCountry/>*/}
            <EmailInput/>
            <p><strong>Asunto:</strong></p>
            <TextInput
                model=".subject"
                id="subject"
                name="subject"
                placeholder="Asunto"
                validators={{
                    required,
                }}
                messages={{
                    required: "Asunto Requerido",
                }}
            />
            <p><strong>Mensaje:</strong></p>
            <TextArea
                model=".message"
                id="message"
                name="message"
                placeholder="Mensaje"
                validators={{
                    required,
                }}
                messages={{
                    required: "Mensaje Requerido",
                }}
            />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                {backButton}
                <Button
                    styleType={'primary'}
                    style={{
                        width: 180
                    }}
                >Enviar mensaje</Button>
            </div>
        </LocalForm>
    )
}

export {MessageItem, ShowMessage, WriteMessage}