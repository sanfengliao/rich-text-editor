import {
  describe, expect, it
} from 'vitest';
import { createDocumentByJson, createEmptyDocument } from '../../src/model/helper';

// Edit an assertion and save to see HMR in action
describe('test model/helper', () => {
  it('create Empty Document', () => {
    expect(createEmptyDocument().toJSON()).toStrictEqual({
      children: [
        {
          children: [
            {
              text: '',
            }
          ],
        }

      ],
    });
  });

  it('create Document', () => {
    const doc = createDocumentByJson([
      {
        children: [
          {
            children: [
              {
                text: '123',
              }
            ],
          },
          {
            text: '456',
          }
        ],
      },
      {
        text: '789',
      }
    ]);
    expect(doc.toJSON()).toStrictEqual({
      children: [
        {
          children: [
            {
              children: [
                {
                  text: '123',
                }
              ],
            },
            {
              text: '456',
            }
          ],
        },
        {
          text: '789',
        }
      ],
    });
  });
});
