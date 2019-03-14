import React from 'react';
import { shallow, mount } from 'enzyme';
import { BannerComponent } from './BannerComponent';

describe('BannerComponent', () => {
  let banner = null
  let props = {}

  beforeEach(() => {
    props.city = 'São Paulo';
    props.wallPaper = 'cloudy.jpg';
    props.todayWeather = {
      "dt": 1552575600,
      "main": {
        "temp": 32.74,
        "temp_min": 28.48,
        "temp_max": 32.74,
        "pressure": 1029.69,
        "sea_level": 1029.69,
        "grnd_level": 993.33,
        "humidity": 84,
        "temp_kf": 2.36
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.15,
        "deg": 70.0042
      },
      "rain": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-03-14 15:00:00"
    };
  })

  const mountedBanner = () => {
    if(!banner) {
      banner = mount(<BannerComponent {...props}/>)
    }
    return banner
  }

  it('should render without problems', () => {
    const component = shallow(<BannerComponent {...props}/>)
    expect(component).toMatchSnapshot()
  })

  it('should render default image on banner', () => {
    const section = mountedBanner().find('section').first()
    expect(section.props().style.backgroundImage).toBe(`url(${props.wallPaper})`)
  })

})