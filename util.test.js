const puppeteer = require ('puppeteer');
const { generateText } = require('./util');
const { checkAndGenerate } = require('./util');
jest.setTimeout(30000);

test('should output name and age',() => {
	const text = generateText ('Max',29 ) ;
	expect(text).toBe('Max (29 years old)');
	const text2 = generateText ('Chiheb',32 ) ;
	expect(text2).toBe('Chiheb (32 years old)');
});


test('should output data-less text', () => {

const text = generateText();
expect(text).toBe('undefined (undefined years old)');
});



test('should generate a valid text ouptput', () => {

const text = checkAndGenerate('Max', 29);
expect(text).toBe('Max (29 years old)');

});


test('should click around', async () => {

	const browser = await puppeteer.launch({

		headless: false,
		slowMo: 80,
		args: ['--window-size=1920,1080']
	});

	const page = await browser.newPage();
	await page.goto('file:///E:/Compressed/js-testing-introduction-starting-setup/index.html');
	await page.click('input#name');
	await page.type('input#name','Anna');

	await page.click('input#age');
	await page.type('input#age','28');
	await page.click('#btnAddUser');
	const finalText = await page.$eval('.user-item', el => el.textContent);
	expect(finalText).toBe('Anna (28 years old)');
    await browser;
});

