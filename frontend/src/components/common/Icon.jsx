import ICON_MAP from "../../constants/iconMap";

const Icon = ({name, size=24, className=""}) => {
    const IconComponent = ICON_MAP[name?.toLowerCase()] || ICON_MAP.default;
    return <IconComponent size={size} className={className}/>
};

export default Icon;