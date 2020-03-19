// import { detectEmail } from '../../controllers/detectController';

document.addEventListener('DOMContentLoaded', event => {
  let button = document.querySelector('#button_detect'),
    input = document.querySelector('#text'),
    test_case = document.querySelector('#test_case'),
    detect_email = document.querySelector('#detect_email');

  button.addEventListener('click', () => {
    let text = document.querySelector('#text').value;
    endRequest(text);
  });

  test_case.addEventListener('click', testCase);

  detect_email.addEventListener('click', () => {
    let text = document.querySelector('#text').value;
    detectEmail();
  });
});

const endRequest = async text => {
  try {
    var res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/detectApi/detectPhone',
      data: {
        text
      }
    });
    var list = res.data.value;
    console.log(list);
  } catch (err) {
    console.log(err);
  }
};

const testCase = async () => {
  try {
    var res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/detectApi/testcase'
    });
    console.log(res.data.result);
  } catch (err) {
    console.log(err);
  }
};

const detectEmail = async text => {
  try {
    var res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/detectApi/detectEmail',
      data: {
        text
      }
    });
    console.log(res.data.value);
  } catch (err) {
    console.log(err);
  }
};
