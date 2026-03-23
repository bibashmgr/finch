import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isFirstDayOfMonth" })
export class IsFirstDayOfMonthConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.getUTCDate() === 1;
  }

  defaultMessage() {
    return "month must be the 1st day of the month (e.g. 2026-03-01)";
  }
}

export function IsFirstDayOfMonth(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsFirstDayOfMonthConstraint,
    });
  };
}
