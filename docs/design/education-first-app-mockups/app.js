const screens = [
  { id: 'learn', name: 'Learning Feed', type: 'Education' },
  { id: 'explore', name: 'Explore Topics', type: 'Education' },
  { id: 'article', name: 'Evidence Article', type: 'Education' },
  { id: 'video', name: 'Video Lesson', type: 'Education' },
  { id: 'path', name: 'Learning Path', type: 'Education' },
  { id: 'guide', name: 'Source-Backed Guide', type: 'Education' },
  { id: 'community', name: 'Community Feed', type: 'Social' },
  { id: 'group', name: 'Topic Group', type: 'Social' },
  { id: 'create', name: 'Share Experience', type: 'Social' },
  { id: 'room', name: 'Chat Room', type: 'Social' }
];

const query = new URLSearchParams(window.location.search);
let activeIndex = screens.findIndex((screen) => screen.id === (query.get('screen') || 'learn'));
if (activeIndex < 0) activeIndex = 0;

function activate(index) {
  const current = screens[index];
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('is-active', screen.dataset.screen === current.id);
  });
  document.querySelector('[data-screen-name]').textContent = current.name;
  document.querySelector('[data-screen-count]').textContent = `${index + 1} of ${screens.length}`;
  document.title = `Well Live - ${current.name}`;
  activeIndex = index;
}

document.querySelector('[data-prev]').addEventListener('click', () => {
  const next = (activeIndex - 1 + screens.length) % screens.length;
  history.replaceState({}, '', `?screen=${screens[next].id}`);
  activate(next);
});

document.querySelector('[data-next]').addEventListener('click', () => {
  const next = (activeIndex + 1) % screens.length;
  history.replaceState({}, '', `?screen=${screens[next].id}`);
  activate(next);
});

document.querySelectorAll('[data-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const pressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!pressed));
    button.textContent = pressed ? button.dataset.toggle : button.dataset.toggled;
  });
});

document.querySelectorAll('.horizontal').forEach((row) => {
  row.querySelectorAll('.pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      row.querySelectorAll('.pill').forEach((item) => item.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});

document.querySelectorAll('.quiz-option').forEach((option) => {
  option.addEventListener('click', () => {
    option.parentElement.querySelectorAll('.quiz-option').forEach((item) => item.classList.remove('selected'));
    option.classList.add('selected');
  });
});

document.querySelectorAll('.mode-button').forEach((mode) => {
  mode.addEventListener('click', () => {
    mode.parentElement.querySelectorAll('.mode-button').forEach((item) => item.classList.remove('active'));
    mode.classList.add('active');
  });
});

activate(activeIndex);
