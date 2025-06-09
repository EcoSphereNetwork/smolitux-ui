// 🔧 TODO [Codex]: Tests fehlen – prüfen & umsetzen
// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button, Input, ProgressBar } from '@smolitux/core';

export interface StakingPool {
  /** Eindeutige ID des Staking-Pools */
  id: string;
  /** Name des Staking-Pools */
  name: string;
  /** Beschreibung des Staking-Pools */
  description?: string;
  /** Token-Symbol */
  tokenSymbol: string;
  /** Token-Logo URL */
  tokenLogoUrl?: string;
  /** APY (Annual Percentage Yield) in Prozent */
  apy: number;
  /** Gesamter Betrag im Pool */
  totalStaked: string;
  /** Minimaler Stake-Betrag */
  minStake?: string;
  /** Maximaler Stake-Betrag */
  maxStake?: string;
  /** Sperrzeit in Tagen */
  lockPeriod?: number;
  /** Frühzeitige Abhebungsgebühr in Prozent */
  earlyWithdrawalFee?: number;
  /** Ist der Pool aktiv? */
  isActive: boolean;
  /** Enddatum des Pools */
  endDate?: Date;
}

export interface UserStake {
  /** Eindeutige ID des Stakes */
  id: string;
  /** ID des Staking-Pools */
  poolId: string;
  /** Gestakter Betrag */
  amount: string;
  /** Verdienter Betrag */
  earned: string;
  /** Zeitpunkt des Stakes */
  stakedAt: Date;
  /** Zeitpunkt der Entsperrung */
  unlockAt?: Date;
  /** Ist der Stake entsperrt? */
  isUnlocked: boolean;
}

export interface StakingInterfaceProps {
  /** Staking-Pools */
  pools: StakingPool[];
  /** Benutzer-Stakes */
  userStakes?: UserStake[];
  /** Verfügbares Guthaben des Benutzers */
  userBalance?: string;
  /** Token-Symbol */
  tokenSymbol: string;
  /** Callback beim Staken */
  onStake?: (poolId: string, amount: string) => Promise<void>;
  /** Callback beim Unstaken */
  onUnstake?: (stakeId: string) => Promise<void>;
  /** Callback beim Abheben von Belohnungen */
  onClaimRewards?: (stakeId: string) => Promise<void>;
  /** Callback beim Abheben aller Belohnungen */
  onClaimAllRewards?: () => Promise<void>;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
}

/**
 * StakingInterface-Komponente für das Staking von Tokens
 */
export const StakingInterface: React.FC<StakingInterfaceProps> = ({
  pools,
  userStakes = [],
  userBalance = '0',
  tokenSymbol,
  onStake,
  onUnstake,
  onClaimRewards,
  onClaimAllRewards,
  className = '',
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState<'pools' | 'stakes'>('pools');
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ausgewählter Pool
  const selectedPool = selectedPoolId ? pools.find((pool) => pool.id === selectedPoolId) : null;

  // Gesamter verdienter Betrag
  const totalEarned = userStakes
    .reduce((total, stake) => total + parseFloat(stake.earned), 0)
    .toFixed(6);

  // Staking-Formular zurücksetzen
  const resetStakingForm = () => {
    setSelectedPoolId(null);
    setStakeAmount('');
    setError(null);
  };

  // Staken
  const handleStake = async () => {
    if (!selectedPoolId || !stakeAmount || !onStake) return;

    // Validierung
    if (parseFloat(stakeAmount) <= 0) {
      setError('Bitte geben Sie einen gültigen Betrag ein.');
      return;
    }

    if (parseFloat(stakeAmount) > parseFloat(userBalance)) {
      setError(`Nicht genügend ${tokenSymbol} verfügbar.`);
      return;
    }

    const pool = pools.find((p) => p.id === selectedPoolId);

    if (pool?.minStake && parseFloat(stakeAmount) < parseFloat(pool.minStake)) {
      setError(`Der Mindestbetrag für diesen Pool ist ${pool.minStake} ${tokenSymbol}.`);
      return;
    }

    if (pool?.maxStake && parseFloat(stakeAmount) > parseFloat(pool.maxStake)) {
      setError(`Der Höchstbetrag für diesen Pool ist ${pool.maxStake} ${tokenSymbol}.`);
      return;
    }

    setIsStaking(true);
    setError(null);

    try {
      await onStake(selectedPoolId, stakeAmount);
      resetStakingForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Staking fehlgeschlagen.';
      setError(errorMessage);
    } finally {
      setIsStaking(false);
    }
  };

  // Unstaken
  const handleUnstake = async (stakeId: string) => {
    if (!onUnstake) return;

    setIsUnstaking(true);

    try {
      await onUnstake(stakeId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unstaking fehlgeschlagen.';
      console.error(errorMessage);
    } finally {
      setIsUnstaking(false);
    }
  };

  // Belohnungen abheben
  const handleClaimRewards = async (stakeId: string) => {
    if (!onClaimRewards) return;

    setIsClaiming(true);

    try {
      await onClaimRewards(stakeId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Abheben der Belohnungen fehlgeschlagen.';
      console.error(errorMessage);
    } finally {
      setIsClaiming(false);
    }
  };

  // Alle Belohnungen abheben
  const handleClaimAllRewards = async () => {
    if (!onClaimAllRewards) return;

    setIsClaiming(true);

    try {
      await onClaimAllRewards();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Abheben aller Belohnungen fehlgeschlagen.';
      console.error(errorMessage);
    } finally {
      setIsClaiming(false);
    }
  };

  // Datum formatieren
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Verbleibende Zeit formatieren
  const formatTimeRemaining = (unlockAt: Date): string => {
    const now = new Date();
    const diff = unlockAt.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Entsperrt';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} ${days === 1 ? 'Tag' : 'Tage'} ${hours} Std.`;
    }

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Std. ${minutes} Min.`;
  };

  // Fortschritt berechnen
  const calculateProgress = (stakedAt: Date, unlockAt?: Date): number => {
    if (!unlockAt) return 100;

    const now = new Date();
    const total = unlockAt.getTime() - stakedAt.getTime();
    const elapsed = now.getTime() - stakedAt.getTime();

    if (elapsed >= total) return 100;

    return Math.floor((elapsed / total) * 100);
  };

  // Platzhalter für den Ladezustand
  const renderPoolPlaceholders = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Card key={`placeholder-${index}`} className="p-4 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          </div>
          <div className="ml-auto">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          </div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4" />
      </Card>
    ));
  };

  return (
    <div className={className}>
      {/* Header mit Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('pools')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'pools'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Staking-Pools
        </button>

        <button
          onClick={() => setActiveTab('stakes')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'stakes'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Meine Stakes
          {userStakes.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
              {userStakes.length}
            </span>
          )}
        </button>
      </div>

      {/* Staking-Pools */}
      {activeTab === 'pools' && (
        <div>
          {/* Verfügbares Guthaben */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Verfügbares Guthaben</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userBalance} {tokenSymbol}
                </p>
              </div>

              {parseFloat(totalEarned) > 0 && (
                <div>
                  <Button variant="outline" onClick={handleClaimAllRewards} disabled={isClaiming}>
                    {isClaiming ? 'Wird abgehoben...' : `${totalEarned} ${tokenSymbol} abheben`}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Staking-Formular */}
          {selectedPoolId && (
            <Card className="mb-6 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  In {selectedPool?.name} staken
                </h3>

                <button
                  onClick={resetStakingForm}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stakeAmount"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Betrag
                </label>

                <div className="relative">
                  <Input
                    id="stakeAmount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.000001"
                    className="pr-16"
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 dark:text-gray-400">{tokenSymbol}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => setStakeAmount((parseFloat(userBalance) * 0.25).toFixed(6))}
                    className="text-xs text-primary-600 dark:text-primary-400"
                  >
                    25%
                  </button>
                  <button
                    onClick={() => setStakeAmount((parseFloat(userBalance) * 0.5).toFixed(6))}
                    className="text-xs text-primary-600 dark:text-primary-400"
                  >
                    50%
                  </button>
                  <button
                    onClick={() => setStakeAmount((parseFloat(userBalance) * 0.75).toFixed(6))}
                    className="text-xs text-primary-600 dark:text-primary-400"
                  >
                    75%
                  </button>
                  <button
                    onClick={() => setStakeAmount(userBalance)}
                    className="text-xs text-primary-600 dark:text-primary-400"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Pool-Details */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">APY:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedPool?.apy}%
                  </span>
                </div>

                {selectedPool?.lockPeriod && (
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sperrzeit:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPool.lockPeriod} Tage
                    </span>
                  </div>
                )}

                {selectedPool?.earlyWithdrawalFee !== undefined && (
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Frühzeitige Abhebungsgebühr:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPool.earlyWithdrawalFee}%
                    </span>
                  </div>
                )}

                {selectedPool?.minStake && (
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mindestbetrag:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPool.minStake} {tokenSymbol}
                    </span>
                  </div>
                )}

                {selectedPool?.maxStake && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Höchstbetrag:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPool.maxStake} {tokenSymbol}
                    </span>
                  </div>
                )}
              </div>

              {/* Fehleranzeige */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Staking-Button */}
              <Button
                variant="primary"
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || isStaking}
                className="w-full"
              >
                {isStaking ? 'Wird gestaked...' : 'Staken'}
              </Button>
            </Card>
          )}

          {/* Pool-Liste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              renderPoolPlaceholders()
            ) : pools.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <p className="text-lg font-medium">Keine Staking-Pools verfügbar</p>
                <p className="mt-2">Derzeit sind keine Staking-Pools verfügbar.</p>
              </div>
            ) : (
              pools.map((pool) => (
                <Card key={pool.id} className={`p-4 ${!pool.isActive ? 'opacity-60' : ''}`}>
                  <div className="flex items-center mb-4">
                    {/* Token-Logo */}
                    <div className="flex-shrink-0">
                      {pool.tokenLogoUrl ? (
                        <img
                          src={pool.tokenLogoUrl}
                          alt={pool.tokenSymbol}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
                          {pool.tokenSymbol.substring(0, 2)}
                        </div>
                      )}
                    </div>

                    {/* Pool-Name und Symbol */}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {pool.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pool.tokenSymbol}</p>
                    </div>

                    {/* APY */}
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-md text-sm font-medium">
                        {pool.apy}% APY
                      </span>
                    </div>
                  </div>

                  {/* Beschreibung */}
                  {pool.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {pool.description}
                    </p>
                  )}

                  {/* Pool-Details */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Gesamt gestaked:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {pool.totalStaked} {pool.tokenSymbol}
                      </span>
                    </div>

                    {pool.lockPeriod && (
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Sperrzeit:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {pool.lockPeriod} Tage
                        </span>
                      </div>
                    )}

                    {pool.endDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Enddatum:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(pool.endDate)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Staking-Button */}
                  <Button
                    variant={selectedPoolId === pool.id ? 'outline' : 'primary'}
                    onClick={() => setSelectedPoolId(pool.id)}
                    disabled={!pool.isActive}
                    className="w-full"
                  >
                    {!pool.isActive
                      ? 'Inaktiv'
                      : selectedPoolId === pool.id
                        ? 'Ausgewählt'
                        : 'Staken'}
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Meine Stakes */}
      {activeTab === 'stakes' && (
        <div>
          {/* Zusammenfassung */}
          <Card className="mb-6 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Zusammenfassung
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">Aktive Stakes</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userStakes.length}
                </p>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">Gesamt gestaked</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userStakes
                    .reduce((total, stake) => total + parseFloat(stake.amount), 0)
                    .toFixed(6)}{' '}
                  {tokenSymbol}
                </p>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">Gesamt verdient</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {totalEarned} {tokenSymbol}
                </p>
              </div>
            </div>

            {parseFloat(totalEarned) > 0 && (
              <div className="mt-4 flex justify-end">
                <Button variant="primary" onClick={handleClaimAllRewards} disabled={isClaiming}>
                  {isClaiming ? 'Wird abgehoben...' : 'Alle Belohnungen abheben'}
                </Button>
              </div>
            )}
          </Card>

          {/* Stake-Liste */}
          {userStakes.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p className="text-lg font-medium">Keine aktiven Stakes</p>
              <p className="mt-2">Sie haben noch keine Token gestaked.</p>
              <Button variant="primary" onClick={() => setActiveTab('pools')} className="mt-4">
                Jetzt staken
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userStakes.map((stake) => {
                const pool = pools.find((p) => p.id === stake.poolId);
                const progress = calculateProgress(stake.stakedAt, stake.unlockAt);

                return (
                  <Card key={stake.id} className="p-4">
                    <div className="flex items-center mb-4">
                      {/* Token-Logo */}
                      <div className="flex-shrink-0">
                        {pool?.tokenLogoUrl ? (
                          <img
                            src={pool.tokenLogoUrl}
                            alt={pool.tokenSymbol}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
                            {pool?.tokenSymbol.substring(0, 2) || tokenSymbol.substring(0, 2)}
                          </div>
                        )}
                      </div>

                      {/* Pool-Name und Symbol */}
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {pool?.name || 'Unbekannter Pool'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {pool?.tokenSymbol || tokenSymbol}
                        </p>
                      </div>

                      {/* APY */}
                      {pool && (
                        <div className="ml-auto">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-md text-sm font-medium">
                            {pool.apy}% APY
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stake-Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Gestaketer Betrag
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {stake.amount} {pool?.tokenSymbol || tokenSymbol}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Verdient</p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {stake.earned} {pool?.tokenSymbol || tokenSymbol}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Gestaked am</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {formatDate(stake.stakedAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {stake.isUnlocked
                            ? 'Entsperrt'
                            : stake.unlockAt
                              ? `Entsperrt in ${formatTimeRemaining(stake.unlockAt)}`
                              : 'Flexibel'}
                        </p>
                      </div>
                    </div>

                    {/* Fortschrittsbalken */}
                    {stake.unlockAt && !stake.isUnlocked && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Fortschritt</span>
                          <span>{progress}%</span>
                        </div>
                        <ProgressBar value={progress} max={100} />
                      </div>
                    )}

                    {/* Aktionen */}
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                      {parseFloat(stake.earned) > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => handleClaimRewards(stake.id)}
                          disabled={isClaiming}
                        >
                          {isClaiming ? 'Wird abgehoben...' : 'Belohnungen abheben'}
                        </Button>
                      )}

                      <Button
                        variant="primary"
                        onClick={() => handleUnstake(stake.id)}
                        disabled={
                          isUnstaking ||
                          (!stake.isUnlocked && stake.unlockAt && new Date() < stake.unlockAt)
                        }
                      >
                        {isUnstaking
                          ? 'Wird unstaked...'
                          : !stake.isUnlocked && stake.unlockAt && new Date() < stake.unlockAt
                            ? 'Gesperrt'
                            : 'Unstaken'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
