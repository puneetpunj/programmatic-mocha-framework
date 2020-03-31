const { suite, Test } = require('../lib/mocha-setup')
const { sendSQLServerQuery } = require('../lib/db-connect')
const expect = require('chai').expect;
const reportValue = require('mochawesome/addContext');

const defineDBTestSuiteAndAddTests = async () => {
    const parentSuiteName = suite('sql server database test')
    await validatedbData(parentSuiteName);
}


const sort_by_key = (array, key) => {
    return array.sort((a, b) => {
        const x = a[key]; const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const validatedbData = async (parentSuite) => {

    const expectedData = [{
        CustomerId: 1,
        Name: 'Orlando',
        Location: 'Australia',
        Email: ''
    },
    {
        CustomerId: 2,
        Name: 'Keith',
        Location: 'India',
        Email: 'keith0@adventure-works.com'
    },
    {
        CustomerId: 3,
        Name: 'Donna',
        Location: 'Germany',
        Email: 'donna0@adventure-works.com'
    },
    {
        CustomerId: 4,
        Name: 'Janet',
        Location: 'United States',
        Email: 'janet1@adventure-works.com'
    }];

    const result = await sendSQLServerQuery('SELECT * FROM dbo.Customers')
    const records = result.recordset;
    const sortedRecords = sort_by_key(records, 'CustomerId')
    // console.log(sortedRecords);

    sortedRecords.forEach((record, index) => {
        parentSuite.addTest(new Test(`Validate record number - ${index + 1}`, function () {
            reportValue(this, `Current record to validate - ${record}`);
            expect(record).to.eql(expectedData[index])
        }))
    })
}

module.exports = { defineDBTestSuiteAndAddTests }