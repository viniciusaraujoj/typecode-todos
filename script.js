const apiURL = 'https://jsonplaceholder.typicode.com/todos';
const todosUL = document.querySelector('.todos');
const form = document.querySelector('#form');

const getTodoDo = () => {
  fetch(apiURL + '?_limit=10')
    .then((res) => res.json())
    .then((todo) => todo.forEach((todo) => addToDom(todo)));
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

const createTodo = (e) => {
  e.preventDefault();

  const input = e.target.firstElementChild.value;
  const obj = { title: input, completed: false };
  //   addToDom(obj);

  fetch(apiURL, {
    // method
    method: 'POST',

    // body
    body: JSON.stringify(obj),

    // headers

    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => addToDom(data));
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

todosUL.addEventListener('dblclick', (e) => {
  const id = e.target.dataset.id;

  fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      if (e.target.tagName === 'LI') {
        e.target.remove();
      }
    });
});
