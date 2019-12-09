import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';
import Calculator from './components/Calculator.component'

let wrapper: ShallowWrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

describe('App Component', () => {
  it('it has a caculator component', () => {
    expect(wrapper.find(Calculator).length).toEqual(1);
  });
});