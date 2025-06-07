import React from 'react';
import renderer from 'react-test-renderer';
import { Tabs } from '../Tabs';
import { TabList } from '../TabList';
import { Tab } from '../Tab';
import { TabPanels } from '../TabPanels';
import { TabPanel } from '../TabPanel';

describe('Tabs Snapshots', () => {
  test('renders default tabs', () => {
    const tree = renderer
      .create(
        <Tabs>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
          </TabPanels>
        </Tabs>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
