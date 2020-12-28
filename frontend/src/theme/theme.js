const Theme = {
  prim1: '#00CC99',
  prim2: '#00A877',
  prim3: '#40826D',
  sec1: '#FF7F50',
  sec2: '#D68A59',

  postBorder: '#343536',

  white1: '#FCFCFB',
  gray0: '#D7DADC',
  gray1: '#B2ABA1',
  gray2: '#818384',
  gray3: '#272729',
  gray4: '#1A1A1B',
  gray5: '#030303',

  grayNew: '#161617',

  fontLargeXX: '20px',
  fontLargeX: '18px',
  fontLarge: '16px',
  fontMed: '14px',
  fontSmall: '12px',
  fontSmallX: '10px',

  box() {
    return `background: ${this.gray4}; border: 1px solid ${this.postBorder};`;
  },

  mobileL: '@media screen and (max-width: 425px)',
  tabletS: '@media screen and (max-width: 600px)',
  tablet: '@media screen and (max-width: 768px)',
  laptop: '@media screen and (max-width: 1024px)',
};

export default Theme;
