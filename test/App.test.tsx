import React from 'react';
import { shallow, render } from 'enzyme';

import App from '../App';

describe('App', () => {
	it.only('renders the component', () => {
		const component = shallow(<App />);

		expect(component).toHaveBeenCalled();
	});
});
