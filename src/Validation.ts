export class Validation {
  use (validator) {
    const self = this;

    const stackValidate = function(validate) {
      return function(next) {
        validate.call(self, function() {
          validator.call(self, next.bind(self));
        });
      }.bind(this);
    }

    this.validate = stackValidate(this.validate);
  }
  validate (next) {
    next();
  }
}
