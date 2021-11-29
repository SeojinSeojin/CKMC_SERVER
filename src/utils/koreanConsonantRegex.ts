export const koreanConsonantRegex = (character: string) => {
  switch (character) {
    case '가':
      return '^[가-깋]';
    case '나-마':
      return '^[나-닣]|^[다-딯]|^[라-맇]|^[마-밓]';
    case '바':
      return '^[바-빟]';
    case '사':
      return '^[사-싷]';
    case '아':
      return '^[아-잏]';
    case '자':
      return '^[자-짛]';
    case '차':
      return '^[차-칳]';
    case '타-파':
      return '^[타-팋]|^[파-핗]';
    case '하':
      return '^[하-힣]';
    default:
      return '';
  }
};
