console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

var crypto = require('crypto-js');

var argv = require('yargs')
	.command('create', 'Creates an account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your account name goes here',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Your username goes here',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: "your password goes here",
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password for your vault',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Retrieves account information', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account password to retrieve',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password for ypur vault',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;

var command = argv._[0]

function getAccounts(masterPassword) {

	var encryptedAccounts = storage.getItemSync('accounts');
	var accounts = [];
	
	// decrypt
	if(typeof encryptedAccounts !== 'undefined') {
	 	var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
		var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	 }

	return accounts;
}

function saveAccounts (accounts, masterPassword) {

	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

	storage.setItemSync('accounts', encryptedAccounts.toString());

	return accounts;
}

function createAccount(account, masterPassword) {

	var accounts = getAccounts(masterPassword);
	
	accounts.push(account);
	
	saveAccounts(accounts, masterPassword);
}

function getAccount(accountName, masterPassword) {

	var matchedAccount;
	var accounts = getAccounts(masterPassword);

	accounts.forEach(function (account) {
		if(account.name === accountName){
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

if(command === 'create') {
	try {
		var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
		}, argv.masterPassword);
		
		console.log('Account created');
		console.log(createdAccount);
	} catch (e) {
		console.log('Unable to create account');
	}

	
} else if (command === 'get') {
	try {
		var fetchedAccount = getAccount(argv.name, argv.masterPassword);
		if(typeof fetchedAccount === 'undefined'){
			console.log('Account not found');
		} else {
			console.log('Account found');
			console.log(fetchedAccount);
		}

	} catch(e) {
		console.log('Unable to retrieve account');
	}
}

/* Add items to storage
storage.setItemSync('accounts', [{
 	username: 'Joe',
 	balance: 0
 }]);
*/

// var hawaiian = {
// 	name: 'hawaiian',
// 	username: 'schjo06',
// 	password: 'Password123!'
// };

/******************
 accounts.push({
 	username: 'Ray',
 	balance: 75
 });
******************/















