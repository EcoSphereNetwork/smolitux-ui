import React from 'react';
import renderer from 'react-test-renderer';
import { RadioGroup } from '../RadioGroup';
import { Radio } from '../Radio';

jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('RadioGroup Snapshots', () => {
  it('renders default radio group', () => {
    const tree = renderer
      .create(
        <RadioGroup name="gender">
          <Radio value="m" label="Male" />
          <Radio value="f" label="Female" />
        </RadioGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal variant', () => {
    const tree = renderer
      .create(
        <RadioGroup name="pets" orientation="horizontal">
          <Radio value="cat" label="Cat" />
          <Radio value="dog" label="Dog" />
        </RadioGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
