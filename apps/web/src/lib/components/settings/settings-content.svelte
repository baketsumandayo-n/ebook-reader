<script lang="ts">
  import { browser } from '$app/environment';
  import { faComputer, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
  import {
    TrackerAutoPause,
    TrackerSkipThresholdAction
  } from '$lib/components/book-reader/book-reading-tracker/book-reading-tracker';
  import ButtonToggleGroup from '$lib/components/button-toggle-group/button-toggle-group.svelte';
  import {
    optionsForToggle,
    type ToggleOption
  } from '$lib/components/button-toggle-group/toggle-option';
  import MessageDialog from '$lib/components/message-dialog.svelte';
  import Ripple from '$lib/components/ripple.svelte';
  import SettingsCustomTheme from '$lib/components/settings/settings-custom-theme.svelte';
  import SettingsDimensionPopover from '$lib/components/settings/settings-dimension-popover.svelte';
  import SettingsFontSelector from '$lib/components/settings/settings-font-selector.svelte';
  import SettingsReadingGoals from '$lib/components/settings/settings-reading-goals.svelte';
  import SettingsItemGroup from '$lib/components/settings/settings-item-group.svelte';
  import SettingsStorageSourceList from '$lib/components/settings/settings-storage-source-list.svelte';
  import SettingsUserFontDialog from '$lib/components/settings/settings-user-font-dialog.svelte';
  import { inputClasses } from '$lib/css-classes';
  import { BlurMode } from '$lib/data/blur-mode';
  import { dialogManager } from '$lib/data/dialog-manager';
  import { LocalFont } from '$lib/data/fonts';
  import { FuriganaStyle } from '$lib/data/furigana-style';
  import { logger } from '$lib/data/logger';
  import { MergeMode } from '$lib/data/merge-mode';
  import { isAppDefault } from '$lib/data/storage/storage-source-manager';
  import { defaultStorageSources } from '$lib/data/storage/storage-types';
  import { isStorageSourceAvailable } from '$lib/data/storage/storage-view';
  import {
    customThemes$,
    database,
    fontFamilyGroupOne$,
    fontFamilyGroupTwo$,
    horizontalCustomReadingPosition$,
    textMarginMode$,
    textMarginValue$,
    theme$,
    verticalCustomReadingPosition$
  } from '$lib/data/store';
  import type { TextMarginMode } from '$lib/data/text-margin-mode';
  import { availableThemes as availableThemesMap } from '$lib/data/theme-option';
  import { ViewMode } from '$lib/data/view-mode';
  import type { WritingMode } from '$lib/data/writing-mode';
  import { secondsToMinutes } from '$lib/functions/statistic-util';
  import { dummyFn } from '$lib/functions/utils';
  import {
    ReplicationSaveBehavior,
    AutoReplicationType
  } from '$lib/functions/replication/replication-options';
  import { map } from 'rxjs';
  import Fa from 'svelte-fa';
  import { onDestroy } from 'svelte';

  export let selectedTheme: string;

  export let viewMode: ViewMode;

  export let fontFamilyGroupOne: string;

  export let fontFamilyGroupTwo: string;

  export let fontSize: number;

  export let lineHeight: number;

  export let textIndentation: number;

  export let textMarginValue: number;

  export let blurImage: boolean;

  export let blurImageMode: string;

  export let hideFurigana: boolean;

  export let furiganaStyle: FuriganaStyle;

  export let writingMode: WritingMode;

  export let prioritizeReaderStyles: boolean;

  export let enableTextJustification: boolean;

  export let enableTextWrapPretty: boolean;

  export let textMarginMode: TextMarginMode;

  export let enableReaderWakeLock: boolean;

  export let showCharacterCounter: boolean;

  export let showPercentage: boolean;

  export let secondDimensionMaxValue: number;

  export let firstDimensionMargin: number;

  export let swipeThreshold: number;

  export let disableWheelNavigation: boolean;

  export let autoPositionOnResize: boolean;

  export let avoidPageBreak: boolean;

  export let pauseTrackerOnCustomPointChange: boolean;

  export let customReadingPointEnabled: boolean;

  export let selectionToBookmarkEnabled: boolean;

  export let enableTapEdgeToFlip: boolean;

  export let pageColumns: number;

  export let storageQuota: string;

  export let persistentStorage: boolean;

  export let confirmClose: boolean;

  export let manualBookmark: boolean;

  export let autoBookmark: boolean;

  export let autoBookmarkTime: number;

  export let activeSettings: string;

  export let cacheStorageData: boolean;

  export let autoReplication: string;

  export let replicationSaveBehavior: string;

  export let showExternalPlaceholder: boolean;

  export let keepLocalStatisticsOnDeletion: boolean;

  export let overwriteBookCompletion: boolean;

  export let startDayHoursForTracker: number;

  export let statisticsMergeMode: string;

  export let readingGoalsMergeMode: string;

  export let statisticsEnabled: boolean;

  export let trackerAutoPause: string;

  export let openTrackerOnCompletion: boolean;

  export let addCharactersOnCompletion: boolean;

  export let trackerAutoStartTime: number;

  export let trackerIdleTime: number;

  export let trackerForwardSkipThreshold: number;

  export let trackerBackwardSkipThreshold: number;

  export let trackerSkipThresholdAction: string;

  export let trackerPopupDetection: boolean;

  export let adjustStatisticsAfterIdleTime: boolean;

  $: availableThemes = (
    browser
      ? [...Array.from(availableThemesMap.entries()), ...Object.entries($customThemes$)]
      : Array.from(availableThemesMap.entries())
  ).map(([theme, option]) => ({
    theme,
    option
  }));

  $: optionsForTheme = availableThemes.map(({ theme, option }) => ({
    id: theme,
    text: 'ぁあ',
    style: {
      color: option.fontColor,
      'background-color': option.backgroundColor
    },
    thickBorders: true,
    showIcons: true
  }));

  onDestroy(() => dialogManager.dialogs$.next([]));

  const optionsForFuriganaStyle: ToggleOption<FuriganaStyle>[] = [
    {
      id: FuriganaStyle.Hide,
      text: '非表示'
    },
    {
      id: FuriganaStyle.Partial,
      text: '部分表示'
    },
    {
      id: FuriganaStyle.Toggle,
      text: '切り替え'
    },
    {
      id: FuriganaStyle.Full,
      text: '常に表示'
    }
  ];

  const optionsForWritingMode: ToggleOption<WritingMode>[] = [
    {
      id: 'horizontal-tb',
      text: '横書き'
    },
    {
      id: 'vertical-rl',
      text: '縦書き'
    }
  ];

  const optionsForTextMarginMode: ToggleOption<TextMarginMode>[] = [
    {
      id: 'auto',
      text: '自動'
    },
    {
      id: 'manual',
      text: '手動'
    }
  ];

  const optionsForViewMode: ToggleOption<ViewMode>[] = [
    {
      id: ViewMode.Continuous,
      text: '連続スクロール'
    },
    {
      id: ViewMode.Paginated,
      text: 'ページごと'
    }
  ];

  const optionsForBlurMode: ToggleOption<BlurMode>[] = [
    {
      id: BlurMode.ALL,
      text: 'すべて'
    },
    {
      id: BlurMode.AFTER_TOC,
      text: '目次以降'
    }
  ];

  const optionsForAutoReplicationType: ToggleOption<AutoReplicationType>[] = [
    {
      id: AutoReplicationType.Off,
      text: 'オフ'
    },
    {
      id: AutoReplicationType.Up,
      text: 'アップロード'
    },
    {
      id: AutoReplicationType.Down,
      text: 'ダウンロード'
    },
    {
      id: AutoReplicationType.All,
      text: '双方向'
    }
  ];

  const optionsForReplicationSaveBehavior: ToggleOption<ReplicationSaveBehavior>[] = [
    {
      id: ReplicationSaveBehavior.NewOnly,
      text: '新規のみ'
    },
    {
      id: ReplicationSaveBehavior.Overwrite,
      text: '上書き'
    }
  ];

  const optionsForTrackerAutoPause: ToggleOption<TrackerAutoPause>[] = [
    {
      id: TrackerAutoPause.OFF,
      text: 'オフ'
    },
    {
      id: TrackerAutoPause.MODERATE,
      text: '中程度'
    },
    {
      id: TrackerAutoPause.STRICT,
      text: '厳格'
    }
  ];

  const optionsForTrackerSkipThresholdAction: ToggleOption<TrackerSkipThresholdAction>[] = [
    {
      id: TrackerSkipThresholdAction.IGNORE,
      text: '無視'
    },
    {
      id: TrackerSkipThresholdAction.PAUSE,
      text: 'トラッカー停止'
    }
  ];

  const optionsForMergeMode: ToggleOption<MergeMode>[] = [
    {
      id: MergeMode.MERGE,
      text: 'マージ'
    },
    {
      id: MergeMode.REPLACE,
      text: '置き換え'
    }
  ];

  const storageSources$ = database.storageSourcesChanged$.pipe(
    map((storageSources) => [
      ...defaultStorageSources
        .filter((defaultStorageSource) =>
          isStorageSourceAvailable(defaultStorageSource.type, defaultStorageSource.name, window)
        )
        .map((defaultStorageSource) => ({
          name: defaultStorageSource.name,
          type: defaultStorageSource.type,
          storedInManager: false,
          encryptionDisabled: false,
          data: new ArrayBuffer(0),
          lastSourceModified: 0
        })),
      ...storageSources.filter((storageSource) => !isAppDefault(storageSource.name))
    ])
  );

  let showSpinner = false;
  let furiganaStyleTooltip = '';
  let autoReplicationTypeTooltip = '';
  let trackerAutoPauseTooltip = '';

  $: if ($textMarginMode$ === 'auto') {
    $textMarginValue$ = 0;
  }

  $: autoBookmarkTooltip = `${autoBookmarkTime} 秒間スクロール／ページ移動が無い場合に自動でブックマークを作成します`;
  $: wakeLockSupported = browser && 'wakeLock' in navigator;
  $: verticalMode = writingMode === 'vertical-rl';
  $: fontCacheSupported = browser && 'caches' in window;
  $: switch (furiganaStyle) {
    case FuriganaStyle.Hide:
      furiganaStyleTooltip = '常に非表示にします';
      break;
    case FuriganaStyle.Toggle:
      furiganaStyleTooltip = '通常は非表示で、クリックすると表示を切り替えられます';
      break;
    case FuriganaStyle.Full:
      furiganaStyleTooltip = '通常は非表示で、ホバーまたはクリックで表示します';
      break;
    default:
      furiganaStyleTooltip = '薄い文字色でふりがなを表示します';
      break;
  }
  $: avoidPageBreakTooltip = avoidPageBreak
    ? '単語や文章がページをまたがらないようにします'
    : '単語や文章がページをまたいでも構いません';
  $: persistentStorageTooltip = persistentStorage
    ? 'ローカルデータに対して大きな保存領域を利用します'
    : 'ローカルデータを一時ストレージに保存します。\n有効化にはブックマークまたは通知権限が必要な場合があります';
  $: cacheStorageDataTooltip = cacheStorageData
    ? 'ストレージデータをキャッシュします。通信量・待ち時間を抑えられますが、変更を反映するには再読み込みが必要です'
    : '操作のたびにデータを再取得します。通信量は増えますが、常に最新のデータになります';
  $: replicationSaveBehaviorTooltip =
    replicationSaveBehavior === ReplicationSaveBehavior.Overwrite
      ? 'Data will always be overwritten'
      : 'Data will only be written if none exist on target, no time data is present or if target data is older';
  $: switch (autoReplication) {
    case AutoReplicationType.Up:
      autoReplicationTypeTooltip = '読書中（1 分ごと）に更新データを同期先へアップロードします';
      break;
    case AutoReplicationType.Down:
      autoReplicationTypeTooltip = '本を開いたタイミングで同期先からデータを取り込みます';
      break;
    case AutoReplicationType.All:
      autoReplicationTypeTooltip = '同期先とローカルを双方向に同期します';
      break;
    default:
      autoReplicationTypeTooltip = '自動インポート／エクスポートは行いません';
      break;
  }
  $: showExternalPlaceholderToolTip = showExternalPlaceholder
    ? '外部書籍のプレースホルダーをブラウザソースに表示します'
    : '外部書籍のプレースホルダーを非表示にします';

  $: startOfDayHours = `${`${startDayHoursForTracker}`.padStart(2, '0')}:00`;

  $: trackerIdleTimeInMin = secondsToMinutes(trackerIdleTime);

  $: switch (trackerAutoPause) {
    case TrackerAutoPause.OFF:
      trackerAutoPauseTooltip = '一部の操作を除き、自動的に一時停止しません';
      break;
    case TrackerAutoPause.STRICT:
      trackerAutoPauseTooltip =
        '特定の操作やフォーカス喪失（辞書ポップアップなど）で自動的に一時停止します';
      break;
    default:
      trackerAutoPauseTooltip =
        '特定の操作と、リーダータブのフォーカスが外れたときに自動的に一時停止します';
      break;
  }

  $: if ((activeSettings === 'Data' || activeSettings === 'Statistics') && !$storageSources$) {
    database
      .getStorageSources()
      .then((storageSources) => {
        database.storageSourcesChanged$.next(storageSources);
      })
      .catch((error) => {
        logger.error(`Failed to retrieve storage sources: ${error.message}`);
        database.storageSourcesChanged$.next([]);
      });
  }
</script>

<div class="grid grid-cols-1 items-center sm:grid-cols-2 sm:gap-6 lg:md:gap-8 lg:grid-cols-3">
  {#if activeSettings === 'Reader'}
    <div class="lg:col-span-2">
      <SettingsItemGroup title="テーマ">
        <ButtonToggleGroup
          options={optionsForTheme}
          bind:selectedOptionId={selectedTheme}
          on:edit={({ detail }) =>
            dialogManager.dialogs$.next([
              {
                component: SettingsCustomTheme,
                props: { selectedTheme: detail, existingThemes: optionsForTheme }
              }
            ])}
          on:delete={({ detail }) => {
            $theme$ = optionsForTheme[optionsForTheme.length - 2]?.id || 'light-theme';
            delete $customThemes$[detail];
            $customThemes$ = { ...$customThemes$ };
          }}
        >
          {#if browser}
            <button
              class="m-1 rounded-md border-2 border-gray-400 p-2 text-lg"
              on:click={() =>
                dialogManager.dialogs$.next([
                  {
                    component: SettingsCustomTheme,
                    props: { existingThemes: optionsForTheme }
                  }
                ])}
            >
              <Fa icon={faPlus} class="mx-2" />
              <Ripple />
            </button>
          {/if}
        </ButtonToggleGroup>
      </SettingsItemGroup>
    </div>
    <div class="h-full">
      <SettingsItemGroup title="表示モード">
        <ButtonToggleGroup options={optionsForViewMode} bind:selectedOptionId={viewMode} />
      </SettingsItemGroup>
    </div>
    <SettingsItemGroup title="フォント（グループ1）">
      <div slot="header" class="flex items-center">
        <SettingsFontSelector
          availableFonts={[
            LocalFont.NOTOSERIFJP,
            LocalFont.KZUDMINCHO,
            LocalFont.GENEI,
            LocalFont.SHIPPORIMINCHO,
            LocalFont.KLEEONE,
            LocalFont.KLEEONESEMIBOLD,
            LocalFont.SERIF
          ]}
          bind:fontValue={fontFamilyGroupOne}
        />
        {#if fontCacheSupported}
          <div
            tabindex="0"
            role="button"
            title="カスタムフォントを追加"
            on:click={() =>
              dialogManager.dialogs$.next([
                {
                  component: SettingsUserFontDialog,
                  props: { fontFamily: fontFamilyGroupOne$ }
                }
              ])}
            on:keyup={dummyFn}
          >
            <Fa icon={faComputer} />
          </div>
        {/if}
      </div>
      <input
        type="text"
        class={inputClasses}
        placeholder="Noto Serif JP"
        bind:value={fontFamilyGroupOne}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="フォント（グループ2）">
      <div slot="header" class="flex items-center">
        <SettingsFontSelector
          availableFonts={[LocalFont.NOTOSANSJP, LocalFont.KZUDGOTHIC, LocalFont.SANSSERIF]}
          bind:fontValue={fontFamilyGroupTwo}
        />
        {#if fontCacheSupported}
          <div
            tabindex="0"
            role="button"
            on:click={() =>
              dialogManager.dialogs$.next([
                {
                  component: SettingsUserFontDialog,
                  props: { fontFamily: fontFamilyGroupTwo$ }
                }
              ])}
            on:keyup={dummyFn}
          >
            <Fa icon={faComputer} />
          </div>
        {/if}
      </div>
      <input
        type="text"
        class={inputClasses}
        placeholder="Noto Sans JP"
        bind:value={fontFamilyGroupTwo}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="フォントサイズ">
      <input type="number" class={inputClasses} step="1" min="1" bind:value={fontSize} />
    </SettingsItemGroup>
    <SettingsItemGroup title="行の高さ">
      <input
        type="number"
        class={inputClasses}
        step="0.05"
        min="1"
        bind:value={lineHeight}
        on:change={() => {
          if (!lineHeight || lineHeight < 1) {
            lineHeight = 1.65;
          }
        }}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="段落の字下げ" tooltip="新しい段落に追加する字下げ量（rem）">
      <input
        type="number"
        class={inputClasses}
        step=".5"
        min="0"
        bind:value={textIndentation}
        on:blur={() => {
          const newValue = Number.parseFloat(`${textIndentation ?? 0}`);

          if (isNaN(newValue) || newValue < 1) {
            textIndentation = 0;
          }
        }}
      />
    </SettingsItemGroup>
    {#if textMarginMode === 'manual'}
      <SettingsItemGroup title="段落マージン" tooltip="段落に追加するマージン量（rem）">
        <input
          type="number"
          class={inputClasses}
          step=".5"
          min="0"
          bind:value={textMarginValue}
          on:blur={() => {
            const newValue = Number.parseFloat(`${textMarginValue ?? 0}`);

            if (isNaN(newValue) || newValue < 1) {
              textMarginValue = 0;
            }
          }}
        />
      </SettingsItemGroup>
    {/if}
    <SettingsItemGroup title={verticalMode ? 'リーダー左右の余白' : 'リーダー上下の余白'}>
      <SettingsDimensionPopover
        slot="header"
        isFirstDimension
        isVertical={verticalMode}
        bind:dimensionValue={firstDimensionMargin}
      />
      <input
        type="number"
        class={inputClasses}
        step="1"
        min="0"
        bind:value={firstDimensionMargin}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title={verticalMode ? '最大高さ' : '最大幅'}>
      <SettingsDimensionPopover
        slot="header"
        isVertical={verticalMode}
        bind:dimensionValue={secondDimensionMaxValue}
      />
      <input
        type="number"
        class={inputClasses}
        step="1"
        min="0"
        bind:value={secondDimensionMaxValue}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="スワイプ閾値" tooltip={'ページ送りに必要なスワイプ距離を指定します'}>
      <input
        type="number"
        step="1"
        min="10"
        class={inputClasses}
        bind:value={swipeThreshold}
        on:blur={() => {
          if (swipeThreshold < 10 || typeof swipeThreshold !== 'number') {
            swipeThreshold = 10;
          }
        }}
      />
    </SettingsItemGroup>
    {#if autoBookmark}
      <SettingsItemGroup
        title="自動ブックマークまでの時間"
        tooltip={'自動ブックマークを付けるまでの秒数'}
      >
        <input
          type="number"
          step="1"
          min="1"
          class={inputClasses}
          bind:value={autoBookmarkTime}
          on:blur={() => {
            if (autoBookmarkTime < 1 || typeof autoBookmarkTime !== 'number') {
              autoBookmarkTime = 3;
            }
          }}
        />
      </SettingsItemGroup>
    {/if}
    <SettingsItemGroup title="書字方向">
      <ButtonToggleGroup options={optionsForWritingMode} bind:selectedOptionId={writingMode} />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="リーダーのスタイルを優先"
      tooltip={'有効にするとマージンや文字揃えなど一部のスタイルに!importantを付与し、書籍側スタイルより優先します'}
    >
      <ButtonToggleGroup
        options={optionsForToggle}
        bind:selectedOptionId={prioritizeReaderStyles}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="文字両端揃えを有効化"
      tooltip={'有効にすると段落テキストを両端揃えで表示します'}
    >
      <ButtonToggleGroup
        options={optionsForToggle}
        bind:selectedOptionId={enableTextJustification}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="きれいな禁則処理を有効化"
      tooltip={'対応ブラウザで禁則処理（pretty text wrap）を有効にします'}
    >
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={enableTextWrapPretty} />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="段落マージンモード"
      tooltip={'手動にすると段落に適用するマージン値を指定できます'}
    >
      <ButtonToggleGroup
        options={optionsForTextMarginMode}
        bind:selectedOptionId={textMarginMode}
      />
    </SettingsItemGroup>
    {#if wakeLockSupported}
      <SettingsItemGroup
        title="画面ロックを防止"
        tooltip={'端末の画面が暗転・ロックしないようWakeLockを要求します'}
      >
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={enableReaderWakeLock}
        />
      </SettingsItemGroup>
    {/if}
    <SettingsItemGroup title="文字数カウンターを表示">
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={showCharacterCounter} />
    </SettingsItemGroup>
    <SettingsItemGroup title="進捗率を表示">
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={showPercentage} />
    </SettingsItemGroup>
    <SettingsItemGroup title="ホイールでページ送りしない">
      <ButtonToggleGroup
        options={optionsForToggle}
        bind:selectedOptionId={disableWheelNavigation}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="閉じる前に確認"
      tooltip={`有効にすると、未保存の変更がある状態でタブを閉じたり再読み込みする際に確認ダイアログを表示します`}
    >
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={confirmClose} />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="手動ブックマーク"
      tooltip={'有効にするとメニュー操作で離脱しても現在位置を自動保存しません'}
    >
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={manualBookmark} />
    </SettingsItemGroup>
    <SettingsItemGroup title="自動ブックマーク" tooltip={autoBookmarkTooltip}>
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={autoBookmark} />
    </SettingsItemGroup>
    <SettingsItemGroup title="画像をぼかす">
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={blurImage} />
    </SettingsItemGroup>
    {#if blurImage}
      <SettingsItemGroup
        title="ぼかし対象"
        tooltip="全画像をぼかすか、目次以降の画像のみぼかすかを切り替えます"
      >
        <ButtonToggleGroup options={optionsForBlurMode} bind:selectedOptionId={blurImageMode} />
      </SettingsItemGroup>
    {/if}
    <SettingsItemGroup title="ふりがなを隠す">
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={hideFurigana} />
    </SettingsItemGroup>
    {#if hideFurigana}
      <SettingsItemGroup title="ふりがなの表示方法" tooltip={furiganaStyleTooltip}>
        <ButtonToggleGroup
          options={optionsForFuriganaStyle}
          bind:selectedOptionId={furiganaStyle}
        />
      </SettingsItemGroup>
    {/if}
    {#if statisticsEnabled}
      <SettingsItemGroup
        title="カスタム地点でトラッカーを一時停止"
        tooltip={'有効にするとカスタム読書ポイント設定中は自動で一時停止／再開を切り替えます'}
      >
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={pauseTrackerOnCustomPointChange}
        />
      </SettingsItemGroup>
    {/if}
    {#if viewMode === ViewMode.Continuous}
      <SettingsItemGroup
        title="カスタム読書ポイント"
        tooltip={'現在位置やブックマークを計算する基準を任意の位置に固定できます'}
      >
        <div class="flex items-center">
          <ButtonToggleGroup
            options={optionsForToggle}
            bind:selectedOptionId={customReadingPointEnabled}
          />
          {#if customReadingPointEnabled}
            <div
              tabindex="0"
              role="button"
              class="ml-4 hover:underline"
              on:click={() => {
                verticalCustomReadingPosition$.next(100);
                horizontalCustomReadingPosition$.next(0);
              }}
              on:keyup={dummyFn}
            >
              リセット
            </div>
          {/if}
        </div>
      </SettingsItemGroup>
      <SettingsItemGroup title="サイズ変更時に自動調整">
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={autoPositionOnResize}
        />
      </SettingsItemGroup>
    {:else}
      <SettingsItemGroup title="ページ分割を避ける" tooltip={avoidPageBreakTooltip}>
        <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={avoidPageBreak} />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="選択範囲をブックマーク"
        tooltip={'有効にするとページ先頭ではなく直近の選択した段落にブックマークを設定します'}
      >
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={selectionToBookmarkEnabled}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="タップでページ送り"
        tooltip="左右の端にタップ領域を確保し、タップでページをめくれるようにします"
      >
        <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={enableTapEdgeToFlip} />
      </SettingsItemGroup>
      {#if !verticalMode}
        <SettingsItemGroup title="列数" tooltip="表示する列数を指定します">
          <input type="number" class={inputClasses} step="1" min="0" bind:value={pageColumns} />
        </SettingsItemGroup>
      {/if}
    {/if}
  {:else if activeSettings === 'Data'}
    <SettingsItemGroup title="永続ストレージ" tooltip={persistentStorageTooltip}>
      <div class="flex items-center">
        <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={persistentStorage} />
        {#if storageQuota}
          <div class="ml-4">{storageQuota}</div>
        {/if}
      </div>
    </SettingsItemGroup>
    <SettingsItemGroup title="データをキャッシュ" tooltip={cacheStorageDataTooltip}>
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={cacheStorageData} />
    </SettingsItemGroup>
    <SettingsItemGroup title="自動インポート／エクスポート" tooltip={autoReplicationTypeTooltip}>
      <ButtonToggleGroup
        options={optionsForAutoReplicationType}
        bind:selectedOptionId={autoReplication}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="同期時の保存方法" tooltip={replicationSaveBehaviorTooltip}>
      <ButtonToggleGroup
        options={optionsForReplicationSaveBehavior}
        bind:selectedOptionId={replicationSaveBehavior}
      />
    </SettingsItemGroup>
    <SettingsItemGroup title="プレースホルダーを表示" tooltip={showExternalPlaceholderToolTip}>
      <ButtonToggleGroup
        options={optionsForToggle}
        bind:selectedOptionId={showExternalPlaceholder}
      />
    </SettingsItemGroup>
    <SettingsStorageSourceList storageSources={$storageSources$} />
  {:else}
    <SettingsItemGroup
      title="削除時もローカルデータを保持"
      tooltip={'ローカルの書籍を削除した際に統計データを残すかどうかを切り替えます'}
    >
      <div class="flex items-center">
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={keepLocalStatisticsOnDeletion}
        />
        <div
          tabindex="0"
          role="button"
          class="ml-4 hover:underline"
          on:click={() => {
            showSpinner = true;
            database
              .clearZombieStatistics()
              .catch(({ message }) =>
                dialogManager.dialogs$.next([
                  {
                    component: MessageDialog,
                    props: {
                      title: 'エラー',
                      message: `統計データのクリーンアップに失敗しました: ${message}`
                    }
                  }
                ])
              )
              .finally(() => (showSpinner = false));
          }}
          on:keyup={() => {}}
        >
          統計データを整理
        </div>
      </div>
    </SettingsItemGroup>
    <SettingsItemGroup
      title="読了日を上書き"
      tooltip={`最初の読了日だけを保持するか、常に最新の読了日に更新するかを切り替えます`}
    >
      <ButtonToggleGroup
        options={optionsForToggle}
        bind:selectedOptionId={overwriteBookCompletion}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title={`日付リセット時刻: ${startOfDayHours}`}
      tooltip={'この時間を境に新しい日として集計します。\n指定時刻より前のデータは前日に含まれます'}
    >
      <input
        type="range"
        step="1"
        min="0"
        max="23"
        class={inputClasses}
        bind:value={startDayHoursForTracker}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="統計のマージ方法"
      tooltip={`同期時に統計を項目ごとにマージするか、完全に置き換えるかを切り替えます`}
    >
      <ButtonToggleGroup
        options={optionsForMergeMode}
        bind:selectedOptionId={statisticsMergeMode}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="読書目標のマージ方法"
      tooltip={`同期時に読書目標を項目ごとにマージするか、完全に置き換えるかを切り替えます`}
    >
      <ButtonToggleGroup
        options={optionsForMergeMode}
        bind:selectedOptionId={readingGoalsMergeMode}
      />
    </SettingsItemGroup>
    <SettingsItemGroup
      title="統計を有効化"
      tooltip="画面左下にトラッカーアイコンを表示し、読書セッションの記録を開始できるようにします"
    >
      <ButtonToggleGroup options={optionsForToggle} bind:selectedOptionId={statisticsEnabled} />
    </SettingsItemGroup>
    {#if statisticsEnabled}
      <SettingsItemGroup title="トラッカー自動一時停止" tooltip={trackerAutoPauseTooltip}>
        <ButtonToggleGroup
          options={optionsForTrackerAutoPause}
          bind:selectedOptionId={trackerAutoPause}
        />
      </SettingsItemGroup>
      <SettingsItemGroup title="読了時にトラッカーを開く">
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={openTrackerOnCompletion}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="読了時に統計を更新"
        tooltip={`読了時に、残り文字数の差分を統計へ加算するかどうかを選択します`}
      >
        <ButtonToggleGroup
          options={optionsForToggle}
          bind:selectedOptionId={addCharactersOnCompletion}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="自動開始までの秒数"
        tooltip={'文字数が変化しない状態が指定秒数続くとトラッカーを自動開始します（0で無効／競合回避のため大きめ推奨）'}
      >
        <input
          type="number"
          class={inputClasses}
          step="1"
          min="0"
          bind:value={trackerAutoStartTime}
          on:blur={() => {
            const newValue = Number.parseFloat(`${trackerAutoStartTime ?? 0}`);

            if (isNaN(newValue) || newValue < 1) {
              trackerAutoStartTime = 0;
            }
          }}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="アイドル時間（分）"
        tooltip={'ページ操作が無い状態が指定分続くと自動一時停止します（0で無効／最大12時間）'}
      >
        <input
          type="number"
          class={inputClasses}
          step="0.5"
          min="0"
          bind:value={trackerIdleTimeInMin}
          on:blur={() => {
            if (!trackerIdleTimeInMin || trackerIdleTimeInMin < 0) {
              trackerIdleTime = 0;
            } else if (trackerIdleTimeInMin > 43200) {
              trackerIdleTime = 900;
            } else {
              trackerIdleTime = Math.floor(trackerIdleTimeInMin * 60);
            }
          }}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="順方向スキップ閾値"
        tooltip={'直前より増加した文字数がこの値を超えると閾値アクションを実行します（0で無効）'}
      >
        <input
          type="number"
          class={inputClasses}
          step="1"
          min="0"
          bind:value={trackerForwardSkipThreshold}
          on:blur={() => {
            if (trackerForwardSkipThreshold === 0) {
              trackerForwardSkipThreshold = 0;
            } else if (!trackerForwardSkipThreshold || trackerForwardSkipThreshold < 0) {
              trackerForwardSkipThreshold = 2700;
            }
          }}
        />
      </SettingsItemGroup>
      <SettingsItemGroup
        title="逆方向スキップ閾値"
        tooltip={'直前より減少した文字数がこの値を超えると閾値アクションを実行します（0で無効）'}
      >
        <input
          type="number"
          class={inputClasses}
          step="1"
          bind:value={trackerBackwardSkipThreshold}
          on:blur={() => {
            if (trackerBackwardSkipThreshold < 0) {
              trackerBackwardSkipThreshold = Math.abs(trackerBackwardSkipThreshold);
            } else if (trackerBackwardSkipThreshold === 0) {
              trackerBackwardSkipThreshold = 0;
            } else if (!trackerBackwardSkipThreshold) {
              trackerBackwardSkipThreshold = 2700;
            }
          }}
        />
      </SettingsItemGroup>
      {#if trackerForwardSkipThreshold || trackerBackwardSkipThreshold}
        <SettingsItemGroup
          title="閾値アクション"
          tooltip={`スキップ閾値が発動した際に実行するアクションを選択します`}
        >
          <ButtonToggleGroup
            options={optionsForTrackerSkipThresholdAction}
            bind:selectedOptionId={trackerSkipThresholdAction}
          />
        </SettingsItemGroup>
      {/if}
      {#if trackerAutoPause !== TrackerAutoPause.OFF}
        <SettingsItemGroup
          title="辞書検出"
          tooltip={`有効にすると Yomitan や jpdb-browser-reader のウィンドウが開いていても自動一時停止をスキップします（Yomitan では「Secure Container」を無効にする必要があります）`}
        >
          <ButtonToggleGroup
            options={optionsForToggle}
            bind:selectedOptionId={trackerPopupDetection}
          />
        </SettingsItemGroup>
      {/if}
      {#if trackerIdleTime > 0}
        <SettingsItemGroup
          title="アイドルで統計を巻き戻す"
          tooltip={`有効にするとアイドル時間分を統計から差し引いて巻き戻しを試みます`}
        >
          <ButtonToggleGroup
            options={optionsForToggle}
            bind:selectedOptionId={adjustStatisticsAfterIdleTime}
          />
        </SettingsItemGroup>
      {/if}
      <SettingsReadingGoals
        storageSources={$storageSources$}
        on:spinner={({ detail }) => (showSpinner = detail)}
      />
    {/if}
  {/if}
  {#if showSpinner}
    <div class="tap-highlight-transparent fixed inset-0 bg-black/[.2]" />
    <div class="fixed inset-0 flex h-full w-full items-center justify-center text-7xl">
      <Fa icon={faSpinner} spin />
    </div>
  {/if}
</div>
