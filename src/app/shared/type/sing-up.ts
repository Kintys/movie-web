interface InvalidTextModule {
    textError: string
    isShowErrorMassage: boolean
}

export interface InvalidTextObject {
    email: InvalidTextModule
    agreement: InvalidTextModule
    confirmPassword: InvalidTextModule
}

export type ControlKeys = keyof Omit<InvalidTextObject, 'isInvalid'>
