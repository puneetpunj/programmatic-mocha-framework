const { runMochaTests } = require('./lib/mocha-setup');
const { defineTestSuiteAndAddTests } = require('./programmatic/sample-tests');
const { defineDBTestSuiteAndAddTests } = require('./programmatic/db-test');

(async () => {

    defineTestSuiteAndAddTests();
    await defineDBTestSuiteAndAddTests();

    try {
        const result = await runMochaTests()
        console.log(result);
    }
    catch (e) { console.log(e) }
})()