let userData = {
  'USD': 1000,
  'EUR': 900,
  'UAH': 15000,
  'BIF': 20000,
  'AOA': 100
};

let bankData = {
  'USD': {
    max: 3000,
    min: 100,
    img: '💵'
  },
  'EUR': {
    max: 1000,
    min: 50,
    img: '💶'
  },
  'UAH': {
    max: 0,
    min: 0,
    img: '💴'
  },
  'GBP': {
    max: 10000,
    min: 100,
    img: '💷'
  }
}

function getMoney(userData, bankData) {
  let balanceConfirmed = false;

  return new Promise((resolve, reject) => {
    confirm('View card balance?');
    let userResoponse = true;

    userResoponse ? resolve(userData) : reject({userData: userData, bankData: bankData});
  })

  .then(
    (userData) => {
      balanceConfirmed = true;
    const askForCurrency = () => {
      const currency = prompt('Enter currency code as follows: USD, EUR, UAH, GBP, BIF, AOA');
      if (!(currency in userData)) {
        alert('Please, enter correct currency code as requested');
        return askForCurrency(); 
      } else {
        console.log(`Balance is: ${userData[currency]} ${currency}`);
        console.log('Thank you, have a nice day 😊');
        return userData;
      }
    };

    return askForCurrency();
  })
  
  .then(currency => {
    if (!balanceConfirmed) {

      const currency = prompt('Enter currency code as follows: USD, EUR, UAH, GBP, BIF, AOA');
      if (!(currency in userData)) {
        alert('Please, enter correct currency code as requested');
        
      } else {
        return moneyWithdrawal(currency, bankData);
      }
    }
    return currency;
  })

  .then(
    ({ currency, amount }) => {
    
      if (!balanceConfirmed) {
          if (isNaN(amount)) {
            return Promise.reject (parseFloat(prompt('Please enter correct amount')));
          } else if (amount > bankData[currency].max) {
            return Promise.reject (parseFloat(prompt('The entered amount is greater than the allowed maximum. Maximum withdrawal amount: ')));
          } else if (amount < bankData[currency].min) {
            return Promise.reject (parseFloat(prompt('The entered amount is less than the allowed minimum. Minimum withdrawal amount:')));
          } else {
            userData[currency] -= amount;
            console.log(`Here are your cash ${amount} ${currency} ${bankData[currency]}.img`);
            console.log('Thank you, have a nice day 😊');
            return userData;
          }
        }
        return userData;
  })

  .catch(error => {
    console.log('There is some mistake, please restart it again');
    return error;
  })
}

function moneyWithdrawal(currency, bankData) {
  return new Promise((resolve, reject) => {
    const amount = parseFloat(prompt('Please enter the amount which you want to withdraw'));
    resolve({ currency, amount});
  });
}

getMoney(userData, bankData);

