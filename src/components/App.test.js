import React from 'react';
import App from './App';
import { HeaderComponent } from './header/HeaderComponent';
import { shallow, mount } from 'enzyme';

describe('AppComponent', () => {

  let mountedApp = null
  const AppComponent = () => {
    if(!mountedApp){
      mountedApp = mount(
        <App apiKey="1c8fb84121cb361184855d25de956e74" />
      )
    }
    return mountedApp
  }

  it('should render app without error', () => {
    const component = shallow(<App apiKey="asdasdasd" />);
    expect(component).toMatchSnapshot()
  })

  it('should contains HeaderComponent', () => {
    expect(AppComponent().find(HeaderComponent).length).toBe(1)
  })

})
