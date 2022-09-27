export const NavArrowIcon = ({rightButton}) => (
    <svg width="24" height="24" overflow="visible"
         preserveAspectRatio="xMinYMin meet"
         strokeWidth="0"
         viewBox="0 0 25 25" fill="#FFFFFF"
         stroke="#FFFFFF">
        <path d={rightButton? "M20 12L4 20L4 4L20 12Z" : "M4 12L20 4L20 20L4 12Z"}/>
    </svg>
);