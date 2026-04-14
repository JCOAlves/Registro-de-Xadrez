import Evento from "../Models/Evento.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const listaEventos = await Evento.findAll();
        
    } catch (error) {
        
    }
};

const listaEventoID = async (req, res) => {
    try {
        const Evento_ID = await Evento.findByPk()
        
    } catch (error) {
        
    }
};

export { listaEvento, listaEventoID };