import Typography from 'typography'
import myTheme from 'typography-theme-moraga'

console.log('theme', myTheme);


myTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'a': {
      color:`#988146`
    }
  })

const typography = new Typography(myTheme);


console.log('typo', typography);

export default typography