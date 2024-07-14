import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import styles from './styles/styles';

const small_screen_breakpoint_width = 600;
const small_screen_breakpoint_height = 950;
const years_in_screen_large = 12;
const years_in_screen_small = 6;

interface FluentYearPickerProps {
  year?: string;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
}

const FluentYearPicker: React.FC<FluentYearPickerProps> = ({ year, updatedValue, isDarkMode }) => (
  <YearPicker initialYear={year ? parseInt(year, 10) : null} updatedValue={updatedValue} isDarkMode={isDarkMode} />
);

const getYearsInDecade = (startYear: number, yearsInScreen: number): number[] =>
  Array.from({ length: yearsInScreen }, (_, i) => startYear + i);

interface YearPickerProps {
  initialYear: number | null;
  updatedValue: (value: string) => void;
  isDarkMode: boolean;
}

const YearPicker: React.FC<YearPickerProps> = ({ initialYear, updatedValue, isDarkMode }) => {
  const today = new Date();
  const initialScreenType = window.innerWidth <= small_screen_breakpoint_width || window.innerHeight <= small_screen_breakpoint_height;
  const yearsInScreen = initialScreenType ? years_in_screen_small : years_in_screen_large;
  const initialDecade = initialYear !== null 
    ? Math.floor(initialYear / yearsInScreen) * yearsInScreen 
    : Math.floor(today.getFullYear() / yearsInScreen) * yearsInScreen;

  const [currentDecade, setCurrentDecade] = useState(initialDecade);
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);
  const [isSmallScreen, setIsSmallScreen] = useState(initialScreenType);

  const years = useMemo(() => getYearsInDecade(currentDecade, yearsInScreen), [currentDecade, yearsInScreen]);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= small_screen_breakpoint_width || window.innerHeight <= small_screen_breakpoint_height;
      setIsSmallScreen(smallScreen);
      const newYearsInScreen = smallScreen ? years_in_screen_small : years_in_screen_large;
      if (smallScreen !== initialScreenType) {
        const newDecade = initialYear !== null 
          ? Math.floor(initialYear / newYearsInScreen) * newYearsInScreen 
          : Math.floor(today.getFullYear() / newYearsInScreen) * newYearsInScreen;
        setCurrentDecade(newDecade);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialYear, initialScreenType, today]);

  const selectYear = useCallback((year: number) => {
    setSelectedYear(year);
    updatedValue(year.toString());
  }, [updatedValue]);

  const changeDecade = useCallback((increment: number) => {
    setCurrentDecade(decade => decade + increment * yearsInScreen);
  }, [yearsInScreen]);

  const NavigationButton: React.FC<{ direction: 'up' | 'down', onClick: () => void }> = ({ direction, onClick }) => (
    <PrimaryButton
      onClick={onClick}
      style={isDarkMode ? styles.navButtonDark : styles.navButton}
      onMouseOver={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.transform = 'scale(1)';
      }}
    >
      {direction === 'up' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </PrimaryButton>
  );

  const YearButton: React.FC<{ year: number }> = ({ year }) => (
    <div key={year} style={styles.yearCell}>
      <DefaultButton
        onClick={() => selectYear(year)}
        text={year.toString()}
        style={selectedYear === year 
          ? isDarkMode 
            ? { ...styles.yearButton, ...styles.yearButtonActiveDark } 
            : { ...styles.yearButton, ...styles.yearButtonActive }
          : { ...styles.yearButton, backgroundColor: isDarkMode ? '#555' : styles.yearButton.backgroundColor }}
        onMouseOver={(e) => {
          if (selectedYear !== year) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? styles.yearButtonHoverDark.backgroundColor : styles.yearButtonHover.backgroundColor;
          }
        }}
        onMouseOut={(e) => {
          if (selectedYear !== year) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = isDarkMode ? '#555' : styles.yearButton.backgroundColor;
          }
        }}
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div style={{ ...styles.card, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <div style={styles.header}>
          <Label style={isDarkMode ? styles.labelDark : styles.label}>{`${currentDecade} - ${currentDecade + yearsInScreen - 1}`}</Label>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
            <NavigationButton direction="up" onClick={() => changeDecade(-1)} />
            <NavigationButton direction="down" onClick={() => changeDecade(1)} />
          </div>
        </div>
        <Stack tokens={{ childrenGap: 10 }} style={{ width: '100%' }}>
          <div style={isSmallScreen ? styles.gridContainerSmall : styles.gridContainer}>
            {years.map((year) => (
              <YearButton key={year} year={year} />
            ))}
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default FluentYearPicker;
export type { FluentYearPickerProps };
