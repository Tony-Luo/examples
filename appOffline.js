// Code goes here
// Store and return existing JSON
function getExistingJson() {
  var existingJson = [
  	{"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
  	{"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
  	{"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
  	{"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
  	{"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
  	{"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
  	{"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
  ];
  
  return existingJson;
}

// Load existing data and display in ascending order
function loadExistingData() {
  var data = getExistingJson();
  data.forEach(function(ele, ind) {
    addTask(ele.name, ele.date, ele.assigned, false);
  });
}

// Add task to list. Prepend task to list if isPrepend is true. Or append task to list
function addTask(name, date, assigned, isPrepend) {
  var taskContainer = $('#taskContainer');
  var template =  '<div><b>'    +
                      name      +
                  '</b><span>'  +
                      date      +
                  '</span><b>'  +
                      assigned  + 
                  '</b></div>';
  isPrepend ? taskContainer.prepend(template) : taskContainer.append(template);
}

// Clean input fields after submit
function cleanForm() {
  $('input').each(function(ind, ele) {
    $(ele).val('');
  });
}

// Submit value in form
function submitForm() {
  var newTask = $('form').serializeArray();
  var name = '';
  var date = '';
  var assigned = '';
  
  // remove error message if it's shown
  if(!$('p').hasClass('hide')) {
    $('p').addClass('hide');
  }
  
  newTask.forEach(function(ele, ind) {
    switch(ele.name) {
      case 'nameInput':
        name = ele.value;
        break;
      case 'dateInput':
        date = ele.value;
        break;
      case 'assignedInput':
        assigned = ele.value;
        break;
      default:
        console.log('new task adding error');
    }
  });
  if(name && date && assigned) {
    addTask(name, date, assigned, true);
    cleanForm();
  }
  else {
    // Display error message
    $('p').removeClass('hide');
  }
}

// Load exsiting json when document is ready
$(document).ready(function(){
  loadExistingData();
});