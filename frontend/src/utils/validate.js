export const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  console.log("You have entered an wrong email address!");
  return false;
};
/* validate a password that includes 
 between 8 and 15 characters, 
 at least one uppercase letter, 
 one lowercase letter, one number, 
 and one special character */
export const validatePassword = (password) => {
  // console.log(password);
//   if (/[a-z]/.test(password)) {
//     console.log("lowercase");
//   }
//   if (/[A-Z]/.test(password)) {
//     console.log("uppercase");
//   }
//   if (/[0-9]/.test(password)) {
//     console.log("number");
//   }
//   // if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)){
//   if (/(!|"|#|[$]|%|&|'|[(]|[)]|[*]|[+]|'|-|.|[/])+/.test(password)) {
//     console.log("special");
//   }
  if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /(!|"|#|[$]|%|&|'|[(]|[)]|[*]|[+]|'|-|.|[/])+/.test(password)
  ) {
    return true;
  }
  console.log("You have entered an wrong password!");
  return false;
};

export const validateName = (name) => {
  // validate at leas a string with 2 or more letters, 
  // plus a white space, plus a string with 2 or more letters
  // optionally, include another white space and another string with 2 or more letters
  // include vocals with accents and ñ (https://unicode-table.com/en/#00C1)
  
  if (/^([a-zA-Z\u00C0-\u00FF]{2,}\s[a-zA-Z\u00C0-\u00FF]{2,}(\s[a-zA-Z\u00C0-\u00FF]{2,})?)$/.test(name)) {
  
    return true;
  }
  console.log("You have entered an wrong name!");
  return false;
}
