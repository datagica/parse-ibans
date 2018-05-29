const parse = require('./index')

const testData = [{
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
  expected: [{
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
        "begin": 101,
        "end": 123
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
        "word": 12,
        "begin": 130,
        "end": 152
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
        "begin": 191,
        "end": 215
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
        "word": 28,
        "begin": 256,
        "end": 283
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
        "word": 40,
        "begin": 292,
        "end": 321
      }
    }
  ]
}]

test('extract IBANs', () => Promise.all(
  testData.map(async ({ input, expected }) => expect(await parse(input)).toEqual(expected))
))
