"use strict";
// getting id of all html input items general purpose

const enter_table_records = document.querySelector("submitFriendName");
const id_form_submit = document.querySelector("#form_submit");
const id_payMode = document.querySelector("#payMode");
const id_expOn = document.querySelector("#expOn");
const id_amount_expense = document.querySelector("#amount_expense");
const id_currency = document.querySelector("#currency");
const id_expDate = document.querySelector("#expDate");
const id_report_table = document.querySelector("#report_table");
const id_currencyFilter = document.querySelector("#currencyFilter");
const id_filter_friend = document.querySelector("#filter_friend");
const id_submitFriendName = document.querySelector("#submitFriendName");
const id_friendList = document.querySelector("#friendList");
const id_enterFriendName = document.querySelector("#enterFriendName");

/* MODEL ADD FRIEND HANDLING BEGIN*/
// All workflow of button Add Friend between these two lines

var id_modal = document.getElementById("addFriendModel");

// Get the button that opens the modal
var id_button_add_friend = document.getElementById("addFriend");

// Get the <span> element that closes the modal
var id_span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
id_button_add_friend.onclick = function () {
  id_modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
id_span.onclick = function () {
  id_modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == id_modal) {
    id_modal.style.display = "none";
  }
};

id_submitFriendName.onclick = (e) => {
  e.preventDefault();

  // validate the option
  if (id_enterFriendName.value == "") {
    alert("Please enter the name.");
    return;
  }
  // create a new option
  const option = new Option(id_enterFriendName.value, id_enterFriendName.value);
  const filterOption = new Option(
    id_enterFriendName.value,
    id_enterFriendName.value
  );
  // add it to the list
  id_friendList.add(option, undefined);
  id_filter_friend.add(filterOption, undefined);

  // reset the value of the input
  id_enterFriendName.value = "";
  id_enterFriendName.focus();

  // update filter_friend as well
};

/* MODEL FOR ADDING FRIEND END */

/* ADDING RECORDS TO ROW*/

id_form_submit.onclick = (e) => {
  e.preventDefault();

  let val_friend_name = id_friendList.value;
  let val_id_payMode = id_payMode.value;
  let val_id_expOn = id_expOn.value;
  let val_id_amount_expense = id_amount_expense.value;
  let val_id_currency = id_currency.value;
  let val_id_expDate = id_expDate.value;
  let val_id_friendList = id_friendList;

  let form_id = document.querySelector("#insertIntoTableForm");

  if (!isValidForm()) {
    // if form is valid then it returns true value otherwise returns false.
    // show dialog box
  } else {
    let table_len = id_report_table.rows.length - 0;
    let uniqueTID = convertDate(`${val_id_expDate}`) + table_len;

    // console.log(val_id_expDate);
    let input_data = `<tr class="text-center" id="t${table_len}">
  <td id="tid${table_len}">${uniqueTID}</td>
  <td id="m${table_len}">${val_id_payMode}</td>
  <td id="f${table_len}">${val_friend_name}</td>
  <td id="e${table_len}">${val_id_expOn}</td>
  <td id="d${table_len}">${val_id_expDate}</td>
  <td id="c${table_len}">${val_id_currency}</td>
  <td id="a${table_len}">${val_id_amount_expense}</td>
  
  <td id="a${table_len}">
  <i type="button" id="edit_row${table_len}" value="Edit" class = "fa fa-pencil class_edit_row" onclick="edit_row(${table_len})"></i>
  <i type="button" id="save_row${table_len}" value="Edit" class = "fa fa-save class_save_row hide_save_button" onclick="save_row(${table_len})"></i>
  <i type="button" id="delete_row${table_len}" value = "Delete" class = "fa fa-trash red class_delete_row" onclick="delete_row(${table_len})"></i>
  </td>
  </tr>`;

    var row = (id_report_table.insertRow(table_len).outerHTML = input_data);
    sortTable(1); // sort table by expense date and order in case of expense conflict, earliest on top
  }
  form_id.reset();
};

/**
 *
 * FEATURE IMPLEMENTATION | EDIT SAVE AND DELETE ROWS
 */

function delete_row(row_id) {
  document.querySelector(`#t${row_id}`).outerHTML = "";
}

/**
 *
 * FEATURE IMPLEMENTATION | SORT ON INPUT BY DATE
 */
function sortTable(col_number) {
  // console.log("sort table ke andar");
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("report_table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 3; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[col_number];
      y = rows[i + 1].getElementsByTagName("td")[col_number];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function convertDate(d) {
  // console.log(d);
  var p = d.split("-");
  // console.log(p[2] + p[1] + p[0]);
  let op = p[0] + p[1] + p[2];

  return op;
}

/**
 *
 * FEATURE IMPLEMENTATION | FILTER ON CHANGE OF CURRENCY
 * FEATURE IMPLEMENTATION | FILTER ON CHANGE OF FRIEND
 *
 */

id_currencyFilter.onchange = (e) => {
  // search by currency type
  let opt = document.querySelector("#currencyFilter").value;

  let column_number = 5;
  searchByString(opt, column_number);
};

id_filter_friend.onchange = (e) => {
  // search by currency type
  let opt = document.querySelector("#filter_friend").value;
  let column_number = 2;

  searchByString(opt, column_number);
};

function searchByString(filter_string, attribute_order) {
  // Declare variables
  console.log(filter_string);
  var input, filter, table, tr, td, i, txtValue;
  // input = document.getElementById("myInput");
  input = filter_string;
  // filter = input.value.toUpperCase();
  filter = input.toUpperCase();
  // console.log(filter);
  table = document.getElementById("report_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 3; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[attribute_order];
    console.log(td);
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
    // console.log(td);
  }
}

function edit_row(row_id) {
  let id_form_saveBtn = document.querySelector("#for_save_edit");
  let id_form_cancelEditBtn = document.querySelector("#for_cancel_edit");
  let form_id = document.querySelector("#insertIntoTableForm");

  id_form_saveBtn.style.display = "block";
  for_cancel_edit.style.display = "block";
  id_form_submit.style.display = "none";

  id_form_saveBtn.onclick = (e) => {
    // if user clicks save details then form value will be saved as a row
    e.preventDefault();
    let val_friend_name = id_friendList.value;
    let val_id_payMode = id_payMode.value;
    let val_id_expOn = id_expOn.value;
    let val_id_amount_expense = id_amount_expense.value;
    let val_id_currency = id_currency.value;
    let val_id_expDate = id_expDate.value;
    let val_id_friendList = id_friendList;

    let table_len = row_id;

    let uniqueTID = document.querySelector(`#tid${row_id}`).innerHTML;

    let input_data = `<tr class="text-center" id="t${table_len}">
  <td id="tid${table_len}">${uniqueTID}</td>
  <td id="m${table_len}">${val_id_payMode}</td>
  <td id="f${table_len}">${val_friend_name}</td>
  <td id="e${table_len}">${val_id_expOn}</td>
  <td id="d${table_len}">${val_id_expDate}</td>
  <td id="c${table_len}">${val_id_currency}</td>
  <td id="a${table_len}">${val_id_amount_expense}</td>
  
  <td id="a${table_len}">
  <i type="button" id="edit_row${table_len}" value="Edit" class = "fa fa-pencil class_edit_row" onclick="edit_row(${table_len})"></i>
  <i type="button" id="save_row${table_len}" value="Edit" class = "fa fa-save class_save_row hide_save_button" onclick="save_row(${table_len})"></i>
  <i type="button" id="delete_row${table_len}" value = "Delete" class = "fa fa-trash red class_delete_row" onclick="delete_row(${table_len})"></i>
  </td>
  </tr>`;

    delete_row(row_id);
    id_form_saveBtn.style.display = "none";
    for_cancel_edit.style.display = "none";
    id_form_submit.style.display = "block";

    var row = (id_report_table.insertRow(table_len).outerHTML = input_data);

    sortTable(1); // sort table by expense date and order in case of expense conflict, earliest on top
    form_id.reset();
  };
}

function cancel_edit() {
  let id_form_saveBtn = document.querySelector("#for_save_edit");
  let id_form_cancelEditBtn = document.querySelector("#for_cance_edit");

  id_form_saveBtn.style.display = "none";
  for_cancel_edit.style.display = "none";
  id_form_submit.style.display = "block";
  form_id.reset();
}

/**validation code */

function isValidForm() {
  let id_expOn_val = id_expOn.value;
  let id_expDate_val = id_expDate.value;
  let id_amount_expense_val = id_amount_expense.value;
  let flag = 0; // turns 111 if all conditions are satisfied

  if (id_expOn_val == "" || hasSpecialCharacters(id_expOn_val)) {
    // Expense On validation

    id_expOn.placeholder =
      "Field can not be empty or with special characters...";

    id_expOn.classList.add("input-validation-error");
  } else {
    id_expOn.classList.remove("input-validation-error");
    flag += 100;
  }

  if ((id_expDate_val = null || id_expDate_val == "")) {
    id_expDate.classList.add("input-validation-error");
    id_expDate.placeholder = "Field can not be empty...";
  } else {
    id_expDate.classList.remove("input-validation-error");
    flag += 10;
  }

  if (id_amount_expense_val == "" || id_amount_expense_val == null) {
    id_amount_expense.classList.add("input-validation-error");
  } else {
    id_amount_expense.classList.remove("input-validation-error");
    flag += 1;
  }

  if (flag == 111) {
    return true;
  } else {
    return false;
  }
}

function hasSpecialCharacters(id_expOn_val) {
  // generic function to check if string contains anything other than alphabets.
  let letters = /^[A-Za-z]+$/;
  if (id_expOn_val.match(letters)) {
    return false;
  }
  return true;
}

// function resetForm(){// resets form to empty values.

// }
