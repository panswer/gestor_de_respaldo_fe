import { useCallback, useMemo, useState } from "react";
import { useNavigate } from 'react-router';
import Form, { type FormActions, type FormInput } from "../../organisms/Form";

const signInInputs: FormInput[] = [{
    name: 'email',
    labelText: 'Correo',
    placeHolder: 'example@mail.com',
    type: 'email',
    autocomplete: 'off',
}, {
    name: 'password',
    labelText: 'Contraseña',
    autocomplete: 'off',
    type: 'password',
}];

function SignInPage() {
    const [formState, setFormState] = useState<Record<string, string>>({
        email: '',
        password: '',
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
        sessionStorage.setItem('token', JSON.stringify(formState));
        navigate('/home', { replace: true });
    }, [formState]);

    const signInActions = useMemo<FormActions[]>(() => [{
        btnText: 'Iniciar sesión',
        variant: 'primary',
        size: 5,
    }, {
        btnText: 'Registrarse',
        variant: 'secondary',
        size: 5,
        onClick: (e: any) => {
            e.preventDefault();
            navigate('/sign-up', { replace: true });
        },
    }], []);

    return <div className="row justify-content-center">
        <div className="col-8">
            <Form
                inputs={signInInputs.map((inputProps) => ({
                    ...inputProps,
                    onChange: handleChangeForm,
                    value: formState[inputProps.name],
                }))}
                actions={signInActions}
                actionClassContainer='justify-content-center mt-3 gap-3'
                inputClassContainer='gap-3'
                onSubmit={handleSubmit}
            />
        </div>
    </div>
}

export default SignInPage;