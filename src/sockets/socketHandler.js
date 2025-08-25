function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Cliente conectado: ${socket.id}`);

    // Evento para entrar em uma sala de evento
    socket.on('join_event', (eventCode) => {
      console.log(`[Socket.IO] Cliente ${socket.id} entrou na sala do evento: ${eventCode}`);
      socket.join(eventCode);
      socket.emit('joined_event_success', `Você entrou no evento ${eventCode}`);
    });

    // Evento para sugerir uma nova música
    socket.on('suggest_song', (data) => {
      const { eventCode, title, artist } = data;
      console.log(`[Socket.IO] Nova sugestão recebida para ${eventCode}: ${title} - ${artist}`);
      
      // AQUI VIRÁ A LÓGICA:
      // 1. Validar os dados recebidos.
      // 2. Encontrar o evento no banco de dados.
      // 3. Adicionar a música à lista de 'suggestedSongs'.
      // 4. Salvar o evento.
      // 5. Transmitir o evento atualizado para todos na sala.
      
      // Exemplo de como seria a transmissão (após salvar no DB):
      // io.to(eventCode).emit('playlist_updated', eventoAtualizadoDoDB);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Cliente desconectado: ${socket.id}`);
    });
  });
}

module.exports = socketHandler;
