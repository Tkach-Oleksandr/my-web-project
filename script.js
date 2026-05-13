console.log("JS connected!");

const myProjects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Магазин", tech: "JavaScript" }
];

console.log(myProjects[0]);
console.log(myProjects[0].title);

const list = document.querySelector('#projects-list');

if (list) {
  myProjects.forEach(project => {
    const li = document.createElement('li');
    li.textContent = project.title + " (" + project.tech + ")";
    list.appendChild(li);
  });
}

const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.remove('is-open');
  }
});

const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
    }
  });
}

const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

function createProjectCard(project) {
  return `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.tech}</p>
    </div>
  `;
}

const container = document.querySelector('#projects-container');


renderProjects(projects);

function renderProjects(list) {
  if (!container) return;

  const html = list
    .map(project => createProjectCard(project))
    .join('');

  container.innerHTML = html;
}

const searchInput = document.querySelector('#search-input');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(value)
    );

    renderProjects(filtered);
  });
}

// Знаходимо контейнер, куди будемо вставляти пости
const postsContainer = document.querySelector('#posts-container');

// Функція для створення HTML-розмітки одного поста
function createPost(post) {
  return `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `;
}

// ЧАСТИНА 5. ПОВНИЙ КОНТРОЛЬ ПОТОКУ
// ────────────────────────────────────────

async function loadPosts() {
  const loading = document.querySelector('#loading');
  const container = document.querySelector('#posts-container');

  try {
    // Виконуємо запит (виправлено посилання від зайвих символів)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    // Перевірка статусу відповіді (наприклад, 404 або 500)
    if (!response.ok) {
      throw new Error('Server error');
    }

    // Перетворення відповіді у формат JSON
    const data = await response.json();

    // Формуємо HTML-код для перших 5 постів
    const html = data.slice(0, 5)
      .map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `)
      .join('');

    // Виводимо дані на сторінку
    container.innerHTML = html;

    // Ховаємо статус завантаження тільки після успішного рендерингу
    loading.style.display = 'none';

  } catch (error) {
    // Обробка будь-яких помилок (мережевих або серверних)
    console.error("Деталі помилки:", error);
    loading.textContent = 'Помилка завантаження даних';
    loading.style.color = '#ff4d4d'; // Додамо акцент на помилці
  }
}

// Запуск функції
loadPosts();