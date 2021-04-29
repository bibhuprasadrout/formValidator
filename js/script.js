const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')


// Functions

// show error
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// show success

function showSuccess(input){
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// check required inputs

function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if(input.value.trim()===''){
      showError(input,`${getFieldName(input)} is required`)
    }else{
      showSuccess(input)
    }
  })
}


// check length of input
function checkLength(input,min,max){
  if(input.value.length < min){
    showError(input,`${getFieldName(input)} must have atleast ${min} charecters`)
  }else if (input.value.length > max) {
    showError(input,`${getFieldName(input)} must be less than ${max} charecters`)
  }else{
    showSuccess(input)
  }
}


// email validator
function checkEmailValidity(input){
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(emailRegEx.test(String(input.value.trim()).toLowerCase())){
    showSuccess(input)
  }else{
    showError(input, 'Email is not valid')
  }
}


// check if both password match
function checkPasswordMatch(password1,password2){
  if(password1.value!==password2.value){
    showError(password2, 'Passwords do not match')
  }
}


// get the field name of the input, in this case from its id
function getFieldName(input){
  if(input !== password1 && input !== password2){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
  }else{
    return 'Password'
  }
}



// Event listeners

form.addEventListener('submit', function(event){
  event.preventDefault()

  checkRequired([username, email, password1, password2])
  checkLength(username, 3, 15)
  checkLength(password1,6,27)
  checkEmailValidity(email)
  checkPasswordMatch(password1,password2)

})