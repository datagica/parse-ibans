# Parse IBANs

*Extracts IBANs from a text*

Note: still experimental (for instance, word coordinates might be off)

Example:

```
      THIS IS NOT IBAN
      THIS IS NOT AN IBAN
      END OF SENTENCE.
      NL91 ABNA 0417 1643 00
```

Output:

```json
  [
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
        "begin": 101,
        "end": 123
      }
    }
  ]
``` 
