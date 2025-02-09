// FilterComponent.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { usePokemonStore } from '@/stores/PokemonStore'
import FilterComponent from '@/components/PokemonFilter.vue'
import type { Pokemon } from '@/models/Pokemon'

// Mock de i18n
const mocks = {
  $t: (key: string) => key.split('.').pop()
}

describe('FilterComponent', () => {
  const mockPokemons: Partial<Pokemon>[] = [
    {
      id: 1,
      name: 'Charizard',
      weight: 90,
      attack: 84,
      pkm_type: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }]
    },
    {
      id: 2,
      name: 'Blastoise',
      weight: 85,
      attack: 83,
      pkm_type: [{ type: { name: 'water' } }]
    },
    {
      id: 3,
      name: 'Venusaur',
      weight: 100,
      attack: 82,
      pkm_type: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
    }
  ]

  let wrapper: any
  let pokemonStore: ReturnType<typeof usePokemonStore>
  let filteredPokemons: { value: Pokemon[] }

  beforeEach(() => {
    filteredPokemons = { value: [] }
    
    wrapper = mount(FilterComponent, {
      global: {
        plugins: [createTestingPinia()],
        mocks,
        provide: {
          filteredPokemons
        }
      }
    })

    pokemonStore = usePokemonStore()
    pokemonStore.pokemons = mockPokemons
  })

  describe('Renderizado inicial', () => {
    it('muestra todos los campos de filtro', () => {
      expect(wrapper.find('#filterType').exists()).toBe(true)
      expect(wrapper.find('#filterWeight').exists()).toBe(true)
      expect(wrapper.find('#filterPower').exists()).toBe(true)
    })

    it('muestra los labels correctamente', () => {
      expect(wrapper.text()).toContain('title')
      expect(wrapper.text()).toContain('type')
      expect(wrapper.text()).toContain('minWeight')
      expect(wrapper.text()).toContain('minAttack')
    })
  })

  describe('Funcionalidad de filtrado', () => {
    it('filtra por tipo correctamente', async () => {
      await wrapper.find('#filterType').setValue('fire')
      expect(wrapper.vm.filterType).toBe('fire')
      
      const filtered = wrapper.vm.filteredList
      expect(filtered.length).toBe(1)
      expect(filtered[0].name).toBe('Charizard')
    })

    it('filtra por peso mínimo', async () => {
      await wrapper.find('#filterWeight').setValue(85)
      expect(wrapper.vm.filterWeight).toBe(85)
      
      const filtered = wrapper.vm.filteredList
      expect(filtered.length).toBe(3)
      expect(filtered.map((p: Pokemon) => p.name)).toEqual(['Charizard', 'Blastoise', 'Venusaur'])
    })

    it('filtra por ataque mínimo', async () => {
      await wrapper.find('#filterPower').setValue(84)
      expect(wrapper.vm.filterPower).toBe(84)
      
      const filtered = wrapper.vm.filteredList
      expect(filtered.length).toBe(1)
      expect(filtered[0].name).toBe('Charizard')
    })

    it('combina múltiples filtros', async () => {
      await wrapper.find('#filterType').setValue('poison')
      await wrapper.find('#filterWeight').setValue(90)
      await wrapper.find('#filterPower').setValue(80)
      
      const filtered = wrapper.vm.filteredList
      expect(filtered.length).toBe(1)
      expect(filtered[0].name).toBe('Venusaur')
    })
  })

  describe('Inyección de dependencias', () => {
    it('actualiza la lista inyectada cuando cambian los filtros', async () => {
      await wrapper.find('#filterType').setValue('water')
      await wrapper.find('#filterWeight').setValue(80)
      await wrapper.find('#filterPower').setValue(80)
      
      expect(filteredPokemons.value.length).toBe(1)
      expect(filteredPokemons.value[0].name).toBe('Blastoise')
    })
  })

  describe('Mensaje de no coincidencias', () => {
    it('muestra el mensaje cuando no hay resultados', async () => {
      await wrapper.find('#filterType').setValue('electric')
      await wrapper.find('#filterWeight').setValue(200)
      
      expect(wrapper.vm.filteredList.length).toBe(0)
      expect(wrapper.text()).toContain('noMatch')
      expect(wrapper.find('.text-red-500').isVisible()).toBe(true)
    })

    it('oculta el mensaje cuando hay resultados', async () => {
      await wrapper.find('#filterType').setValue('fire')
      expect(wrapper.find('.text-red-500').exists()).toBe(false)
    })
  })

  describe('Validación de tipos', () => {
    it('maneja correctamente los tipos numéricos', async () => {
      await wrapper.find('#filterWeight').setValue('invalid')
      expect(wrapper.vm.filterWeight).toBe("")
      
      await wrapper.find('#filterPower').setValue('50')
      expect(wrapper.vm.filterPower).toBe(50)
    })
  })
})