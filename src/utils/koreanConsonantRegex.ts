export const koreanConsonantRegex = (consonant: string) => {
  switch (consonant) {
    case 'ㄱ':
      return '^[가-깋]';
    case 'ㄴ':
      return '^[나-닣]';
    case 'ㄷ':
      return '^[다-딯]';
    case 'ㄹ':
      return '^[라-맇]';
    case 'ㅁ':
      return '^[마-밓]';
    case 'ㅂ':
      return '^[바-빟]';
    case 'ㅅ':
      return '^[사-싷]';
    case 'ㅇ':
      return '^[아-잏]';
    case 'ㅈ':
      return '^[자-짛]';
    case 'ㅊ':
      return '^[차-칳]';
    case 'ㅋ':
      return '^[카-킿]';
    case 'ㅌ':
      return '^[타-팋]';
    case 'ㅍ':
      return '^[파-핗]';
    case 'ㅎ':
      return '^[하-힣]';
  }
};
