import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from './components/Calculator.component'

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

describe('App Component', () => {
  it('it has a caculator component', () => {
    expect(wrapper.find(Calculator).length).toEqual(1);
  });
});