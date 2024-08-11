import { keyframes, FontWeights, FontSizes } from '@fluentui/react/lib/Styling';

const colors = {
  white: '#ffffff',
  black: '#292929',
  darkGray: '#333',
  lightGray: '#fefefe',
  mediumGray: '#adadad',
  lightBackground: '#f8f9fa',
  darkBackground: '#666666',
  lightHoverBackground: '#E7EFF7',
  darkHoverBackground: '#777777',
  activeBlue: '#1160B7',
  activeDark: '#141414',
  textDark: '#fefefe',
  textMediumDark: '#adadad',
};

const scaleUp = keyframes({
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(1.1)' },
});

const scaleDown = keyframes({
  from: { transform: 'scale(1.1)' },
  to: { transform: 'scale(1)' },
});

const styles = {
  card: {
    padding: '10px',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  cardDark: {
    padding: '10px',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  header: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  label: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.medium,
    color: colors.darkGray,
    margin: '0 5px',
  },
  labelDark: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.medium,
    color: colors.textDark,
    margin: '0 5px',
  },
  navButton: {
    minWidth: '25px',
    height: '25px',
    padding: '0',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: colors.darkGray,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDark: {
    minWidth: '25px',
    height: '25px',
    padding: '0',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: colors.mediumGray,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonHover: {
    backgroundColor: colors.darkGray,
    animation: `${scaleUp} 0.3s forwards`,
  },
  navButtonOut: {
    animation: `${scaleDown} 0.3s forwards`,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4px',
    width: '100%',
  } as React.CSSProperties,
  gridContainerSmall: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '4px',
    width: '100%',
  } as React.CSSProperties,
  yearCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  yearButton: {
    width: '100%',
    height: '35px',
    fontSize: FontSizes.small,
    backgroundColor: colors.lightBackground,
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  yearButtonDark: {
    width: '100%',
    height: '35px',
    fontSize: FontSizes.small,
    backgroundColor: colors.darkBackground,
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: colors.activeDark,
  },
  yearButtonHover: {
    backgroundColor: colors.lightHoverBackground,
  },
  yearButtonHoverDark: {
    backgroundColor: colors.darkHoverBackground,
  },
  yearButtonActive: {
    backgroundColor: colors.activeBlue,
    color: colors.white,
  },
  yearButtonActiveDark: {
    backgroundColor: colors.activeDark,
    color: colors.white,
  },
};

export default styles;
