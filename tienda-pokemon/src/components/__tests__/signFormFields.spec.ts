import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import LoginForm from '@/components/SignFormFields.vue';

// Stub para el componente InputText que emule un input nativo con v-model
const InputTextStub = {
  props: ['modelValue'],
  template: `<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />`
};

describe('LoginForm.vue', () => {
  // Factoría para montar el componente con los plugins y stubs necesarios.
  const factory = (props = {}, slots = {}) => {
    return mount(LoginForm, {
      props: {
        email: '',
        password: '',
        ...props,
      },
      slots,
      global: {
        stubs: {
          // Ignoramos LangSwitcher, ya que tiene sus propios tests
          LangSwitcher: true,
          // Usamos nuestro stub para InputText
          InputText: InputTextStub,
        },
        mocks: {
          // Mock simple para $t (la función de traducción)
          $t: (msg: string) => msg,
        },
      },
    });
  };

  it('renders labels and inputs with initial props', () => {
    const wrapper = factory({ email: 'test@example.com', password: 'secret' });
    // Verifica que se rendericen los labels (usando la key de traducción)
    expect(wrapper.html()).toContain('login.email');
    expect(wrapper.html()).toContain('login.password');

    const inputs = wrapper.findAll('input');
    // Se esperan dos inputs: el primero para email y el segundo para password
    expect(inputs[0].element.value).toBe('test@example.com');
    expect(inputs[1].element.value).toBe('secret');
  });

  it('emits update:email when email input changes', async () => {
    const wrapper = factory({ email: 'old@example.com' });
    // El primer input corresponde al email
    const emailInput = wrapper.findAll('input')[0];
    await emailInput.setValue('new@example.com');

    // Verifica que se haya emitido el evento "update:email"
    const emailEvents = wrapper.emitted()['update:email'];
    expect(emailEvents).toBeTruthy();
    expect(emailEvents && emailEvents[0]).toEqual(['new@example.com']);
  });

  it('emits update:password when password input changes', async () => {
    const wrapper = factory({ password: 'oldpass' });
    // El segundo input corresponde al password
    const inputs = wrapper.findAll('input');
    const passwordInput = inputs[1];
    await passwordInput.setValue('newpass');

    // Verifica que se haya emitido el evento "update:password"
    const passwordEvents = wrapper.emitted()['update:password'];
    expect(passwordEvents).toBeTruthy();
    expect(passwordEvents && passwordEvents[0]).toEqual(['newpass']);
  });

  it('renders slot content', () => {
    const slotContent = '<div class="custom-slot">Extra Content</div>';
    const wrapper = factory({}, { default: slotContent });
    const slotElement = wrapper.find('.custom-slot');
    expect(slotElement.exists()).toBe(true);
    expect(slotElement.text()).toBe('Extra Content');
  });
});
