const apiURL = 'https://jsonplaceholder.typicode.com/todos';
const todosUL = document.querySelector('.todos');
const form = document.querySelector('#form');

const getTodoDo = async () => {
  const response = await fetch(apiURL + '?_limit=10');
  const todo = await response.json();

  todo.forEach((todo) => addToDom(todo));
};

const addToDom = (item) => {
  const li = document.createElement('li');
  const text = document.createTextNode(item.title);
  li.setAttribute('data-id', item.id);

  li.appendChild(text);

  if (item.completed) {
    li.classList.add('bg-dark');
  }

  todosUL.appendChild(li);
};

const createTodo = async (e) => {
  e.preventDefault();

  const input = e.target.firstElementChild.value;
  const obj = { title: input, completed: false };

  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  addToDom(data);
};

const changeState = (id, completed) => {
  fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
};

// event handlers
const init = () => {
  document.addEventListener('DOMContentLoaded', getTodoDo());
};

init();
form.addEventListener('submit', createTodo);

todosUL.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('bg-dark');

    const id = e.target.dataset.id;
    const isActive = e.target.classList.contains('bg-dark');

    changeState(id, isActive);
  }
});

todosUL.addEventListener('dblclick', async (e) => {
  const id = e.target.dataset.id;

  const response = fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
});
