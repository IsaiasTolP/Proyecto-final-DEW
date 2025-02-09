import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, type MountingOptions, type VueWrapper, RouterLinkStub } from '@vue/test-utils';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';

// Definición de mocks inline para evitar problemas de hoisting
vi.mock('@/firebase.ts', () => {
  class MockConnectToFirebase {
    onAuthStateChanged(callback: (user: any) => void): void {
      // Inicialmente no hay usuario logueado
      callback(null);
    }
  }
  return {
    ConnectToFirebase: MockConnectToFirebase,
    app: {},
  };
});

vi.mock('@/services/auth.ts', () => {
  class MockUserAuth {
    async signOut(): Promise<void> {
      return Promise.resolve();
    }
  }
  return {
    UserAuth: MockUserAuth,
  };
});

import Navigation from '@/components/navbar.vue';

describe('Navigation.vue', () => {
  let wrapper: VueWrapper<any>;
  let router: Router;
  let pinia: ReturnType<typeof createPinia>;
  let i18n: ReturnType<typeof createI18n>;

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);

    // Crea el router con createMemoryHistory (ideal para tests)
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/login', component: { template: '<div>Login</div>' } },
        { path: '/register', component: { template: '<div>Register</div>' } },
        { path: '/purchase-history', component: { template: '<div>Purchase History</div>' } },
      ],
    });

    // Simulando el I18n
    i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          logo: 'logo',
          logged: 'logged',
          goToLogin: 'goToLogin',
          goToRegister: 'goToRegister',
          purchaseHistory: 'purchaseHistory',
          logout: 'logout',
        },
      },
    });

    const options: MountingOptions<any> = {
      global: {
        plugins: [router, pinia, i18n],
        // Configuramos los _stubs_:
        // • Para router-link usamos RouterLinkStub para poder acceder a su prop "to"
        stubs: {
          'router-link': RouterLinkStub,
          Cart: true,
          LangSwitcher: true,
        },
      },
    };

    wrapper = mount(Navigation, options);
    await router.isReady();
  });

  it('Se renderizan los enlaces correspondientes dependiendo del estado de logueo', () => {
    // Por defecto, isLoggedIn es false
    expect(wrapper.find('.text-lg.font-bold').text()).toBe('logo');

    const routerLinks = wrapper.findAllComponents(RouterLinkStub);
    const loginLink = routerLinks.find(link => link.props('to') === '/login');
    const registerLink = routerLinks.find(link => link.props('to') === '/register');
    const purchaseHistoryLink = routerLinks.find(link => link.props('to') === '/purchase-history');

    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
    // Al no estar logueado, no se debe renderizar el link de purchase history
    expect(purchaseHistoryLink).toBeUndefined();

    // El botón de logout se encuentra dentro del bloque v-else; por tanto, no debe existir
    const buttons = wrapper.findAll('button');
    const logoutButton = buttons.find(btn => btn.text().trim() === 'logout');
    expect(logoutButton).toBeUndefined();
    expect(wrapper.find('span.text-green-400').exists()).toBe(false);
  });

  it('Se rendereizan los componentes que solo aparecen cuando se está logueado', async () => {
    // Forzamos el estado de "logueado"
    (wrapper.vm as any).isLoggedIn = true;
    await wrapper.vm.$nextTick();

    const routerLinks = wrapper.findAllComponents(RouterLinkStub);
    const loginLink = routerLinks.find(link => link.props('to') === '/login');
    const registerLink = routerLinks.find(link => link.props('to') === '/register');
    const purchaseHistoryLink = routerLinks.find(link => link.props('to') === '/purchase-history');

    expect(wrapper.find('.text-lg.font-bold').text()).toBe('logo');
    expect(loginLink).toBeUndefined();
    expect(registerLink).toBeUndefined();
    expect(purchaseHistoryLink).toBeTruthy();

    const buttons = wrapper.findAll('button');
    const logoutButton = buttons.find(btn => btn.text().trim() === 'logout');
    expect(logoutButton).toBeTruthy();

    const loggedSpan = wrapper.find('span.text-green-400');
    expect(loggedSpan.exists()).toBe(true);
    expect(loggedSpan.text()).toBe('logged');
  });


  const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

  it('Se llama a la función de logout cuando se hace click', async () => {
    // Forzamos el estado "logueado"
    (wrapper.vm as any).isLoggedIn = true;
    await wrapper.vm.$nextTick();
  
    // Espía la función signOut del servicio de autenticación
    const authModule = await import('@/services/auth.ts');
    const signOutSpy = vi.spyOn(authModule.UserAuth.prototype, 'signOut').mockResolvedValue();
  
    // Buscamos el botón de logout (por su texto "logout")
    const buttons = wrapper.findAll('button');
    const logoutButton = buttons.find(btn => btn.text().trim() === 'logout');
    expect(logoutButton).toBeTruthy();
  
    await logoutButton!.trigger('click');
  
    // Espera a que se resuelvan las promesas pendientes, incluyendo la navegación
    await flushPromises();
  
    expect(signOutSpy).toHaveBeenCalled();
    expect(router.currentRoute.value.path).toBe('/login');
  });


  it('Se activa el modo oscuro correctamente', async () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(1);
    const darkModeButton = buttons[0];

    // Estado inicial: modo claro
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('p-dark')).toBe(false);

    // Activa el modo oscuro
    await darkModeButton.trigger('click');
    expect(wrapper.vm.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('p-dark')).toBe(true);

    // Vuelve al modo claro
    await darkModeButton.trigger('click');
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('p-dark')).toBe(false);
  });
});
