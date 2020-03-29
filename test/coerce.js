/* es-lint jasmine */

describe('coerce...', function() {
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
    });

    describe('floats..', function() {
      it ('3.14', function() {
        expect(tc.coerce('3.14', tc.CODES.NUMBER)).toBe(3.14);
      });
    });
  });

  describe('function...', function() {
    it ('vanilla', function() {
      expect(function() {
        tc.coerce(function() {}, tc.CODES.STRING);
      }).toThrow();
    });
  });
});
