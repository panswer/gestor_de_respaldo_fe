import { useCallback, useMemo, useState } from "react";
import Form, { type FormActions, type FormInput } from "../../organisms/Form";
import { useNavigate } from "react-router";

const signUpInputs: FormInput[] = [{
    name: 'email',
    labelText: 'Correo',
    placeHolder: 'example@mail.com',
    type: 'email',
    autocomplete: 'off',
    inputClass: 'mb-3',
}, {
    name: 'password',
    labelText: 'Contraseña',
    autocomplete: 'off',
    type: 'password',
    size: 6,
}, {
    name: 'confirmPassword',
    labelText: 'Confirmar contraseña',
    autocomplete: 'off',
    type: 'password',
    size: 6,
}];

function SignUpPage() {
    const [formState, setFormState] = useState<Record<string, string>>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChangeForm = useCallback((e: any) => {
        const inputE: HTMLInputElement = e.target;
        const { name, value } = inputE;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault();
        console.log(formState);
        navigate('/', { replace: true });
    }, [formState]);

    const signUpActions = useMemo<FormActions[]>(() => [{
        btnText: 'Registrarse',
        variant: 'primary',
        size: 5,
    }, {
        btnText: 'Iniciar sesión',
        variant: 'secondary',
        size: 5,
        onClick: (e: any) => {
            e.preventDefault();
            navigate('/', { replace: true });
        }
    }], []);

    return <div className="row justify-content-center">
        <div className="col-8">
            <Form
                inputs={signUpInputs.map((inputProps) => ({
                    ...inputProps,
                    onChange: handleChangeForm,
                    value: formState[inputProps.name],
                }))}
                actions={signUpActions}
                actionClassContainer='justify-content-center mt-3 gap-3'
                title='Registrarse'
                titleClass="fs-1"
                onSubmit={handleSubmit}
            />
        </div>
    </div>
}

export default SignUpPage;