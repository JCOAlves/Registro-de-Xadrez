import Evento from "../Models/Evento.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const listaEventos = await Evento.findAll();
        
    } catch (error) {
        
    }
};

const lista_nomesEventos = async (req, res) => {
    try {
        
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