import { useMemo, useState, useCallback } from "react";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Text from "../../atoms/Text";
import Table, { type Column } from "../../atoms/Table";
import Dialog from "../../molecules/Dialog";
import { useNotificationStore } from "../../../stores/notificationStore";


interface User {
    id: number;
    name: string;
    rol: string;
    chat_status: string;
    last_message: string;
}

const statusBadge: Record<string, string> = {
    online: "bg-success",
    offline: "bg-secondary",
    busy: "bg-warning text-dark",
};

function UsersPage() {
    const notify = useNotificationStore((s) => s.notify);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const users = useMemo<User[]>(() => [{
        id: 1,
        name: "Juan Pérez",
        rol: "admin",
        chat_status: "online",
        last_message: "Hola, necesito ayuda con la configuración",
    }, {
        id: 2,
        name: "María García",
        rol: "user",
        chat_status: "offline",
        last_message: "Gracias por su atención",
    }, {
        id: 3,
        name: "Carlos López",
        rol: "editor",
        chat_status: "busy",
        last_message: "Revisando el documento ahora",
    }, {
        id: 4,
        name: "Ana Martínez",
        rol: "user",
        chat_status: "online",
        last_message: "¿Cuándo estará lista la actualización?",
    }, {
        id: 5,
        name: "Pedro Sánchez",
        rol: "admin",
        chat_status: "offline",
        last_message: "Backup completado exitosamente",
    }, {
        id: 6,
        name: "Laura Rodríguez",
        rol: "editor",
        chat_status: "online",
        last_message: "Corrigiendo errores del reporte",
    }], []);

    const columns = useMemo<Column[]>(() => [{
        key: "id",
        header: "ID",
    }, {
        key: "name",
        header: "Nombre",
    }, {
        key: "rol",
        header: "Rol",
        render: (row) => {
            const rol = String(row.rol);
            const badge = rol === "admin" ? "bg-primary" : rol === "editor" ? "bg-info text-dark" : "bg-secondary";
            return <span className={`badge ${badge}`}>{rol}</span>;
        },
    }, {
        key: "chat_status",
        header: "Estado",
        render: (row) => {
            const status = String(row.chat_status);
            return <span className={`badge ${statusBadge[status] ?? "bg-secondary"}`}>{status}</span>;
        },
    }, {
        key: "last_message",
        header: "Último mensaje",
    }, {
        header: "Acciones",
        render: (row) => (
            <>
                <Button className="btn-sm me-1" onClick={() => console.log("Edit", row.id)}>Editar</Button>
                <Button className="btn-sm" variant="danger" onClick={() => setSelectedUser(row as unknown as User)}>Eliminar</Button>
            </>
        ),
    }], []);

    const handleConfirmDelete = useCallback(() => {
        if (!selectedUser) return;
        console.log("Delete confirmed for user:", selectedUser.id);
        setSelectedUser(null);
        notify({ message: "Usuario eliminado correctamente", variant: "success" });
    }, [selectedUser, notify]);

    const handleCancelDelete = useCallback(() => {
        setSelectedUser(null);
    }, []);

    return <div className="row justify-content-center">
        <div className="col-12">
            <Card>
                <Text className="fs-3 mb-3">Usuarios</Text>
                <Table columns={columns} rows={users as unknown as Record<string, unknown>[]} />
            </Card>
        </div>
        <Dialog
            show={selectedUser !== null}
            onClose={handleCancelDelete}
            title="Confirmar eliminación"
            footer={
                <>
                    <Button variant="secondary" onClick={handleCancelDelete}>Cancelar</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
                </>
            }
        >
            <Text>¿Estás seguro de que deseas eliminar a <strong>{selectedUser?.name}</strong>?</Text>
        </Dialog>
    </div>
}

export default UsersPage
