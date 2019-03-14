import React from 'react'
import {shallow, mount} from 'enzyme'
import { HeaderComponent } from './HeaderComponent';
describe('HeaderComponent', () => {

  it('should render without problems', () => {
    const compoent = shallow(<HeaderComponent title="Weather app"/>)
    expect(compoent).toMatchSnapshot()
  })

  it('should have a logo image if proper src', () => {
    const compoent = mount(<HeaderComponent title="weather app" />)
    const img = compoent.find('img').first()
    expect(img.length).toBe(1)
    expect(img.getElement().props.src).toEqual('logo.svg')
  })

  it('should have a title tag', () => {
    const compoent = mount(<HeaderComponent title="weather app" />)
    const h2 = compoent.find('h2')
    expect(h2.length).toBe(1)
  })

})