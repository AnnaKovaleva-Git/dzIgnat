import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState} from 'react'
import Greeting from './Greeting'
import {pureAddUserCallback, UserType} from './HW3'
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;


type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (value: string) => void, addUserCallback: (name: string) => void) => {
    if (name === "") {
        setError('Ошибка! Введите имя!')
        return
    }
    setName("")
    addUserCallback(name)
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    if (name.trim() === "") {
        setError('Ошибка! Введите имя!')
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.charCode === 13) {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про:
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string | null>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.target.value) // need to fix
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
        // pureAddUser(name, setError, setName, ()=>addUserCallback(name))
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    const lastUserName = users[users.length - 1]?.name // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
