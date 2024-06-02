const searchButton = document.getElementById('go');
const sortButtons = document.querySelectorAll('.sort-btn');
const paginationLinks = document.querySelectorAll('.page-link');
const tableBody = document.getElementById('table-body');
let rows = Array.from(tableBody.querySelectorAll('tr'));
const allRows = rows;
let currentPage = 1;
const rowsPerPage = 100;

if (searchButton) {
  searchButton.addEventListener('click', searchTable);
}

if (sortButtons) {
  sortButtons.forEach((button) => {
    button.addEventListener('click', sortTable);
  });
}

if (paginationLinks) {
  paginationLinks.forEach((link) => {
    link.addEventListener('click', changePage);
  });
}

function searchTable() {
  const input = document.getElementById('search-input').value.toLowerCase();
  console.log(input);

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td'); // Select all td elements within the row
    if (input !== '') {
      cells.forEach((cell) => {
        const cellText = cell.textContent.toLowerCase();
        if (cellText.includes(input)) {
          cell.classList.add('highlight');
        } else {
          cell.classList.remove('highlight');
        }
      });
    } else {
      cells.forEach((cell) => {
        cell.classList.remove('highlight');
      });
      rows = allRows;
    }
  });

  // Re-paginate after search
  currentPage = 1;
  rows = rows.filter((row) =>
    Array.from(row.querySelectorAll('td')).some((cell) =>
      cell.textContent.toLowerCase().includes(input)
    )
  ); // Filter rows based on search input
  displayTableRows();
  updatePagination();
}

function sortTable(event) {
  const button = event.currentTarget;
  const columnIndex = button.getAttribute('data-index');
  const order = button.getAttribute('data-order');

  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    if (!isNaN(aText) && !isNaN(bText)) {
      return order === 'asc' ? aText - bText : bText - aText;
    } else {
      return order === 'asc'
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    }
  });

  button.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');

  // Re-paginate after sorting
  displayTableRows();
  updatePagination();
}

function displayTableRows() {
  tableBody.innerHTML = '';

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedRows = rows.slice(start, end);

  paginatedRows.forEach((row) => tableBody.appendChild(row));
}

function changePage(event) {
  event.preventDefault();
  const link = event.currentTarget;
  const page = parseInt(link.getAttribute('data-page'));

  if (!isNaN(page)) {
    currentPage = page;
    displayTableRows();
    updatePagination();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePagination() {
  paginationLinks.forEach((link) => {
    const page = parseInt(link.getAttribute('data-page'));

    if (page === currentPage) {
      link.parentElement.classList.add('active');
    } else {
      link.parentElement.classList.remove('active');
    }
  });

  document
    .getElementById('previous-page')
    .classList.toggle('disabled', currentPage === 1);
  document
    .getElementById('next-page')
    .classList.toggle(
      'disabled',
      currentPage === Math.ceil(rows.length / rowsPerPage)
    );
}

// Initialize table display
displayTableRows();
