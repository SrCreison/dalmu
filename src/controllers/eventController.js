const Event = require('../models/Event');

// ATENÇÃO: Este ID de organizador é fixo e serve apenas para testes iniciais.
// Ele deverá ser substituído pelo ID do usuário autenticado (req.user.id)
// assim que a autenticação for implementada.
const TEMP_ORGANIZER_ID = "60d0fe4f5311236168a109ca"; 

// @desc    Criar um novo evento
const createEvent = async (req, res) => {
  try {
    const { eventName } = req.body;
    const organizerId = TEMP_ORGANIZER_ID; // Usando o ID fixo por enquanto

    if (!eventName) {
      return res.status(400).json({ message: 'O nome do evento é obrigatório.' });
    }

    const newEvent = new Event({ eventName, organizer: organizerId });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao criar o evento.' });
  }
};

// @desc    Buscar um evento pelo código
const getEventByCode = async (req, res) => {
  try {
    const event = await Event.findOne({ eventCode: req.params.eventCode.toUpperCase() })
      .populate('organizer', 'displayName image'); // Exemplo de como carregar dados do organizador

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao buscar o evento.' });
  }
};

module.exports = { createEvent, getEventByCode };
