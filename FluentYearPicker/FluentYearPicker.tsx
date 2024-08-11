import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import styles from './styles/styles';

const YEARS_LARGE_SCREEN = 12;
const YEARS_SMALL_SCREEN = 6;

interface FluentYearPickerProps {
  year?: string;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
  formFactor: number;
}

const FluentYearPicker: React.FC<FluentYearPickerProps> = ({ year, updatedValue, isDarkMode, formFactor }) => (
  <YearPicker initialYear={parseInt(year || '', 10) || null} updatedValue={updatedValue} isDarkMode={isDarkMode} formFactor={formFactor} />
);

const getYearsInDecade = (startYear: number, count: number): number[] =>
  Array.from({ length: count }, (_, i) => startYear + i);

interface YearPickerProps {
  initialYear: number | null;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
  formFactor: number;
}

const YearPicker: React.FC<YearPickerProps> = ({ initialYear, updatedValue, isDarkMode, formFactor }) => {
  const currentYear = new Date().getFullYear();

  // Determine the number of years to display based on the form factor
  const [yearsInScreen, setYearsInScreen] = useState(formFactor <= 1 ? YEARS_LARGE_SCREEN : YEARS_SMALL_SCREEN);

  useEffect(() => {
    setYearsInScreen(formFactor <= 1 ? YEARS_LARGE_SCREEN : YEARS_SMALL_SCREEN);
  }, [formFactor]);

  const initialDecade = Math.floor((initialYear || currentYear) / yearsInScreen) * yearsInScreen;

  const [currentDecade, setCurrentDecade] = useState<number>(initialDecade);
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);

  const years = getYearsInDecade(currentDecade, yearsInScreen);

  const selectYear = useCallback((year: number) => {
    setSelectedYear(year);
    updatedValue(year.toString());
  }, [updatedValue]);

  const changeDecade = useCallback((increment: number) => {
    setCurrentDecade(prev => prev + increment * yearsInScreen);
  }, [yearsInScreen]);

  const gridStyles = formFactor <= 1 ? styles.gridContainer : styles.gridContainerSmall;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div style={{ ...styles.card, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <div style={styles.header}>
          <Label style={isDarkMode ? styles.labelDark : styles.label}>
            {`${currentDecade} - ${currentDecade + yearsInScreen - 1}`}
          </Label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <NavigationButton direction="up" onClick={() => changeDecade(-1)} isDarkMode={isDarkMode} />
            <NavigationButton direction="down" onClick={() => changeDecade(1)} isDarkMode={isDarkMode} />
          </div>
        </div>
        <Stack tokens={{ childrenGap: 10 }} style={{ width: '100%' }}>
          <div style={gridStyles}>
            {years.map(year => (
              <YearButton key={year} year={year} selectYear={selectYear} selectedYear={selectedYear} isDarkMode={isDarkMode} />
            ))}
          </div>
        </Stack>
      </div>
    </div>
  );
};

interface NavigationButtonProps {
  direction: 'up' | 'down';
  onClick: () => void;
  isDarkMode: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, isDarkMode }) => (
  <PrimaryButton
    onClick={onClick}
    style={isDarkMode ? styles.navButtonDark : styles.navButton}
    onMouseOver={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)')}
    onMouseOut={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={direction === 'up' ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </PrimaryButton>
);

interface YearButtonProps {
  year: number;
  selectYear: (year: number) => void;
  selectedYear: number | null;
  isDarkMode: boolean;
}

const YearButton: React.FC<YearButtonProps> = ({ year, selectYear, selectedYear, isDarkMode }) => (
  <div key={year} style={styles.yearCell}>
    <DefaultButton
      onClick={() => selectYear(year)}
      text={year.toString()}
      style={selectedYear === year
        ? { ...styles.yearButton, ...(isDarkMode ? styles.yearButtonActiveDark : styles.yearButtonActive) }
        : { ...styles.yearButton, backgroundColor: isDarkMode ? '#555' : styles.yearButton.backgroundColor }}
      onMouseOver={e => {
        if (selectedYear !== year) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? styles.yearButtonHoverDark.backgroundColor : styles.yearButtonHover.backgroundColor;
        }
      }}
      onMouseOut={e => {
        if (selectedYear !== year) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? '#555' : styles.yearButton.backgroundColor;
        }
      }}
    />
  </div>
);

export default FluentYearPicker;
export type { FluentYearPickerProps };
