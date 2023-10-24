export default function validateForm(form) {
  if (!form.checkValidity()) {
    return false;
  }
  form.classList.add('was-validated');
  return true;
}