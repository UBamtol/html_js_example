const nameH1Element = document.querySelector('h1.inline');
const connectNameElement = document.querySelector('span.red');
const inputModalElement = document.querySelector('#inputModal');
const modalSubmitBtn = document.querySelector('button.modalSubmit');
const numberSpanElement = document.querySelector('span.userNumber');
const emailSpanElement = document.querySelector('span.email');
const localname = localStorage.getItem('userName');
const localnumber = localStorage.getItem('userNumber');
const localemail = localStorage.getItem('email');

const setUserName = (name) => {
  nameH1Element.textContent = name;
  connectNameElement.textContent = name;
  // localStorage.setItem('userName', name);
};
const setUserNo = (number) => {
  numberSpanElement.textContent = number;
  // localStorage.setItem('userNumber', number);
};
const setUserEmail = (email) => {
  emailSpanElement.textContent = email;
  // localStorage.setItem('email', email);
};

if (localname || localnumber || localemail) {
  setUserName(localname);
  setUserNo(localnumber);
  setUserEmail(localemail);
}

nameH1Element.onclick = () => {
  inputModalElement.showModal();
  // const inputName = prompt('이름을 입력해주세요');
  // if (inputName) {
  //   localStorage.setItem('name', inputName);
  //   setUserName(inputName);
  // } else {
  //   alert('이름이 입력되지 않았습니다.');
  // }
};

modalSubmitBtn.onclick = () => {
  const modalFormElement = document.querySelector('.modalForm');
  const formData = new FormData(modalFormElement);

  let errorList = [];
  for (const [key, value] of formData) {
    const chkName = /^[가-힣a-zA-Z]+$/;
    const chkNum = /[0-9]{9}$/;
    const chkEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

    localStorage.setItem(key, value);
    if (key === 'userName') {
      if (chkName.test(value)) {
        setUserName(value);
      } else {
        errorList.push('이름');
      }
    } else if (key === 'userNumber') {
      if (chkNum.test(value)) {
        setUserNo(value);
      } else {
        errorList.push('학번');
      }
    } else if (key === 'email') {
      if (chkEmail.test(value)) {
        setUserEmail(value);
        alert('등록이 성공적으로 완료되었습니다.');
        inputModalElement.close();
      } else {
        errorList.push('이메일');
        alert(`${errorList}을 확인해주세요`);
        errorList = [];
      }
    }
  }
};

inputModalElement.onclick = (e) => {
  if (e.target.nodeName === 'DIALOG') {
    inputModalElement.close();
  }
};
