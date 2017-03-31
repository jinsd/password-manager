console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

function createAccount(account) {
	var accounts = storage.getItemSync('accounts');

	if(typeof accounts === 'undefined') {
		var accounts = [];
	}
	
	accounts.push(account);
	storage.setItemSync('accounts', accounts);
	return account;
}

function getAccount(accountName) {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function (account) {
		if(account.name === accountName){
			matchedAccount = account;
		}
	});

	return matchedAccount;
}
/* Add items to storage
storage.setItemSync('accounts', [{
 	username: 'Joe',
 	balance: 0
 }]);
*/

//var accounts = storage.getItemSync('accounts');


// var facebook = {
// 	name: 'facebook',
// 	username: 'jinsd6@gmail.com',
// 	password: 'Password123!'
// };

// var united  = {
// 	name: 'united',
// 	username: 'WM418156',
// 	password: 'Password123!'
// };

// console.log(createAccount(united));

// var hawaiian = {
// 	name: 'hawaiian',
// 	username: 'schjo06',
// 	password: 'Password123!'
// };

//console.log(createAccount(hawaiian));

console.log(getAccount('united'));

/******************
 accounts.push({
 	username: 'Ray',
 	balance: 75
 });
******************/

// storage.setItemSync('accounts', accounts);
// save using setItemSync

// var accounts = storage.getItemSync('accounts');
// console.log(accounts);