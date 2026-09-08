import { useState, useEffect } from "react"

export function Form() {

    const captura = (Event) => {
        const campo = Event.target.name
        const Valor = Event.target.value

        setFormulario({
            ...formulario,
            [campo]: Valor
        })
    }

    const [formulario, setFormulario] = useState({
        Nombre1: "",
        Apellido: "",
        Email: "",
        Telefono: ""
    })

    const [datosForm, newDatos] = useState(() => {
        const datosGuardados = window.localStorage.getItem("datos form")

        return datosGuardados
            ? JSON.parse(datosGuardados)
            : []
    })

    const enviarFormulario = (Event) => {
        Event.preventDefault()

        newDatos([
            ...datosForm,
            formulario
        ])

        console.log(datosForm)
    }

    useEffect(() => {
        window.localStorage.setItem(
            "datos form",
            JSON.stringify(datosForm)
        )
    }, [datosForm])

    return (
        <form onSubmit={enviarFormulario}>

            <label>
                Nombre
                <input
                    name="Nombre1"
                    onChange={captura}
                />
            </label>

            <label>
                Apellido
                <input
                    name="Apellido"
                    onChange={captura}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    name="Email"
                    onChange={captura}
                />
            </label>

            <label>
                Telefono
                <input
                    name="Telefono"
                    onChange={captura}
                />
            </label>

            <button>
                Enviar
            </button>

        </form>
    )
}