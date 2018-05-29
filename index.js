'use strict'

const tokenize  = require('@datagica/tokenize')()
const ibantools = require('ibantools')


function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {
    const lastWordPosition = positions.word
    let match

    const pattern = new RegExp(/(?:[a-zA-Z0-9]{1,4})(?:[\- ][a-zA-Z0-9]{1,4}){3,7}|[a-zA-Z0-9\-]18,40}/, 'gi')

    while (match = pattern.exec(sentence)) {

      const ngram  = match[0].trim()
      const pretty = ngram.toUpperCase()
      const bare   = pretty.replace(/[\- ]+/gi, '')

      if (bare.length < 15 || bare > 32) { continue }

      const iban = ibantools.extractIBAN(pretty)

      if (!iban.valid) { continue }

      const entity = {
        id: 'iban-'+bare.toLowerCase().replace(/[ ]+/gi, '-'),
        label: {
          en: `${pretty}`
        },
        isValid: iban.valid
      }

      if (iban.countryName) {
        entity.countryName = iban.countryName
      }
      if (iban.countryCode) {
        entity.countryCode = iban.countryCode
      }

      const nbWords = sentence.slice(0, pattern.lastIndex)
                              .split(/[ \r\n]/g)
                              .length

      results.push({
        ngram: ngram,
        value: entity,
        score: 1,
        position: {
          sentence: positions.sentence,
          word    : lastWordPosition    + nbWords,
          begin   : positions.character + pattern.lastIndex,
          end     : positions.character + pattern.lastIndex + ngram.length
        }
      })
    }
}
async function parseIBANs(input) { return tokenize(input, algorithm, []) }

module.exports = parseIBANs.default = parseIBANs
