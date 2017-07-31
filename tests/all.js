const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const parse = require("../lib/index");

describe('@datagica/parse-ibans', () => {

  it('should extract IBANs', (done) => {
    Promise.all([
      {
        input: `
          THIS IS NOT IBAN
          THIS IS NOT AN IBAN
          END OF SENTENCE.
          NL91 ABNA 0417 1643 00
          NL91-ABNA-0417-1643-00
          NL91 ABNA 0517 1643 00.
          AT61 1904 3002 3457 3201
          HR12 1001 0051 8630 0016
          DE89 3704 0044 0532 0130 00
          ES91 2100 0418 4502 0005 1332.
        `,
        output: [
  {
    "ngram": "NL91 ABNA 0417 1643 00",
    "value": {
      "id": "iban-nl91abna0417164300",
      "label": {
        "en": "NL91 ABNA 0417 1643 00"
      },
      "isValid": true,
      "countryName": "Netherlands",
      "countryCode": "NL"
    },
    "score": 1,
    "position": {
      "sentence": 1,
      "word": 5,
      "begin": 117,
      "end": 139
    }
  },
  {
    "ngram": "NL91-ABNA-0417-1643-00",
    "value": {
      "id": "iban-nl91abna0417164300",
      "label": {
        "en": "NL91-ABNA-0417-1643-00"
      },
      "isValid": true,
      "countryName": "Netherlands",
      "countryCode": "NL"
    },
    "score": 1,
    "position": {
      "sentence": 1,
      "word": 16,
      "begin": 150,
      "end": 172
    }
  },
  {
    "ngram": "AT61 1904 3002 3457 3201",
    "value": {
      "id": "iban-at611904300234573201",
      "label": {
        "en": "AT61 1904 3002 3457 3201"
      },
      "isValid": true,
      "countryName": "Austria",
      "countryCode": "AT"
    },
    "score": 1,
    "position": {
      "sentence": 2,
      "word": 5,
      "begin": 219,
      "end": 243
    }
  },
  {
    "ngram": "DE89 3704 0044 0532 0130 00",
    "value": {
      "id": "iban-de89370400440532013000",
      "label": {
        "en": "DE89 3704 0044 0532 0130 00"
      },
      "isValid": true,
      "countryName": "Germany",
      "countryCode": "DE"
    },
    "score": 1,
    "position": {
      "sentence": 2,
      "word": 36,
      "begin": 292,
      "end": 319
    }
  },
  {
    "ngram": "ES91 2100 0418 4502 0005 1332",
    "value": {
      "id": "iban-es9121000418450200051332",
      "label": {
        "en": "ES91 2100 0418 4502 0005 1332"
      },
      "isValid": true,
      "countryName": "Spain",
      "countryCode": "ES"
    },
    "score": 1,
    "position": {
      "sentence": 2,
      "word": 52,
      "begin": 332,
      "end": 361
    }
  }
]
      }
    ].map(test => {
      return parse(test.input).then(output => {
        console.log("output: " + JSON.stringify(output, null, 2));
        expect(output).to.be.like(test.output);
        return Promise.resolve(true);
      })
    })).then(finished => {
      done();
    }).catch(err => done(err))
  })

})
