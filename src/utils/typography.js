import Typography from 'typography'
import myTheme from 'typography-theme-moraga'

myTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'a': {
        color: `#988146`
    }
})

const typography = new Typography(myTheme);

export default typography