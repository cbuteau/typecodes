/* es-lint jasmine */

describe('coerce...', function() {
  describe('nochange...', function() {
    it ('bool', function() {
      expect(tc.coerce(true, tc.CODES.BOOLEAN)).toBe(true);
      expect(tc.coerce(false, tc.CODES.BOOLEAN)).toBe(false);
    });

    it ('string', function() {
      var GOLD = 'testing';
      expect(tc.coerce(GOLD, tc.CODES.STRING)).toBe(GOLD);
    });

    it ('string', function() {
      var GOLD = 'testing';
      expect(tc.coerce(GOLD, tc.CODES.STRING)).toBe(GOLD);
    });
  });
  describe('string...', function() {
    describe('bool...', function() {
      it ('one', function() {
        expect(tc.coerce('true', tc.CODES.BOOLEAN)).toBe(true);
      });
      it ('two', function() {
        expect(tc.coerce('True', tc.CODES.BOOLEAN)).toBe(true);
      });
      it ('three', function() {
        expect(tc.coerce('tRue', tc.CODES.BOOLEAN)).toBe(true);
      });
      it ('four', function() {
        expect(tc.coerce('trUe', tc.CODES.BOOLEAN)).toBe(true);
      });
      it ('five', function() {
        expect(tc.coerce('truE', tc.CODES.BOOLEAN)).toBe(true);
      });


      it ('one', function() {
        expect(tc.coerce('false', tc.CODES.BOOLEAN)).toBe(false);
      });
      it ('two', function() {
        expect(tc.coerce('fAlse', tc.CODES.BOOLEAN)).toBe(false);
      });
      it ('three', function() {
        expect(tc.coerce('faLse', tc.CODES.BOOLEAN)).toBe(false);
      });
      it ('four', function() {
        expect(tc.coerce('falSe', tc.CODES.BOOLEAN)).toBe(false);
      });
      it ('five', function() {
        expect(tc.coerce('falsE', tc.CODES.BOOLEAN)).toBe(false);
      });
    });

    describe('number...',function() {
      describe('ints...', function() {
        it ('666', function() {
          expect(tc.coerce('666', tc.CODES.NUMBER)).toBe(666);
        });

        xit ('e notation', function() {
          expect(tc.coerce('1e1000', tc.CODES.NUMBER)).toBe(1000);
        });

      });

      describe('floats..', function() {
        it ('3.14', function() {
          expect(tc.coerce('3.14', tc.CODES.NUMBER)).toBe(3.14);
        });
      });
    });

    it ('null and undefined...', function() {
      expect(tc.coerce('ffff', tc.CODES.NULL)).toBe(null);
      expect(tc.coerce('ffff', tc.CODES.UNDEFINED)).toBe(undefined);
    });

  });


  describe('function...', function() {
    it ('vanilla', function() {
      expect(function() {
        tc.coerce(function() {}, tc.CODES.STRING);
      }).toThrow();
    });
  });

  describe('array...', function() {
    it ('string', function() {
      var GOLD = '[]';
      var empty = [];
      expect(tc.coerce(empty, tc.CODES.STRING)).toBe(GOLD);
    });

    it ('string', function() {
      var GOLD = '[1,2,3,4]';
      var empty = [1,2,3,4];
      expect(tc.coerce(empty, tc.CODES.STRING)).toBe(GOLD);
    });

  });


  describe('number...', function() {
    it ('bool', function() {
      expect(tc.coerce(3.14, tc.CODES.BOOLEAN)).toBe(true);
    });
    it ('bool', function() {
      expect(tc.coerce(0, tc.CODES.BOOLEAN)).toBe(false);
    });

    it ('bool', function() {
      expect(tc.coerce(3.14, tc.CODES.STRING)).toBe('3.14');
    });

    it ('undefined', function() {
      expect(tc.coerce(3.14, tc.CODES.UNDEFINED)).toBe(undefined);
    });


    it ('date', function() {
      expect(tc.coerce(13, tc.CODES.DATE)).toEqual(new Date(13));
    });
  });
});
