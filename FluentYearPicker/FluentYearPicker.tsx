import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import styles from './styles/styles';

const YEARS_LARGE_SCREEN = 12;
const YEARS_SMALL_SCREEN = 6;

interface IFluentYearPickerProps {
  year?: string;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
  formFactor: number;
  disabled: boolean; 
}

const FluentYearPickerComponent: React.FC<IFluentYearPickerProps> = ({ year, updatedValue, isDarkMode, formFactor, disabled }) => (
  <YearPickerComponent initialYear={parseInt(year || '', 10) || null} updatedValue={updatedValue} isDarkMode={isDarkMode} formFactor={formFactor} disabled={disabled} />
);

const getYearsInDecade = (startYear: number, count: number): number[] =>
  Array.from({ length: count }, (_, i) => startYear + i);

interface IYearPickerProps {
  initialYear: number | null;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
  formFactor: number;
  disabled: boolean;  
}

const YearPickerComponent: React.FC<IYearPickerProps> = ({ initialYear, updatedValue, isDarkMode, formFactor, disabled }) => {
  const currentYear = new Date().getFullYear();

  const [yearsInScreen, setYearsInScreen] = useState(formFactor <= 1 ? YEARS_LARGE_SCREEN : YEARS_SMALL_SCREEN);

  useEffect(() => {
    setYearsInScreen(formFactor <= 1 ? YEARS_LARGE_SCREEN : YEARS_SMALL_SCREEN);
  }, [formFactor]);

  const initialDecade = Math.floor((initialYear || currentYear) / yearsInScreen) * yearsInScreen;

  const [currentDecade, setCurrentDecade] = useState<number>(initialDecade);
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);

  const years = getYearsInDecade(currentDecade, yearsInScreen);

  const selectYear = useCallback((year: number) => {
    if (!disabled) {
      setSelectedYear(year);
      updatedValue(year.toString());
    }
  }, [updatedValue, disabled]);

  const changeDecade = useCallback((increment: number) => {
    if (!disabled) {
      setCurrentDecade(prev => prev + increment * yearsInScreen);
    }
  }, [yearsInScreen, disabled]);

  const gridStyles = formFactor <= 1 ? styles.gridContainer : styles.gridContainerSmall;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', pointerEvents: disabled ? 'none' : 'auto' }}>
      <div style={{ ...styles.card, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <div style={styles.header}>
          <Label style={isDarkMode ? styles.labelDark : styles.label}>
            {`${currentDecade} - ${currentDecade + yearsInScreen - 1}`}
          </Label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <NavigationButton direction="up" onClick={() => changeDecade(-1)} isDarkMode={isDarkMode} disabled={disabled} />
            <NavigationButton direction="down" onClick={() => changeDecade(1)} isDarkMode={isDarkMode} disabled={disabled} />
          </div>
        </div>
        <Stack tokens={{ childrenGap: 10 }} style={{ width: '100%' }}>
          <div style={gridStyles}>
            {years.map(year => (
              <YearButton key={year} year={year} selectYear={selectYear} selectedYear={selectedYear} isDarkMode={isDarkMode} disabled={disabled} />
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
  disabled: boolean;  
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, isDarkMode, disabled }) => (
  <PrimaryButton
    onClick={onClick}
    style={isDarkMode ? styles.navButtonDark : styles.navButton}
    onMouseOver={e => {
      if (!disabled) {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
      }
    }}
    onMouseOut={e => {
      if (!disabled) {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }
    }}
    disabled={disabled} 
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
  disabled: boolean; 
}

const YearButton: React.FC<YearButtonProps> = ({ year, selectYear, selectedYear, isDarkMode, disabled }) => (
<div key={year} style={styles.yearCell}>
    <DefaultButton
      onClick={() => selectYear(year)}
      text={year.toString()}
      style={selectedYear === year
        ? { ...styles.yearButton, ...(isDarkMode ? styles.yearButtonActiveDark : styles.yearButtonActive) }
        : { ...styles.yearButton, backgroundColor: isDarkMode ? styles.yearButtonDark.backgroundColor : styles.yearButton.backgroundColor }}
      onMouseOver={e => {
        if (!disabled && selectedYear !== year) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? styles.yearButtonHoverDark.backgroundColor : styles.yearButtonHover.backgroundColor;
        }
      }}
      onMouseOut={e => {
        if (!disabled && selectedYear !== year) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? styles.yearButtonDark.backgroundColor : styles.yearButton.backgroundColor;
        }
      }}
      disabled={disabled} 
    />
</div>

);

export default FluentYearPickerComponent;
export type { IFluentYearPickerProps };
