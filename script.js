
function submitForm(){
        
    // --------------------------------------------Retrieve form values
    let studentId = document.getElementById("studentId").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;

    //-------------------------------------- Retrieve existing data from localStorage
    let storedData = JSON.parse(localStorage.getItem("store")) || [];

    //============================================  for blank entries 
    if(studentId==="" || name==="" || email==="" || contact==="")
    {
        alert("Please fill the valid Credentials");
        return "";            
    }

    //----------------------------------------------- validating form

    if (isNaN(studentId) || studentId <= 0) {
    alert("Student ID must be a positive number.");
    return;
}

if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Student name should only contain letters and spaces.");
    return;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

if (!/^\d{10}$/.test(contact)) {
    alert("Contact number should be exactly 10 digits.");
    return;
}

    //--------------------------------------------------- Create a new data object
    let data = {
      studentId: studentId,
      name: name,
      email: email,
      contact: contact
    };

    storedData.push(data);

    //------------------------------------------------ Save the updated  localStorage
    localStorage.setItem("store", JSON.stringify(storedData));

    alert("Data Submitted succesfully !")

    // Update the table
    updateTable();
  };


  function updateTable() {
    let storedData = JSON.parse(localStorage.getItem("store")) || [];
    let studentInfo = document.getElementById("studentinfo");

    //------------------------------------ Clear the table body
    studentInfo.innerHTML = '';

    //----------------------------------------Check if there are records or not
    if (storedData.length === 0) {
        studentInfo.innerHTML = '<tr><td colspan="6" class="no-record">No record Found</td></tr>';
        return;
    }

    //-------------------------------------------- Add each record to the table
    storedData.forEach((value, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${value.studentId}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td>${value.contact}</td>
            <td><button class="btn" onclick="deleteItem(${index})"><img src="delete.png" alt="delete" height="30px" width="30px"></button></td>
            <td><button class="btn" onclick="editItem(${index})"><img src="edit.png" alt="edit" height="30px" width="30px"></button></td>
        `;
        studentInfo.appendChild(row);
    });
    document.getElementById("studentId").value="";
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("contact").value="";
  }

// ---------------------------------------------delete  table data
  function deleteItem(index) {
    let storedData = JSON.parse(localStorage.getItem("store")) || [];
    storedData.splice(index, 1);
    localStorage.setItem("store", JSON.stringify(storedData));
    updateTable();
  }

// ----------------------------------------------edit table data
  function editItem(index) {
    let storedData = JSON.parse(localStorage.getItem("store")) || [];
    let item = storedData[index];
     

    document.getElementById("studentId").value = item.studentId;
    document.getElementById("name").value = item.name;
    document.getElementById("email").value = item.email;
    document.getElementById("contact").value = item.contact;

    storedData.splice(index, 1);
    localStorage.setItem("store", JSON.stringify(storedData));
  }

  // onload page up ot date is loaded 
  document.addEventListener("DOMContentLoaded", updateTable); 