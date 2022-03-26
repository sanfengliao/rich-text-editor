import { assert, describe, expect, it, test } from 'vitest'
import { Document } from '../../src/model/document'

// Edit an assertion and save to see HMR in action
describe('test model/document', () => {
  it('create Empty Document', () => {
    expect(Document.createEmptyDocument().toJSON()).toStrictEqual([
      [
        {
          text: ''
        }
      ]
    ])
  })

  it('insert Text', () => {
    const doc = Document.createEmptyDocument();
    doc.insertText('abc');
    expect(doc.toJSON()).toStrictEqual([
      [
        {
          text: 'abc'
        }
      ]
    ])
    
  })
})