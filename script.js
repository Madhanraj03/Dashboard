const items = document.querySelectorAll('.list-items-2');
    items.forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        } else {
          items.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });
    });

    const monthYear = document.querySelector('.month-year');
    const daysContainer = document.querySelector('.days');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentDate = new Date();
    let selectedDate = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
      daysContainer.innerHTML = '';
      const firstDayOfWeek = new Date(date);
      firstDayOfWeek.setDate(date.getDate() - date.getDay());
      for (let i = 0; i < 7; i++) {
        const tempDate = new Date(firstDayOfWeek);
        tempDate.setDate(firstDayOfWeek.getDate() + i);
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        if (tempDate.toDateString() === selectedDate.toDateString()) {
          dayEl.classList.add('active');
        }
        dayEl.innerHTML = `
          <div class="date">${tempDate.getDate()}</div>
          <div class="day-name">${daysOfWeek[tempDate.getDay()]}</div>
        `;
        dayEl.addEventListener('click', () => {
          selectedDate = tempDate;
          renderCalendar(currentDate);
        });
        daysContainer.appendChild(dayEl);
      }
    }

    prev.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    next.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });

    renderCalendar(currentDate);

    // Toggle Sidebar
    const toggleSidebarButton = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');
const toggleRightButton = document.querySelector('.user-icon');
const rightMain = document.querySelector('.right-main');

// Toggle Sidebar
toggleSidebarButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent triggering the outside click listener
  sidebar.classList.toggle('hidden');
  sidebar.classList.toggle('active');
  main.classList.toggle('full-width');
});

// Toggle Right Main only below 1200px
toggleRightButton.addEventListener('click', (event) => {
    if (window.innerWidth < 1200) { // check screen width
      event.stopPropagation(); // Prevent triggering the outside click listener
      rightMain.classList.toggle('hidden');
      rightMain.classList.toggle('active');
    }
  });
  
// Hide when clicking outside
document.addEventListener('click', (event) => {
    // Check if screen width is less than 1200px
    if (window.innerWidth < 1200) {
  
      // For Sidebar
      if (!sidebar.contains(event.target) && !toggleSidebarButton.contains(event.target)) {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('active');
        main.classList.remove('full-width');
      }
  
      // For Right Main
      if (!rightMain.contains(event.target) && !toggleRightButton.contains(event.target)) {
        rightMain.classList.add('hidden');
        rightMain.classList.remove('active');
      }
  
    }
  });
  


    // Initialize visibility based on viewport
    function initializeVisibility() {
      if (window.innerWidth <= 992) {
        sidebar.classList.add('hidden');
        rightMain.classList.add('hidden');
      } else {
        sidebar.classList.remove('hidden');
        rightMain.classList.remove('hidden');
        main.classList.remove('full-width');
      }
    }

    initializeVisibility();
    window.addEventListener('resize', initializeVisibility);