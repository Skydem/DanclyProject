import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `Pole ${ctx.field} jest wymagane.`,
          min: `Pole ${ctx.field} jest za krótkie.`,
          max: `Pole ${ctx.field} jest za długie.`,
          alphaSpaces: `Pole ${ctx.field} może zawierać tylko znaki i spacje.`,
          email: `Pole ${ctx.field} musi być prawidłowym e-mailem.`,
          min_value: `Pole ${ctx.field} ma za małą wartość.`,
          max_value: `Pole ${ctx.field} ma za dużą wartość.`,
          passwords_mismatch: 'Hasła do siebie nie pasują.',
          tos: 'Musisz zaakceptować warunki.',
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `Pole ${ctx.field} jest nieprawidłowe`;
        return message;
      },
    });
  },
};
