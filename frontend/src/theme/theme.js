const Theme = {
  postBorder: '#343536',

  gray0: '#D7DADC',
  gray1: '#B2ABA1',

  gray2: '#818384',
  gray3: '#272729',
  gray4: '#1A1A1B',

  grayNew: '#161617',

  gray5: '#030303',

  sunray: '#EABA6B',

  fontLargeXX: '20px',
  fontLargeX: '18px',
  fontLarge: '16px',
  fontMed: '14px',
  fontSmall: '12px',
  fontSmallX: '10px',

  box() {
    return `background: ${this.gray4}; border: 1px solid ${this.postBorder};`;
  },
};

export default Theme;
