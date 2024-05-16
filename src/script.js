class ManejadorEstudiantes {
  constructor() {
    this.form = document.getElementById("form");
    this.inputs = document.querySelectorAll(".inputs");
    this.btnSubmit = document.getElementById("submit");
    this.nombre = document.getElementById("nombre");
    this.apellido = document.getElementById("apellido");
    this.matricula = document.getElementById("matricula");
    this.nota = document.getElementById("nota");
    this.tBody = document.getElementById("tbody");

    this.btnSubmit.addEventListener("click", this.agregarEstudiante.bind(this));
  }

  agregarEstudiante(e) {
    e.preventDefault();

    if (
      this.camposVacios() ||
      this.matriculaInvalida() ||
      this.notaInvalida() ||
      this.matriculaRepetida() ||
      this.camposOlnyString()
    ) {
      this.mostrarError();
      return;
    }

    this.crearRegistro();
    this.form.reset();
  }

  camposVacios() {
    return (
      this.nombre.value.trim() === "" ||
      this.apellido.value.trim() === "" ||
      this.matricula.value.trim() === "" ||
      this.nota.value.trim() === ""
    );
  }

  matriculaInvalida() {
    return !/^\d{8,11}$/.test(this.matricula.value);
  }

  camposOlnyString() {
    return (
      !/^[a-zA-Z]+$/.test(this.nombre.value) ||
      !/^[a-zA-Z]+$/.test(this.apellido.value)
    );
  }

  notaInvalida() {
    const nota = parseFloat(this.nota.value);
    return isNaN(nota) || nota < 0 || nota > 100;
  }

  matriculaRepetida() {
    return Array.from(this.tBody.children).some((row) => {
      return (
        row.querySelector("td:nth-child(3)").textContent ===
        this.matricula.value
      );
    });
  }

  mostrarError() {
    this.inputs.forEach((element) => {
      element.classList.add("inputIncorrect");

      setTimeout(() => {
        element.classList.remove("inputIncorrect");
      }, 3000);
    });
  }

  crearRegistro() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${this.nombre.value}</td>
      <td>${this.apellido.value}</td>
      <td>${this.matricula.value}</td>
      <td>${this.nota.value}</td>
      <td class="btnL">
        <button type="button" onclick="manejador.editarEstudiante(this)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" onclick="manejador.eliminarEstudiante(this)"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    this.tBody.appendChild(tr);
  }

  editarEstudiante(button) {
    button.disabled = true;
    const row = button.parentNode.parentNode;
    const [nombre, apellido, matricula, nota] = row.querySelectorAll("td");

    this.nombre.value = nombre.textContent;
    this.apellido.value = apellido.textContent;
    this.matricula.value = matricula.textContent;
    this.nota.value = nota.textContent;

    this.btnSubmit.style.display = "none";
    const btnEdit = document.createElement("button");
    btnEdit.type = "submit";
    btnEdit.id = "btnEdit";
    btnEdit.innerText = "Editar";
    this.form.appendChild(btnEdit);

    btnEdit.addEventListener("click", () => {
      if (
        this.camposVacios() ||
        this.matriculaInvalida() ||
        this.notaInvalida() ||
        this.matriculaRepetida() ||
        this.camposOlnyString()
      ) {
        this.mostrarError();
        this.btnSubmit.style.display = "block";
        btnEdit.style.display = "none";
        this.form.reset();
        return;
      }
      button.disabled = false;

      nombre.textContent = this.nombre.value;
      apellido.textContent = this.apellido.value;
      matricula.textContent = this.matricula.value;
      nota.textContent = this.nota.value;

      btnEdit.style.display = "none";
      this.btnSubmit.style.display = "block";
      this.form.reset();
      return;
    });
  }

  eliminarEstudiante(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
}

const manejador = new ManejadorEstudiantes();
