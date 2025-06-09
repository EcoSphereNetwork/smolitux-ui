// TODO: forwardRef hinzufügen
import React from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface RewardActivity {
  /** Eindeutige ID */
  id: string;
  /** Aktivitätstyp */
  type: 'post' | 'comment' | 'like' | 'share' | 'vote' | 'referral' | 'other';
  /** Beschreibung */
  description: string;
  /** Belohnungsbetrag */
  amount: number;
  /** Währung */
  currency: string;
  /** Datum */
  date: string;
  /** Status */
  status: 'pending' | 'completed' | 'failed';
  /** Referenz-ID (z.B. Post-ID) */
  referenceId?: string;
  /** Referenz-Titel */
  referenceTitle?: string;
}

export interface RewardTier {
  /** Eindeutige ID */
  id: string;
  /** Name */
  name: string;
  /** Beschreibung */
  description: string;
  /** Mindestpunktzahl */
  minPoints: number;
  /** Vorteile */
  benefits: string[];
  /** Ist der aktuelle Tier */
  isCurrent?: boolean;
  /** Ist der nächste Tier */
  isNext?: boolean;
}

export interface RewardSystemProps {
  /** Benutzername */
  username: string;
  /** Profilbild */
  avatar: string;
  /** Gesamtpunktzahl */
  totalPoints: number;
  /** Punktzahl bis zum nächsten Tier */
  pointsToNextTier: number;
  /** Belohnungsaktivitäten */
  activities: RewardActivity[];
  /** Belohnungstiers */
  tiers: RewardTier[];
  /** Zeitraum */
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all';
  /** Callback für Periodenwechsel */
  onPeriodChange?: (period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all') => void;
  /** Callback für Einlösen von Belohnungen */
  onClaimRewards?: () => void;
  /** Ob Belohnungen verfügbar sind */
  hasClaimableRewards?: boolean;
  /** Betrag der einlösbaren Belohnungen */
  claimableAmount?: number;
  /** Währung */
  currency: string;
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * RewardSystem-Komponente für die Anzeige und Verwaltung von Belohnungen.
 */
export const RewardSystem: React.FC<RewardSystemProps> = ({
  username,
  avatar,
  totalPoints,
  pointsToNextTier,
  activities,
  tiers,
  period = 'monthly',
  onPeriodChange,
  onClaimRewards,
  hasClaimableRewards = false,
  claimableAmount = 0,
  currency,
  isLoading = false,
  className = '',
  style,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'This Week';
      case 'monthly':
        return 'This Month';
      case 'yearly':
        return 'This Year';
      case 'all':
        return 'All Time';
      default:
        return 'This Month';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 5h14v3H5V5zm0 5h14v9H5v-9z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'comment':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'like':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 10h3l-4 8v-6h-3l4-8v6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'share':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'vote':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'referral':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8v8M8 12h8M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  const periods: RewardSystemProps['period'][] = ['daily', 'weekly', 'monthly', 'yearly', 'all'];

  const renderPeriodSelector = () => (
    <Flex style={{ overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
      {periods.map((p) => (
        <Box
          key={p}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: period === p ? '#3b82f6' : 'transparent',
            color: period === p ? 'white' : 'inherit',
            fontWeight: period === p ? 500 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            marginRight: '8px',
          }}
          onClick={() => onPeriodChange && onPeriodChange(p)}
        >
          {getPeriodLabel(p)}
        </Box>
      ))}
    </Flex>
  );

  const renderUserSummary = () => (
    <Box style={{ marginBottom: '24px' }}>
      <Flex align="center" style={{ marginBottom: '16px' }}>
        <Box
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '16px',
          }}
        >
          <img
            src={avatar}
            alt={username}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box>
          <Text weight="bold" size="xl">
            {username}
          </Text>
          <Text color="#6b7280">{totalPoints.toLocaleString()} points</Text>
        </Box>
      </Flex>

      {hasClaimableRewards && (
        <Card style={{ marginBottom: '16px' }}>
          <Box style={{ padding: '16px' }}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text weight="bold">Claimable Rewards</Text>
                <Text weight="bold" size="xl" color="#3b82f6">
                  {formatCurrency(claimableAmount)}
                </Text>
              </Box>
              <Button onClick={onClaimRewards}>Claim Now</Button>
            </Flex>
          </Box>
        </Card>
      )}

      {/* Progress to next tier */}
      {pointsToNextTier > 0 && (
        <Box>
          <Flex justify="space-between" align="center" style={{ marginBottom: '8px' }}>
            <Text>Progress to next tier</Text>
            <Text weight="medium">{pointsToNextTier.toLocaleString()} points needed</Text>
          </Flex>
          <Box
            style={{
              height: '8px',
              borderRadius: '4px',
              backgroundColor: '#e5e7eb',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                height: '100%',
                width: `${Math.min(100, (totalPoints / (totalPoints + pointsToNextTier)) * 100)}%`,
                backgroundColor: '#3b82f6',
                borderRadius: '4px',
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );

  const renderTiers = () => (
    <Box style={{ marginBottom: '24px' }}>
      <Text weight="bold" size="lg" style={{ marginBottom: '12px' }}>
        Reward Tiers
      </Text>
      <Grid columns={1} gap={12}>
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            style={{
              borderColor: tier.isCurrent ? '#3b82f6' : undefined,
              borderWidth: tier.isCurrent ? '2px' : undefined,
            }}
          >
            <Box style={{ padding: '16px' }}>
              <Flex justify="space-between" align="center" style={{ marginBottom: '8px' }}>
                <Text weight="bold">{tier.name}</Text>
                <Box
                  style={{
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    backgroundColor: tier.isCurrent
                      ? '#3b82f6'
                      : tier.isNext
                        ? '#e5e7eb'
                        : 'transparent',
                    color: tier.isCurrent ? 'white' : 'inherit',
                    fontSize: '0.75rem',
                  }}
                >
                  {tier.isCurrent
                    ? 'Current'
                    : tier.isNext
                      ? 'Next'
                      : `${tier.minPoints.toLocaleString()} points`}
                </Box>
              </Flex>
              <Text style={{ marginBottom: '8px' }}>{tier.description}</Text>
              <Box>
                {tier.benefits.map((benefit, index) => (
                  <Flex key={index} align="center" style={{ marginBottom: '4px' }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: '8px', color: '#10b981' }}
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Text size="sm">{benefit}</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  );

  const renderActivities = () => (
    <Box>
      <Text weight="bold" size="lg" style={{ marginBottom: '12px' }}>
        Recent Activities
      </Text>
      {activities.length === 0 ? (
        <Card>
          <Box style={{ padding: '16px', textAlign: 'center' }}>
            <Text color="#6b7280">No activities in this period</Text>
          </Box>
        </Card>
      ) : (
        <Card>
          <Box style={{ padding: '16px' }}>
            {activities.map((activity, index) => (
              <Box
                key={activity.id}
                style={{
                  padding: '12px 0',
                  borderBottom: index < activities.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <Flex justify="space-between" align="start">
                  <Flex align="start">
                    <Box
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        color: '#6b7280',
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Box>
                    <Box>
                      <Text>{activity.description}</Text>
                      {activity.referenceTitle && (
                        <Text size="sm" color="#6b7280">
                          {activity.referenceTitle}
                        </Text>
                      )}
                      <Text size="sm" color="#6b7280">
                        {formatDate(activity.date)}
                      </Text>
                    </Box>
                  </Flex>
                  <Box style={{ textAlign: 'right' }}>
                    <Text weight="bold" color="#3b82f6">
                      +{formatCurrency(activity.amount)}
                    </Text>
                    <Text
                      size="sm"
                      color={
                        activity.status === 'completed'
                          ? '#10b981'
                          : activity.status === 'pending'
                            ? '#f59e0b'
                            : '#ef4444'
                      }
                    >
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        </Card>
      )}
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        className={`reward-system-skeleton ${className}`}
        style={{
          ...style,
        }}
      >
        <Card style={{ marginBottom: '24px' }}>
          <Box style={{ padding: '16px' }}>
            <Flex align="center" style={{ marginBottom: '16px' }}>
              <Box
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  marginRight: '16px',
                }}
              />
              <Box>
                <Box
                  style={{
                    width: '120px',
                    height: '24px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }}
                />
                <Box
                  style={{
                    width: '80px',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            </Flex>
            <Box
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#e5e7eb',
              }}
            />
          </Box>
        </Card>
        <Card>
          <Box style={{ padding: '16px' }}>
            <Box
              style={{
                width: '120px',
                height: '24px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                marginBottom: '16px',
              }}
            />
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                style={{
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <Flex justify="space-between" align="start">
                  <Flex align="start">
                    <Box
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#e5e7eb',
                        marginRight: '12px',
                      }}
                    />
                    <Box>
                      <Box
                        style={{
                          width: '200px',
                          height: '16px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      />
                      <Box
                        style={{
                          width: '120px',
                          height: '12px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </Flex>
                  <Box
                    style={{
                      width: '60px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Flex>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      data-testid="RewardSystem"
      className={`reward-system ${className}`}
      style={{
        ...style,
      }}
    >
      <Card style={{ marginBottom: '24px' }}>
        <Box style={{ padding: '16px' }}>
          <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
            <Text weight="bold" size="xl">
              Reward System
            </Text>
            {renderPeriodSelector()}
          </Flex>
          {renderUserSummary()}
        </Box>
      </Card>

      <TabView
        tabs={[
          {
            id: 'activities',
            label: 'Activities',
            content: renderActivities(),
          },
          {
            id: 'tiers',
            label: 'Reward Tiers',
            content: renderTiers(),
          },
        ]}
        activeTab="activities"
      />
    </Box>
  );
};
