console.log("JS connected!");

// --- 1. ЛОГІКА ПРОЄКТІВ (Верхній блок) ---
const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

const projectsContainer = document.querySelector('#projects-container');
const projectsSearchInput = document.querySelectorAll('#search-input')[0]; // Беремо перший інпут (для проєктів)

function renderProjects(list) {
  if (!projectsContainer) return;
  projectsContainer.innerHTML = list.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.tech}</p>
    </div>
  `).join('');
}
const themeBtn = document.querySelector('#theme-toggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    // Перемикаємо клас на тегу body
    document.body.classList.toggle('dark-theme');
    
    // Зберігаємо вибір користувача (опціонально, щоб тема не злітала при оновленні)
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Перевірка збереженої теми при завантаженні сторінки
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}
// Початковий рендер проєктів
renderProjects(projects);

// Пошук по проєктах
if (projectsSearchInput) {
  projectsSearchInput.addEventListener('input', () => {
    const value = projectsSearchInput.value.toLowerCase();
    const filtered = projects.filter(p => p.title.toLowerCase().includes(value));
    renderProjects(filtered);
  });
}

// 1. Ініціалізація змінних
let allPosts = []; 
const postsContainerApi = document.querySelector('#posts-container-api');
const postsSearchInput = document.querySelector('#posts-search');
const loadingStatus = document.querySelector('#loading');

// 2. Функція завантаження даних (ЧАСТИНА 2)
async function loadPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Помилка сервера');
        }

        const data = await response.json();
        // Зберігаємо перші 10 постів (ЧАСТИНА 2)
        allPosts = data.slice(0, 10);

        // Відображаємо дані (ЧАСТИНА 3)
        renderPosts(allPosts);

        // Ховаємо статус завантаження
        if (loadingStatus) loadingStatus.style.display = 'none';

    } catch (error) {
        console.error("Сталася помилка:", error);
        if (loadingStatus) {
            loadingStatus.textContent = ' Помилка завантаження';
            loadingStatus.style.color = 'red';
        }
    }
}

// 3. Функція рендерингу карток 
function renderPosts(list) {
    if (!postsContainerApi) return;

    const html = list.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).join('');

    postsContainerApi.innerHTML = html;
}

// 4. Логіка пошуку та фільтрації 
if (postsSearchInput) {
    postsSearchInput.addEventListener('input', () => {
        const value = postsSearchInput.value.toLowerCase();

        // Фільтруємо масив, що зберігається в пам'яті
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(value) || 
            post.body.toLowerCase().includes(value)
        );

        // Перемальовуємо інтерфейс
        renderPosts(filtered);
    });
}

// Запуск програми
loadPosts();