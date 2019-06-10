import { shallowMount } from '@vue/test-utils'
import HelloWorld from 'packages/hello-world/hello-world.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.props('msg')).toBe(msg)
  })
})
