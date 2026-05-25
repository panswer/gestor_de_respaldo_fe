import { useMemo } from "react";
import Card from "../../atoms/Card";
import Text from "../../atoms/Text";
import Table, { type Column } from "../../atoms/Table";

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
    }], []);

    return <div className="row justify-content-center">
        <div className="col-12">
            <Card>
                <Text className="fs-3 mb-3">Usuarios</Text>
                <Table columns={columns} rows={users as unknown as Record<string, unknown>[]} />
            </Card>
        </div>
    </div>
}

export default UsersPage
