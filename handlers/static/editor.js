var editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");

const nsList = document.getElementById("dropdownns");
const cmList = document.getElementById("dropdowncm");
let selectedCM = "";
let selectedNS = "";

// Fetch data from the API endpoint
fetch("/api/v1/get-namespaces")
  .then((response) => response.json())
  .then((data) => {
    // Clear existing list items
    nsList.innerHTML = "<option selected>None</option>";

    // Populate the list items
    data.forEach((namespace) => {
      const opt = document.createElement("option");
      opt.value = namespace;
      opt.text = namespace;
      nsList.appendChild(opt);
    });
  })
  .catch((error) => showNotification(error, "error"));

nsList.addEventListener("click", function () {
  let selectedOption = this.options[this.selectedIndex].value;

  const cmList = document.getElementById("dropdowncm");

  fetch("/api/v1/cm/" + selectedOption)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing list items
      cmList.innerHTML = "<option selected>None</option>";

      // Populate the list items
      data.forEach((cm) => {
        const opt = document.createElement("option");
        opt.value = cm;
        opt.text = cm;
        cmList.appendChild(opt);
      });
    })
    .catch((error) => showNotification(error, "error"));
});

cmList.addEventListener("click", function () {
  selectedCM = this.options[this.selectedIndex].value;
  selectedNS = nsList.options[nsList.selectedIndex].value;
  fetch("/api/v1/cm/" + selectedNS + "/" + selectedCM)
    .then((response) => response.json())
    .then((data) => {
      // Clear existing list items
      let code = data;
      renderCode(code);
    })
    .catch((error) => showNotification(error, "error"));
});

function renderCode(code) {
  editor.setSession(ace.createEditSession(code, "ace/mode/yaml"));
  editor.session.setTabSize(2);

  editor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
  });
}

function updateCm() {
  let sess = editor.getSession();

  let annotations = editor.getSession().getAnnotations();

  for (anno in annotations) {
    showNotification(annotations[anno].text, "error");
  }

  if (annotations.length == 0) {
    const headers = new Headers();
    headers.append("Content-Type", "text/plain");

    codeBody = sess.getValue();
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: codeBody,
      redirect: "follow",
    };

    fetch("/api/v1/cm/" + selectedNS + "/" + selectedCM, requestOptions)
      .then((response) => response.json())
      .then((result) => showNotification(result.msg, result.status))
      .catch((error) => showNotification(error, "error"));
  }
}

function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.opacity = 1;

  setTimeout(() => {
    notification.style.opacity = 0;
  }, 3000);
  // showNotification('This is an error message', 'error');
  // showNotification('Operation successful!', 'success');
}
