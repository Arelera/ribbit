const Theme = {
  prim1: '#2DC7FF',
  prim2: '#00ABE7',
  prim3: '#0081AF',
  sec1: '#EAD2AC',
  sec2: '#EABA6B',

  postBorder: '#343536',
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
};

export default Theme;
