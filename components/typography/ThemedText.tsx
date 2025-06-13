import { StyleSheet, Text, useColorScheme, type TextProps } from 'react-native';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'strong' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <Text
      style={[
        { color: isDarkMode ? "#FFFFFF" : "rgb(102, 102, 127)" },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'strong' ? styles.strong : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "NunitoSansRegular",
  },
  strong: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "NunitoSansBold"
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "NunitoSansExtraBold"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
