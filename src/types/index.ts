export interface Theme {
  id: string;
  name: string;
  nameCn: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  codeBackground: string;
  codeColor: string;
  borderLeftColor: string;
  cardBackground: string;
  shadow: string;
  fontFamily: string;
  borderRadius: string;
}

export interface EditorToolbarButton {
  icon: string;
  label: string;
  action: string;
}
