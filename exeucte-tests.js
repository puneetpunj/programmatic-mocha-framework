const { runMochaTests } = require('./lib/mocha-setup');
const { defineTestSuiteAndAddTests } = require('./programmatic/sample-tests');


(async () => {

    defineTestSuiteAndAddTests();

    try {
        const result = await runMochaTests()
        console.log(result);
    }
    catch (e) { console.log(e) }
})()