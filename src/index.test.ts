import { Validation } from './Validation'

  test('Validation', (done) => {
    const callStack = []
    const validation = new Validation();

    validation.use(function (next) {
      callStack.push('hook 1')
      next();
    });

    validation.use(function (next) {
      callStack.push('hook 2')
      next();
    });

    validation.use(function (next) {
      callStack.push('hook 3')
      next();
    });

    validation.validate(function() {
      expect(callStack).toHaveLength(3)
      expect(callStack[0]).toBe('hook 1')
      expect(callStack[1]).toBe('hook 2')
      expect(callStack[2]).toBe('hook 3')
      done()
    });
})
