// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Flex } from '../primitives';
import { TabView } from '@smolitux/core';

export interface FilterOption {
  /** Filter-ID */
  id: string;
  /** Anzeigename */
  label: string;
  /** Icon (optional) */
  icon?: React.ReactNode;
}

export interface FeedFilterProps {
  /** Verfügbare Filter */
  filters: FilterOption[];
  /** Aktiver Filter */
  activeFilter: string;
  /** Callback für Filterwechsel */
  onChange: (filterId: string) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * FeedFilter-Komponente für die Filterung des Feeds.
 * Ermöglicht die Auswahl verschiedener Filteroptionen.
 */
export const FeedFilter: React.FC<FeedFilterProps> = ({
  filters,
  activeFilter,
  onChange,
  className = '',
  style,
}) => {
  // Konvertiere die Filter in das TabView-Format
  const tabs = filters.map((filter) => ({
    id: filter.id,
    label: (
      <Flex align="center">
        {filter.icon && <span style={{ marginRight: '8px' }}>{filter.icon}</span>}
        {filter.label}
      </Flex>
    ),
    content: null, // Wir verwenden den TabView nur für die Tabs, nicht für den Inhalt
  }));

  return (
    <Flex
      className={`feed-filter ${className}`}
      style={{
        marginBottom: '16px',
        ...style,
      }}
    >
      <TabView
        tabs={tabs}
        activeTab={activeFilter}
        onChange={onChange}
        variant="soft-rounded"
        size="sm"
        tabListClassName="feed-filter-tabs"
        tabPanelsClassName="feed-filter-panels"
      />
    </Flex>
  );
};
