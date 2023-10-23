const socket = io('http://localhost:8080');

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnect!');
});

function userChatStream() {
  const viewAns = document.getElementById('chat-view');
  const inp = document.getElementById('field_chat');
  socket.emit('chat', { question: inp.value });

  const quesEl = document.createElement('div');
  quesEl.classList.add('ques-child');
  quesEl.textContent = inp.value;

  inp.value = '';
  viewAns.appendChild(quesEl);
}

socket.on('reply', ({ id, choices }) => {
  const viewAns = document.getElementById('chat-view');
  let ansEl = document.getElementById(id);
  if (!ansEl) {
    ansEl = document.createElement('div');
    ansEl.setAttribute('id', id);
    ansEl.classList.add('ans-child');
  }

  const { delta, finish_reason } = choices[0];

  const content = ansEl.textContent;
  if (delta.content) ansEl.textContent = content + delta.content;

  console.log(delta);
  viewAns.appendChild(ansEl);
});
