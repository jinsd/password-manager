console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

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
			}
		}).help('help');
	})
	.help('help')
	.argv;

var command = argv._[0]

function createAccount(account) {
	var accounts = storage.getItemSync('accounts');

	if(typeof accounts === 'undefined') {
		var accounts = [];
	}
	
	accounts.push(account);

	storage.setItemSync('accounts', accounts);
	return account;
}

function getAccount() {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function (account) {
		if(account.name === argv.name){
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

if(command === 'create') {
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
	});
	console.log('Account created');
	console.log(createdAccount);
} else if (command === 'get') {
	var fetchedAccount = getAccount(argv.name);
	if(fetchedAccount === 'undefined'){
		console.log('Account not found');
	} else {
		console.log('Account found');
		console.log(fetchedAccount);
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















