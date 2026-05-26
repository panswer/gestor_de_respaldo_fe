import Chat from "../../organisms/Chat";

function HomePage() {
    return <div className="row h-100">
        <div className="col">
            <h3 className="mb-0">Asistente Virtual</h3>
            <hr />
            <Chat />
        </div>
    </div>
}

export default HomePage;