// main.js
const patients = [
    { id: 1, name: 'Juan Perez', age: 25, diagnosis: 'Fiebre' },
    { id: 2, name: 'Maria Rodriguez', age: 30, diagnosis: 'Dolor de cabeza' },
    // Agrega más pacientes según sea necesario
  ];
  
  const tableBody = document.getElementById('patientTableBody');
  const addPatientBtn = document.getElementById('addPatientBtn');
  const patientModal = document.getElementById('patientModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const savePatientBtn = document.getElementById('savePatientBtn');
  const modalTitle = document.getElementById('modalTitle');
  const patientForm = document.getElementById('patientForm');
  
  addPatientBtn.addEventListener('click', () => openModal('Agregar Paciente'));
  closeModalBtn.addEventListener('click', () => closeModal());
  patientForm.addEventListener('submit', (e) => savePatient(e));
  
  // Inicializar la tabla
  updateTable();
  
  function updateTable() {
    tableBody.innerHTML = '';
    patients.forEach(patient => {
      const row = createTableRow(patient);
      tableBody.appendChild(row);
    });
  }
  
  function createTableRow(patient) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-2 px-4 border-b">${patient.id}</td>
      <td class="py-2 px-4 border-b">${patient.name}</td>
      <td class="py-2 px-4 border-b">${patient.age}</td>
      <td class="py-2 px-4 border-b">${patient.diagnosis}</td>
      <td class="py-2 px-4 border-b">
        <button onclick="editPatient(${patient.id})" class="text-blue-500">Editar</button>
        <button onclick="deletePatient(${patient.id})" class="text-red-500 ml-2">Eliminar</button>
      </td>
    `;
    return row;
  }
  
  function openModal(title) {
    modalTitle.innerText = title;
    patientForm.reset();
    patientModal.classList.remove('hidden');
  }
  
  function closeModal() {
    patientModal.classList.add('hidden');
  }
  
  function savePatient(event) {
    event.preventDefault();
    const formData = new FormData(patientForm);
    const newPatient = {
      id: patients.length + 1,
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      diagnosis: formData.get('diagnosis'),
    };
    patients.push(newPatient);
    closeModal();
    updateTable();
  }
  
  function editPatient(patientId) {
    const patientToEdit = patients.find(patient => patient.id === patientId);
    if (patientToEdit) {
      openModal('Editar Paciente');
      fillFormWithData(patientToEdit);
      savePatientBtn.addEventListener('click', () => saveEditedPatient(patientId));
    }
  }
  
  function fillFormWithData(patient) {
    document.getElementById('name').value = patient.name;
    document.getElementById('age').value = patient.age;
    document.getElementById('diagnosis').value = patient.diagnosis;
  }
  
  function saveEditedPatient(patientId) {
    const formData = new FormData(patientForm);
    const editedPatient = {
      id: patientId,
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      diagnosis: formData.get('diagnosis'),
    };
    const index = patients.findIndex(patient => patient.id === patientId);
    if (index !== -1) {
      patients[index] = editedPatient;
      closeModal();
      updateTable();
    }
  }
  
  function deletePatient(patientId) {
    const confirmed = confirm('¿Estás seguro de que quieres eliminar este paciente?');
    if (confirmed) {
      const index = patients.findIndex(patient => patient.id === patientId);
      if (index !== -1) {
        patients.splice(index, 1);
        updateTable();
      }
    }
  }
  