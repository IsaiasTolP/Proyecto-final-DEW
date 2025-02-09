import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import LanguageSwitcher from '@/components/LangSwitcher.vue';
import { createI18n } from 'vue-i18n';
import type { VueWrapper } from '@vue/test-utils';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {},
    es: {},
  },
});

describe('LangSwitcher.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n],
      },
    });
  });

  it('muestra el idioma actual correctamente', () => {
    expect(wrapper.find('button.bg-blue-500').text()).toBe('English');
  });

  it('cambia el idioma a Español al hacer clic', async () => {
    await wrapper.findAll('button')[1].trigger('click');
    expect(i18n.global.locale.value).toBe('es');
    expect(wrapper.find('button.bg-blue-500').text()).toBe('Español');
  });

  it('cambia el idioma a Inglés al hacer clic', async () => {
    await wrapper.findAll('button')[1].trigger('click'); // Cambia a Español primero
    await wrapper.findAll('button')[0].trigger('click'); // Luego vuelve a Inglés
    expect(i18n.global.locale.value).toBe('en');
    expect(wrapper.find('button.bg-blue-500').text()).toBe('English');
  });
});
