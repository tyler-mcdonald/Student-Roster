/*
Student Roster application - A project using data pagination and filtering
*/

// Function to display a page
function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   let studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   
   // Determine if items will display on the active page
   for (let i = 0; i < list.length; i++) {
      // If items are in the page index range
      if (i >= startIndex && i < endIndex) {
         // Create HTML elements for list items
         const student = list[i];
         const li = document.createElement('li');
         const divStudentDetails = document.createElement('div');
         const img = document.createElement('img');
         const h3 = document.createElement('h3');
         const spanEmail = document.createElement('span');
         const divJoinedDetails = document.createElement('div');
         const spanJoinedDate = document.createElement('span');

         // Set element property values
         li.className = 'student-item';
         divStudentDetails.className = 'student-details';
         img.className = 'avatar';
         img.src = `${student.picture.large}`;
         h3.textContent = `${student.name.first} ${student.name.last}`;
         spanEmail.className = 'email';
         spanEmail.textContent = `${student.email}`;
         divJoinedDetails.className = 'joined-details';
         spanJoinedDate.className = 'date';
         spanJoinedDate.textContent = `Joined ${student.registered.date}`;

         // Append elements to list
         li.appendChild(divStudentDetails);
         divStudentDetails.appendChild(img);
         divStudentDetails.appendChild(h3);
         divStudentDetails.appendChild(spanEmail);
         li.appendChild(divJoinedDetails);
         divJoinedDetails.appendChild(spanJoinedDate);
         studentList.appendChild(li);

      }
   }
}

// Function to create and append pagination buttons
function addPagination(list) {
   const numberOfPages = Math.ceil((list.length / 9)); // 9 items per page
   const ul = document.querySelector('ul.link-list');
   ul.innerHTML = ''; // remove buttons previously displayed

   // Create page buttons
   for (let i = 0; i < numberOfPages; i++) {
      let pageNumber = i + 1; // page numbers start at 1
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = pageNumber;

      // Set first page button to active
      if (pageNumber === 1) {button.classList.add('active')}

      // Append LIs and buttons
      li.appendChild(button);
      ul.appendChild(li);
   }

   // Event listener for page buttons
   ul.addEventListener('click', (e) => {
      const button = e.target;
      const pageNumber = button.textContent;
      const pageButtons = ul.querySelectorAll('.active');

      // Clicked button loads the page with showPage function
      if (button.type === 'button') { // Event fired on button click only
         showPage(data, pageNumber);
         // Swap 'active' class on buttons
         pageButtons.forEach( (button) => {button.classList.remove('active')});
         button.classList.add('active');
      }
   });
}

// Function to create a search form and append to header
(function createSearchForm() {

   // Create elements and select 'header' parent node
   const label = document.createElement('label');
   const span = document.createElement('span');
   const input = document.createElement('input');
   const button = document.createElement('button');
   const img = document.createElement('img');
   const header = document.querySelector('header');

   // Set element property values
   label.for = 'search';
   label.classList.add('student-search');
   span.textContent = 'Search by name';
   input.classList.add('search');
   // input.id = 'search'; // previously used
   // input.classList.add('student-search'); // previously used
   input.placeholder = 'Search by name...';
   button.type = 'button';
   button.classList.add('submit');
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';

   // Append to document
   header.appendChild(label);
   label.appendChild(span);
   label.appendChild(input);
   label.appendChild(button);
   button.appendChild(img);
})();

/** Search form functionality */
// Variables for search form and submit button; array of student names
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');
const studentNames = [];
// Add each student name to 'studentNames' array
for (let student of data) {
   studentNames.push(`${student.name.first} ${student.name.last}`);
}

// Functionality for search input box
function searchForm(searchInput, names) {

   const filteredList = [];

   // Check matches between 'inputValue' and student name
   for (let name of names) {
      const inputValue = (searchInput.value).toLowerCase();
      const index = studentNames.indexOf(name);
      if (inputValue.length !== '' && name.toLowerCase().includes(inputValue)) {
         filteredList.push(index);
      }
   }
   
   // Update student list from filter/search
   const filteredData = [];
   for (let index of filteredList) {
      filteredData.push(data[index]);
   }

   // Load page from filters
   showPage(filteredData, 1);
   addPagination(filteredData);

   // Display for 'no results' 
   if (filteredList.length === 0) {
      const ul = document.querySelector('ul.student-list');
      const li = document.createElement('li');
      li.textContent = 'No results';
      ul.appendChild(li);
   }
}

// Event listener for search form
search.addEventListener('keyup', () => {
   searchForm(search, studentNames);
});

/* Event listener for form submit */
// submit.addEventListener('submit', (event) => {
//    event.preventDefault();
//    searchForm(search, studentNames);
// });

// Call functions
showPage(data, 1);
addPagination(data);