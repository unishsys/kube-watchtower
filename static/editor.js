let code = `
app:
    host: localhost
    port: 8080
db:
    host: postgres
    database: test
    username: demo
`;

var editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.setSession(ace.createEditSession(code, "ace/mode/yaml"));
editor.session.setTabSize(2);

editor.setOptions({
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
});

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

function submit() {
  let sess = editor.getSession();
  console.log(sess.getValue());

  let annotations = editor.getSession().getAnnotations();

  for (anno in annotations) {
    showNotification(annotations[anno].text, "error");
  }
}
