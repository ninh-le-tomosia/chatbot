import ChatOperation from '../operations/users/chat.operation';

export const chatStream = (io: any) => {
  io.on('connection', (client: any) => {
    client.on('chat', async (data: any) => {
      console.log(data)
      const operator = new ChatOperation(data.question);
      const stream = await operator.call();

      let result = '';
      for await (const part of stream) {
        const text = part.choices[0]?.delta?.content || '';
        result += text;
        client.emit('reply', part);
      }

      console.log(result);
    });

    client.on('disconnect', () => { console.log('Disconnect!') });
  });
}

